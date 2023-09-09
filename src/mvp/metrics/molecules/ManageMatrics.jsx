/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateData, getMaterRules } from "store";
import ConfigureMetrics from "./ConfigureMetrics";
import { decodeJsonDataToObject, getDataIcons } from "../constants";
import { authState, masterRules as masterRulesState } from "store";
import { getDispatchObject } from "mvp/dashboard/molecules/Graph";
import { getRuleConfigData, storeRuleConfigData } from "store";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { _OVERALL } from "mvp/constants";


const ManageMatrics = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const metricsTreeState = useSelector(stateData['metrics']);
    const { user } = useSelector(authState);
    const { masterRules = [], masterRuleIds = [], loaded } = useSelector(masterRulesState);
    const { activeNodeObj } = metricsTreeState || {};

    const [state, setState] = useState({
        enableSetup: false,
        user: user,
        configuredData: {
            DATABASE: {},
            TABLE: {},
            COLUMN: {},
        },
        activeEntities: {},
        setupComp: activeNodeObj.type !== 'OVERALL',
        pageHeading: 'Manage rules',
        pageSubHeading: activeNodeObj.label,
        ...activeNodeObj
    });
    useEffect(() => {
        getRulesConfigData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeNodeObj.key])

    useEffect(() => {
        dispatch(getMaterRules())
    }, [loaded, activeNodeObj.key])

    const getRulesConfigData = async (postObj = activeNodeObj) => {
        let dispatchObj = getDispatchObject('', user, postObj);
        if (dispatchObj.level !== _OVERALL) {
            let response = await dispatch(getRuleConfigData(dispatchObj)).unwrap();
            let { status, data = {} } = response;
            if (status === 200) {
                let { type, label } = postObj;
                let decodeData = decodeJsonDataToObject(data)
                let configData = { ...state.configuredData };
                configData = { ...configData, [type]: { ...configData[type], [label]: { ...decodeData } } }
                setState({
                    ...state, configuredData: configData,
                    setupComp: activeNodeObj.type !== 'OVERALL',
                    pageHeading: 'Manage rules',
                    pageSubHeading: activeNodeObj.label,
                    ...activeNodeObj
                })
            }
        }
    }

    const handleSave = async () => {
        let rulesToPost = getRulesArray(state.configuredData);
        console.log(rulesToPost);
        let response = await dispatch(storeRuleConfigData(rulesToPost)).unwrap();
        if (response.status === 200) {
            toast.success('Rules saved successfully', { position: toast.POSITION.TOP_CENTER, style: { backgroundColor: 'white', color: 'black' } });
            navigate('/data-quality');
            setState({ ...state, })
        } else {
            toast.error('Error while saving Rules', { position: toast.POSITION.TOP_CENTER, style: { backgroundColor: '#F59502', color: 'black' } });
        }
    }

    const getRulesArray = (configuredData) => {
        let rules = [];
        Object.values(configuredData).map(outerLevel => {
            Object.values(outerLevel).map(innerObj => {
                rules = [...rules, ...Object.values(innerObj)];
                return true;
            });
            return true;
        })
        return rules;
    }

    return (
        <div className="flex flex-col my-8 mx-6 h-[85vh]">
            <div className="flex gap-2 font-RakutenSemibold text-2xl items-center">
                <span> {state.pageHeading}: </span>
                {getDataIcons(state.type)}
                <span> {state.pageSubHeading} </span>
            </div>
            <div>
                {loaded && <ConfigureMetrics state={state} masterRules={masterRules} masterRuleIds={masterRuleIds} setState={setState} rulesFetching={getRulesConfigData} />}
            </div>


            {/*    ----- SAVE AND CANCEL OF CONFIGURATION -------   */}
            {state.enableSetup !== true &&
                <div className='flex flex-row justify-end gap-6 mt-auto'>
                    <span className='flex cursor-pointer items-center bg-transparent hover:border-b hover:border-[#ed9000] py-2 text-[#f59600] rounded'
                        onClick={() => navigate('/data-quality')}
                    > Cancel </span>
                    <button className='flex items-center bg-[#f59600] hover:bg-[#bc7709] text-black px-4 rounded'
                        onClick={() => handleSave()}
                    > Save Changes
                    </button>
                </div>}
        </div>
    );
}

export default ManageMatrics;