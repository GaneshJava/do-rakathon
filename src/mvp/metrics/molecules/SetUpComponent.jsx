/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Input from "core-modules/Input";
import MultiSelect from "core-modules/Selectlist";
import LabelField from "core-modules/LabelField";
import deletIcon from 'assets/images/deletIcon.svg'
import {
    TEXT_FIELD,
    SELECT,
    NUMERIC,
    updateNestedKey,
    getValueUsingKey,
    getRuleObj,
} from "../constants";
import { getDispatchObject } from "mvp/dashboard/molecules/Graph";

const SetUpComponent = ({ state, setState }) => {
    const [compState, setCompState] = useState({})
    const {
        ruleObj: { node: { type, label, key, ...node } },
        ruleObj: { rule: ruleObj },
        configuredData
    } = state;

    useEffect(() => {
        const prePopulateValues = () => {
            let defaultState = {};
            const { stateKey, keysToPush, commaSeparated } = ruleObj;
            const configuredValue = configuredData?.[type]?.[label]?.[stateKey]?.config?.value ?? null;
            if (configuredValue) {
                if (keysToPush.length > 1) {
                    keysToPush.map(key => defaultState[key] = configuredValue[key])
                } else {
                    defaultState[keysToPush[0]] = commaSeparated ? '' : configuredValue;
                }
            }
            setCompState({ ...compState, ...defaultState })
        }
        prePopulateValues();
    }, [])
    const handleCancel = () => {
        setState({ ...state, enableSetup: false, ruleObj: {}, pageHeading: 'Manage rules' });
    }

    const handleConfigure = () => {
        let configData = { ...configuredData };
        let valueToUpdate = getValueTobeUpdated();
        let setObj = {};
        setObj['enableSetup'] = false;
        if (valueToUpdate !== 'UPDATED') {
            let finalObj = getValueUsingKey(configData, updateKey());
            let newConfig = { value: valueToUpdate };
            if (finalObj) {
                finalObj.config = newConfig;
            } else {
                finalObj = getRuleObj({ type, label, ...node }, state.user, ruleObj, newConfig);
            }
            setObj['configuredData'] = updateNestedKey(configData, updateKey(), finalObj);
        }
        setState({ ...state, ...setObj });
    }

    const updateKey = () => `${type}.${label}.${ruleObj.stateKey}`;

    const getValueTobeUpdated = () => {
        const { keysToPush, commaSeparated } = ruleObj;
        let valueToUpdate;
        if (keysToPush.length > 1) {
            valueToUpdate = {};
            keysToPush.map(key => valueToUpdate[key] = compState[key])
        } else {
            let key = keysToPush[0];
            if (commaSeparated) {
                updateValues({ stateKey: key }, false);
                return "UPDATED";
            }
            valueToUpdate = compState[key];
        }
        return valueToUpdate;
    }

    const updateValues = (field, setup) => {
        const { stateKey } = ruleObj;
        if (ruleObj.commaSeparated && compState[field.stateKey]) {
            let configData = { ...configuredData };
            let savedConfig = (configuredData?.[type]?.[label]?.[stateKey]?.config?.value ?? null);
            let arrayOfValues = compState[field.stateKey].replaceAll(' ', '').split(',');
            let finalObj = getValueUsingKey(configData, updateKey());
            let newConfig = { value: arrayOfValues };
            if (finalObj) {
                finalObj.config = newConfig;
            } else {
                finalObj = getRuleObj({ type, label, ...node }, state.user, ruleObj, newConfig);
            }
            if (!savedConfig) {
                configData = updateNestedKey(configData, updateKey(), finalObj);
            } else {
                configData[type][label][stateKey].config.value = [...savedConfig, ...arrayOfValues];
            }
            setCompState({ ...compState, [field.stateKey]: '' })
            setState({ ...state, configuredData: configData, enableSetup: setup })
        }
    }


    const deleteCommaSeparatedValues = (index) => {
        const { stateKey } = ruleObj;
        let configTmp = { ...configuredData };
        configTmp[type][label][stateKey].config.value.splice(index, 1);
        setState({ ...state, configuredData: configTmp })
    }

    const handleChange = ({ target: { name, value, type } }) => {
        setCompState({ ...compState, [name]: value })
    }

    const handleSelectChange = (e, field, isMulti) => {
        let value = isMulti ? e.map(val => val.value) : e.value;
        setCompState({ ...compState, [field.stateKey]: value })
    }

    const getRespectiveInputFields = () => {
        let count = ruleObj.fields.length > 1;
        return (
            <>
                {ruleObj.fields.map((field, index) => {
                    let elementType = ruleObj.elementType || field.elementType;
                    let attributes = {
                        handleChange: handleChange,
                        key: index + 'rule_index',
                        handleKeyDown: (e) => e.key === 'Enter' ? updateValues(field, true) : null,
                        customClass: `text-white login-fields bg-[#1e2021] border-transparent h-12 w-80 -mt-[0.1rem] ${count ? 'flex-1 w-full' : ''}`,
                        name: field.stateKey,
                        value: compState[field.stateKey] || '',
                        type: elementType === TEXT_FIELD ? 'text' : 'number',
                        isRequired: true,
                        placeholder: field.placeholder
                    }

                    if (elementType === TEXT_FIELD || elementType === NUMERIC)
                        return <Input {...attributes} />

                    else if (elementType === SELECT) {
                        let options = field.options(getDispatchObject('', {}, state?.ruleObj?.node ?? {})) || [];
                        let isMulti = field.isMulti;
                        let value = isMulti ? (Array.isArray(compState[field.stateKey]) ? compState[field.stateKey] : []) : compState[field.stateKey];
                        return <MultiSelect
                            id='rule-select'
                            key={index + 'rule_index'}
                            options={options}
                            standards={options.filter(item => isMulti ? value.includes(item.value) : (item.value === value))}
                            disabled={false}
                            handleChange={(e) => handleSelectChange(e, field, isMulti)}
                            isMulti={isMulti}
                            placeholder={field.placeholder}
                            className={`${count ? 'flex-1 w-full' : 'w-[40%]'}`}
                            classNamePrefix="rules-select-custom"
                        />
                    }
                    return true;
                }
                )}
            </>
        );
    }

    return (
        <div className="flex flex-col h-[80vh]">
            <div className="border-2 rounded-md border-[#4c4f51] p-4 -mr-[1.5rem]" style={{ minHeight: '15rem' }}>
                <div className="flex gap-4 items-baseline">
                    <div className="w-[30%]">
                        <LabelField
                            title={ruleObj.label + ':'}
                            mandotory={false}
                            className="font-RakutenSansRegular text-[16px] mt-3"
                            titleClass="font-semibold text-base"
                            customStyle={{}}
                        />
                    </div>
                    <div className="flex w-[70%] gap-4">
                        {getRespectiveInputFields()}
                    </div>
                </div>
                {ruleObj.commaSeparated === true && <div className="flex w-[69%] mt-2 ml-auto">
                    <ul className="w-80">
                        {(configuredData?.[type]?.[label]?.[ruleObj.stateKey]?.config?.value ?? []).map((list, index) =>
                            <li className="mt-2 flex border rounded-md border-[#4c4f51] py-1 px-2 w-full" key={'list_' + index}>
                                <span> {list} </span>
                                <img src={deletIcon} alt="deletIcon" className="ml-auto h-4 w-4 cursor-pointer" title="Remove"
                                    onClick={() => deleteCommaSeparatedValues(index)}
                                />
                            </li>
                        )}
                    </ul>
                </div>}
            </div>

            <div className='flex flex-row justify-end gap-6 mt-auto'>
                <span className='flex cursor-pointer items-center bg-transparent hover:border-b hover:border-[#ed9000] py-2 text-[#f59600] rounded'
                    onClick={() => handleCancel()}
                > Cancel </span>
                <button className='flex items-center bg-[#f59600] hover:bg-[#bc7709] text-black px-4 rounded'
                    onClick={() => handleConfigure()}
                > Configure
                </button>
            </div>
        </div>

    )
}

export default SetUpComponent;