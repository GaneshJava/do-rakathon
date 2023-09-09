/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getEventMetricsData } from "store";
import { useDispatch, useSelector } from "react-redux";
import { stateData, authState } from "store";
import { getDispatchObject } from 'mvp/dashboard/molecules/Graph';
import { Spinner } from "core-modules/Loader";
import { updateNodeValuesUsingNodeId } from "../constants";
import RenderGraph from "mvp/dashboard/molecules/Graph";
import { _DATABASE, _TABLE, _COLUMN } from "mvp/constants";
import { capitalize } from "helpers";

const ExceptionCharts = ({ exceptionsData }) => {
    const dispatch = useDispatch();
    const { activeNodeObj, globalDateRange } = useSelector(stateData['metrics']);
    const { user } = useSelector(authState);

    const [ loading, setLoading ] = useState(false);
    const [state, setState] = useState({
        distributionData: [],
        metadata: {},
    });

    useEffect(() => {
        getExceptionData();
    }, [activeNodeObj.key])

    const getExceptionData = async (eventSubType = '') => {
        setLoading(false)
        let dispatchObject = getDispatchObject(globalDateRange, user, activeNodeObj);
        dispatchObject.section = {
            dataType: 'distribution',
            fromException: true,
            groupBy: 'event_sub_type'
        }
        let response = await dispatch(getEventMetricsData(dispatchObject)).unwrap();
        const { groupData: distributionData = {}, metadata = {} } = response;
        updateNodeValuesUsingNodeId({totalBreaches: metadata ?.totalAnomalyCount ?? 0})
        setState({ ...state, distributionData, metadata });
        setLoading(true)
    }

    const getChartComponent = () => {
        const { distributionData } = state;
        let configuredRules = Object.keys(distributionData) || [];
        return (
            configuredRules.length > 0 ?
            configuredRules.map((ruleKey, _index) => {
                if (![_DATABASE, _TABLE, _COLUMN].includes(ruleKey.toUpperCase())) {
                    let subSection = {
                        apiDataPresent: true,
                        eventsData: distributionData[ruleKey],
                        dataType: 'distribution',
                        label: ruleKey,
                        subType: ruleKey,
                        showCards: '!SHOW'
                    }
                    return (
                        <div key={'graphs' + _index} className='basis-[48%]'>
                            <RenderGraph section={subSection} {...{ activeNodeObj, globalDateRange }} />
                        </div>
                    );
                }
                return true;
            }) :
            <div className="flex w-full justify-center font-RakutenRegular"> There is no distribution data for {capitalize(activeNodeObj.type)}: {activeNodeObj.label} </div>
        );
    }

    return (
        <>
            {loading === true ?
                <div className='flex justify-between duration-500 gap-8 flex-wrap'>
                    {getChartComponent()}
                </div> :
                <div className="flex w-full justify-center items-center mt-32">
                    <Spinner customStyles={{ borderLeftColor: '#262729' }} />
                </div>
            }
        </>
    );
}

export default ExceptionCharts;