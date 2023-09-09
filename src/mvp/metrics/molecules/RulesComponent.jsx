/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
    NON_SETUP,
    updateNestedKey,
    getValueUsingKey,
    getRuleObj,
} from "../constants";
import { useDispatch } from "react-redux";
import { deleteRule } from "store";
import editIcon from 'mvp/assets/edit_rule.svg';
import deletIcon from 'assets/images/deletIcon.svg'
import { toast } from "react-toastify";
import { updateStateKeys } from "../constants";
import Modal from 'react-responsive-modal';
import closeIcon from 'mvp/assets/closeicon.svg';


const RulesComponent = ({ state, setState, currentDatabase, masterRules, masterRuleIds }) => {
    const dispatch = useDispatch();
    const { configuredData, user } = state;
    const { type, label, ...props } = currentDatabase || state;

    const [compState, setCompState] = useState({
        rules: updateStateKeys(type, masterRules),
        setup: false,
        showModal: false,
        deleteRuleObj: {},
    });

    useEffect(() => {
        setCompState({
            ...compState,
            rules: updateStateKeys(type, masterRules),
            setup: false,
        })
    }, [props.key])

    const handleCheckBoxChange = (target, rule) => {
        let configTemp = { ...configuredData };
        let finalObj = getValueUsingKey(configTemp, `${type}.${label}.${rule.stateKey}`);
        let newConfig = { value: target.checked };
        if (target.checked) {
            if (finalObj) {
                finalObj.config = newConfig
            } else {
                finalObj = getRuleObj({ type, label, ...props }, user, rule, newConfig);
            }
            configTemp = updateNestedKey(configTemp, `${type}.${label}.${rule.stateKey}`, finalObj);
        } else {
            delete configTemp[type][label][rule.stateKey];
        }
        setState({ ...state, configuredData: configTemp })
    }

    const handleSetup = (rule) => {
        setState({
            ...state, enableSetup: true,
            pageHeading: 'SetUp Configuration',
            ruleObj: { rule, node: { type, label, ...props } },
        });
    }

    const handleDeleleRule = async () => {
        const { stateKey, type, label, ruleConfigId } = compState.deleteRuleObj;
        if (ruleConfigId) {
            let response = await dispatch(deleteRule(ruleConfigId));
            closeDeleteConfirmationModal();
            toast.success(response.payload, { position: toast.POSITION.TOP_CENTER, style: { backgroundColor: 'white', color: 'black' } });
        }
        let configTemp = { ...configuredData };
        delete configTemp[type][label][stateKey];
        setState({ ...state, configuredData: configTemp })
    }

    const showDeleteConfirmationModal = (e, stateKey, type, label, { ruleConfigId }) => {
        e.stopPropagation();
        setCompState({ ...compState, showModal: true, deleteRuleObj: { stateKey, type, label, ruleConfigId } });
    };

    const closeDeleteConfirmationModal = () => {
        setCompState({ ...compState, showModal: false, deleteRuleObj: {} })
    }


    const getOptionToConfigure = (rule) => {
        let { stateKey } = rule;
        let ruleObj = configuredData?.[type]?.[label]?.[stateKey] ?? {};
        let { ruleConfigId } = ruleObj;
        if (rule.type === NON_SETUP && !ruleConfigId) {
            let checked = configuredData?.[type]?.[label]?.[rule.stateKey]?.config?.value ?? false;
            return <input
                checked={rule.checked === true ? true : checked}
                onChange={(e) => handleCheckBoxChange(e.target, rule)}
                type="checkbox"
                className="w-5 h-5 cursor-pointer accent-[#f59600] "
            />
        }
        else {
            return <div
                className="flex gap-4 h-6"
                onClick={() => handleSetup(rule)} > {!ruleConfigId ?
                    <span className="text-common-color cursor-pointer hover:border-b-2 border-common-color"> Set Up </span> : <>
                        {rule.type !== NON_SETUP && <img src={editIcon} title="Edit" alt="Edit" className="w-4 h-4 cursor-pointer hover:opacity-60" />}
                        <img src={deletIcon} title="Delete" alt={"Delete rule"} className="w-4 h-4 cursor-pointer hover:opacity-60" onClick={(e) => showDeleteConfirmationModal(e, stateKey, type, label, ruleObj)} />
                    </>
                }
            </div>
        }
    }

    return (
        <div className="ml-3 my-6 w-full w-[70%] max-h-[40rem] overflow-scroll">
            <ul className="flex flex-col gap-5 font-medium w-[80%] my-4">
                {(compState?.rules ?? []).map((rule, index) => {
                    if (masterRuleIds.includes(rule.stateKey)) {
                        return (
                            <li className="flex" key={`rules_${index}`}>
                                <span className="text-base ">
                                    {rule.label}
                                </span>
                                <span className="ml-auto w-20">
                                    {getOptionToConfigure(rule)}
                                </span>
                            </li>
                        )
                    }
                    return true;
                })}
            </ul>
            {compState.showModal === true &&
                <div>
                    <Modal
                        center
                        closeOnEsc
                        closeIcon={<img className="mt-3 mr-3" src={closeIcon} alt="" />}
                        open={compState.showModal}
                        classNames={{ modal: 'bg-[#2C3033] rounded-2xl w-full' }}
                        onClose={() => closeDeleteConfirmationModal()}>
                        <div className='flex gap-8 flex-col gap-6 w-full min-h-48 bg-[#2C3033] mx-2'>
                            <p className='font-RakutenRegular text-semibold text-white text-xl'> Are you sure you want to delete this rule?  </p>
                            <div className='flex gap-4 justify-end mr-6'>
                                <button className='flex items-center bg-transparent hover:bg-[#f59600] py-2 px-4 text-[#f59600] hover:text-[#000] border border-[#f59600] hover:border-transparent rounded'
                                    onClick={closeDeleteConfirmationModal}
                                > Cancel </button>
                                <button className='flex items-center bg-[#f59600] hover:bg-[#bc7709] text-semibold text-black py-2 px-4 rounded-md'
                                    onClick={handleDeleleRule}
                                > Delete
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            }
        </div>
    )
}

export default RulesComponent;
