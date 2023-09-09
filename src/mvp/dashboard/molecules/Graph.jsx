/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Chart from "components/charts";
import GraphLocalDate from "./GraphLocalDate";
import { chartOptions } from "../constants";
import { constructChartData, _apiResponse } from "../constants/chartAlgorithm";
import { getEventMetricsData } from "store";
import { authState } from 'store/slices/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { _COLUMN, _DATABASE, _OVERALL, _TABLE } from "mvp/constants";
import DistributionCard from "./DistributionCard";
import { Spinner } from "core-modules/Loader";

const RenderGraph = ({
    section,
    globalDateRange,
    activeNodeObj,
}) => {

    const dispatch = useDispatch();
    const { user } = useSelector(authState);
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        range: globalDateRange,
        chartData: [],
        chartOptions: chartOptions(),
        updatedChart: 0,
        metadata: {},
    });

    useEffect(() => {
        if (globalDateRange)
            getChartData(globalDateRange);
    }, [globalDateRange, activeNodeObj.key])

    const getChartData = async (range = '', localDateFilter = false) => {
        let dispatchObject = getDispatchObject(range, user, activeNodeObj);
        dispatchObject.section = section;
        let status = checkValidations(section, dispatchObject);
        if (status === true) {
            setLoading(false);
            const { eventsData = [], metadata = {}, groupBy = false } = (section.apiDataPresent && localDateFilter === false) ? section
                : _apiResponse(await dispatch(getEventMetricsData(dispatchObject)).unwrap(), section);
            if (range) {
                let chartOptionsTmp = { ...state.chartOptions }
                let constructedData = constructChartData(eventsData, dispatchObject, groupBy, section.countKey);
                // return;
                chartOptionsTmp.xaxis.categories = constructedData.categories;
                chartOptionsTmp.legend.showForSingleSeries = groupBy ? true : false;
                setState({
                    ...state,
                    updatedChart: Math.random(),
                    chartData: constructedData.series || [],
                    chartOptions: chartOptionsTmp,
                    range: range || globalDateRange,
                    metadata
                });
            }
        } else updateChartValues(status);
        setLoading(true);
    }

    const checkValidations = (section, dispatchObject) => {
        const { level: treeLevl } = dispatchObject;
        const { level: sectionLevel, dataType } = section;
        const { table, database, label } = activeNodeObj;
        if (treeLevl === _OVERALL || dataType === 'metric' || dataType === 'distribution')
            return true;
        else if (sectionLevel === treeLevl)
            return true
        else if (treeLevl === _COLUMN) {
            dispatchObject.connId = database;
            dispatchObject.tableName = table;
            dispatchObject.columnName = label;
            dispatchObject.level = _TABLE;
            return true;
        }
        return false;
    }

    const updateChartValues = (status) => {
        let setObj = {};
        if (status === false || (status === 'retain' && section.level === _DATABASE)) {
            setObj['chartData'] = [];
        }
        setState({ ...state, ...setObj })
    }

    const graphsOrCard = () => {
        if (section.showCards === '!SHOW') return true;
        if (activeNodeObj.type === _OVERALL && state.metadata && state.metadata.dataType === "distribution")
            return false;
        return true;
    }

    return (
        <>
            {graphsOrCard() === true ?
                <div className="flex flex-col gap-2">
                    <p className="font-RakutenRegular"> {section.label} </p>
                    <div style={{
                        padding: '13.5px 0px 20.6px 0px',
                        borderRadius: '12px',
                        boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
                        backgroundColor: '#1F2022',
                        minHeight: '400px'
                    }}>
                        {loading === true ? <Chart
                            title={''}
                            type='line'
                            options={state.chartOptions}
                            series={state.chartData}
                            showCustomLegendTable={false}
                            height="350px"
                            titleIcon=""
                            titleClass="font-RakutenRegular"
                            chartOffsetClass=""
                            updatedChart={state.updatedChart}
                            loading={loading}
                            dateFilter={
                                <GraphLocalDate
                                    state={state}
                                    setState={setState}
                                    getChartData={getChartData}
                                />
                            }
                        /> :
                            <div className="flex w-full justify-center items-center mt-32">
                                <Spinner customStyles={{ borderLeftColor: '#262729' }} />
                            </div>
                        }
                    </div>
                </div> :
                <>
                    <DistributionCard card={state.metadata} activeNodeObj={activeNodeObj} />
                </>
            }
        </>
    );
}

export const getDispatchObject = (dateRange = [], user = {}, activeNodeObj = {}) => {
    const { type: level, table, database, label, id } = activeNodeObj;
    const tenantId = user.tenantId;
    let returnObj = {
        level,
        tenantId,
    };
    if (dateRange) {
        returnObj.startDate = dateRange[0]?.startDate ?? '';
        returnObj.endDate = dateRange[0]?.endDate ?? '';
    }
    if (_DATABASE === level) {
        returnObj.connId = id;
    } else if (_TABLE === level) {
        returnObj.connId = database;
        returnObj.tableName = label;
    } else if (_COLUMN === level) {
        returnObj.connId = database;
        returnObj.tableName = table;
        returnObj.columnName = label;
    }
    return returnObj;
}


export default RenderGraph;