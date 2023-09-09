/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { saveAssetsForMonitor } from "store";
import RuleFields from "./RuleFields";
import { Divider } from 'primereact/divider';
import deletIcon from 'assets/images/deletIcon.svg'
import Button from "core-modules/Button";
import { customToaster } from "helpers";

import { DUPLICATE_VALUES, NULL_VALUES, DUPLICATE_CHECK, RULE_NAME, getDqRulesConfigData } from "../reducers/ruleReducer";
const DQRuleConfiguration = ({ connId, configureData, getAssetListForMonitor }) => {
    const dispatch = useDispatch();
    const { selectedFields } = configureData;
    const [state, setState] = useState({
        loaded: false,
        ruleData: {},
    });

    useEffect(() => {
        let ruleData = { ...state.ruleData };
        selectedFields.forEach(item => ruleData[`${item.parent_id}$${item.field_name}`] = [{}])
        setState({ ...state, loaded: true, ruleData })
    }, [])

    const handleRuleTypeSelect = (e, ruleKey, ruleConfigIndex) => {
        let setObj = { ...state }
        let configValues = {};
        if (e.value === NULL_VALUES) {
            configValues[RULE_NAME] = 'null_check';
        } else if (e.value === DUPLICATE_VALUES) {
            configValues[RULE_NAME] = DUPLICATE_CHECK;
        } else {
        }
        configValues['ruleGroup'] = e.value;
        setObj.ruleData[ruleKey][ruleConfigIndex] = configValues;
        setState(setObj)
    }

    const handleAddDeteleRule = (ruleKey, type = 1, ruleIndex = 0) => {
        let ruleData = { ...state.ruleData };
        if (type)
            ruleData[ruleKey][ruleData[ruleKey].length] = {};
        else
            ruleData[ruleKey].splice(ruleIndex, 1);
        setState({ ...state, ruleData })
    }

    const handleSubmit = async () => {
        let rulesConfigured = getDqRulesConfigData(state.ruleData);
        let monitorDetails = sessionStorage.getItem('dqMonitorDetails') ? JSON.parse(sessionStorage.getItem('dqMonitorDetails')) : {};
        let postData = monitorDetails?.postData ?? null
        if (postData) {
            postData.rulesConfigured = rulesConfigured;
            postData.uiConfigJson = JSON.stringify(state.ruleData) || '';
            const response = await dispatch(saveAssetsForMonitor(postData)).unwrap();
            console.log('Postdata and response dq rule monitor creation: ', {postData, response});
            if (response.status === 200) {
                getAssetListForMonitor()
                customToaster('success', 'Monitor saved successfully');
            } else
                customToaster('error', 'Error occured while saving monitor');
        } else 
             customToaster('error', 'Error occured while saving monitor');
    }

    return (
        <div className="flex flex-col gap-3 relative bg-secondaryBgColor">
            <div className="py-2 mx-2 pl-3 pr-8 overflow-auto min-h-[70vh]">
                {state.loaded &&
                    Object.keys(state.ruleData)?.map(ruleKey =>
                        <div className="flex flex-col gap-2 mt-5" key={`rule_data_${ruleKey}`}>
                            <p className="font-RakutenSemibold text-xl text-[#eaeae9]"> {getEntityLevels(ruleKey)} </p>
                            <div className="flex flex-col justify-start px-5 py-3 rounded-md bg-primaryBgColor ">
                                {state.ruleData[ruleKey]?.map((ruleConfig, _ruleIndex) =>
                                    <div key={`${ruleKey}_field_${_ruleIndex}`}>
                                        <RuleFields
                                            handleRuleTypeSelect={handleRuleTypeSelect}
                                            ruleData={ruleConfig}
                                            ruleKey={ruleKey}
                                            ruleConfigIndex={_ruleIndex}
                                            setState={setState}
                                            state={state}
                                        />
                                        {state.ruleData[ruleKey].length !== (_ruleIndex + 1) &&
                                            <div className="flex justify-end my-3 px-2">
                                                <img
                                                    onClick={() => handleAddDeteleRule(ruleKey, 0, _ruleIndex)}
                                                    src={deletIcon}
                                                    alt="deletIcon"
                                                    className="cursor-pointer h-4 w-4 hover:opacity-70" />
                                            </div>
                                        }
                                        <Divider />
                                    </div>)
                                }
                                <p
                                    onClick={() => handleAddDeteleRule(ruleKey)}
                                    className="w-[10.4rem] cursor-pointer font-medium text-[#f59602] hover:underline hover:underline-offset-4 hover:text-[#f59602] hover:opacity-70 font-RakutenRegular">
                                    Add another condition
                                </p>
                            </div>
                        </div>
                    )}
            </div>
            <div className="sticky justify-end bottom-0 mx-1 flex flex-row gap-3  mb-4 px-10 py-3">
                <div className="flex w-20">
                    <Button text="Save" handleSubmit={handleSubmit} className="text-xl border border-[#f59404] bg-[#efb053] text-black hover:bg-[#f59404] h-[2.2rem] flex items-center" />
                </div>
            </div>
        </div>
    );
}

export const getEntityLevels = (inputString = '', objectFormat = 0) => {
    const parts = inputString.split('$');
    return objectFormat === 0 ? `${parts[parts.length - 2]} / ${parts[parts.length - 1]}`
        : {
            entityLevel1: parts?.[0],
            entityLevel2: parts?.[1],
            entityLevel3: parts?.[2],
            entityLevel4: parts?.[3]
        }
}
export default React.memo(DQRuleConfiguration);