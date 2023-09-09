/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { constructChartData } from "../reducers/chartReducer";
import Chart from "components/charts";
import { Spinner } from "core-modules/Loader";
import { getStatusText } from "_DO-1.0/components/anomaliesList/molecules/ExpandAnomaly";
import { Divider } from "primereact/divider";
import { anomalyChartLegends } from "../reducers/chartReducer";
import { Button } from 'primereact/button';
import downIcon from '../../../assets/downArrow.svg';
import { volumeTypeOptions } from "../reducers";
import { Dropdown } from 'primereact/dropdown';
//
import { fetchAnomalyChartDataBasedOnType } from "store";
import { useDispatch } from 'react-redux';
import { API_KEY, FIELD_HEALTH, FRESHNESS, SCHEMA_CHANGE, VOLUME } from "_DO-1.0/reducers";
const DEFAULT_HEIGHT = {
    height: '350px',
    minHeight: '400px'
}
const AnomalyChart = ({
    eventType,
    anomalyObject,
    fromExpander,
    dateRange,
    user: { tenantId }
}) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        loading: false,
        chartData: [],
        chartOptions: {},
        chartType: 'bar',
        volumeType: 'row_count',
        volumeSubtype: 'row_count',
        defaultSize: 'size',
        defaultCount: 'row_count',
        ...DEFAULT_HEIGHT
    });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => { getAnomalyChartData() }, [
        eventType, 
        dateRange, 
        state.volumeType, 
        state.volumeSubtype,
        anomalyObject?.current_status
    ])

    const getAnomalyChartData = async () => {
        setLoaded(false);
        let setObj = { ...state };
        let response = await dispatch(fetchAnomalyChartDataBasedOnType(getApiObject())).unwrap()
        console.log(`chart ${eventType} response`, response);
        let constructedData = {};
        if (response.status === 200)
            constructedData = constructChartData(dateRange.startDate, dateRange.endDate, response?.data || [], eventType);
        else
            constructedData = constructChartData(dateRange.startDate, dateRange.endDate, [], eventType);
        console.log(constructedData);
        setLoaded(true)
        setObj['minHeight'] = constructedData.minHeight || DEFAULT_HEIGHT.minHeight;
        setObj['height'] = constructedData.height || DEFAULT_HEIGHT.height;
        setObj['chartType'] = constructedData.typeOfChart || state.chartType;
        setObj['chartData'] = constructedData.series || [];
        setObj['chartOptions'] = constructedData.chartOptions || {};
        setState(setObj)
    }

    const getApiObject = () => {
        const { entity_level1: entityLevel1, entity_level2: entityLevel2, entity_level3: entityLevel3, conn_id: connId } = anomalyObject;
        let returnObj = {
            ...dateRange,
            key: API_KEY.fetchAnomalyChartData,
            type: eventType,
            entityLevel1, entityLevel2, entityLevel3, connId, tenantId,
        }
        if (eventType === VOLUME) {
            returnObj.volumeType = state.volumeType
            returnObj.volumeSubtype = state.volumeSubtype
        }
        return returnObj;
    }

    const customLegendTemplate = (<>
        <ul className="flex gap-3 mt-6 mx-10">{anomalyChartLegends.map(item =>
            <li key={item.key} className="flex items-center gap-3"> <div style={{ backgroundColor: item.fillColor }} className={`w-3 h-3`}></div> <span className="text-secondaryTextColor">{item.name} </span></li>
        )}</ul>
    </>);

    const volumeOptions = () => {
        return <div className="flex gap-3 mt-1 items-center">
            Chart Type
            {['Type', 'Subtype'].map(item => {
                const options = item === 'Subtype' ? volumeTypeOptions.Subtype[state.volumeType] : volumeTypeOptions.Type
                return (
                    <div className="volumechart-filters" key={'volumeitem-' + item}>
                        <Dropdown
                            value={options?.filter(op => op.key === state[`volume${item}`])?.[0] ?? {}}
                            onChange={({ value }) => handleVolumeOptionChange(item, value)}
                            options={options}
                            optionLabel="label"
                            className={item === 'Type' ? 'w-36' : 'w-[11.5rem]'}
                        />
                    </div>
                );
            }
            )}
        </div>
    }

    const handleVolumeOptionChange = (item, value) => {
        let setObj = {...state};
        if (item === 'Type') {
            setObj['volumeSubtype'] = value.key === 'row_count' ? setObj.defaultCount : setObj.defaultSize;
        }
        setObj[`volume${item}`] = value.key;
        setState(setObj)
    }

    return (
        <div className="flex flex-col" style={{
            backgroundColor: fromExpander ? 'var(--secondary-bg-colo)' : 'var(--primary-bg-color)',
        }}>
            {fromExpander !== true && <>
                <div className="mx-8 mt-4 flex justify-between">
                    <div className="flex flex-col font-PrimaryFont text-lg"> {getStatusText(eventType)} Trends
                        {[FRESHNESS, VOLUME, SCHEMA_CHANGE].includes(eventType) && <div className="text-sm text-secondaryTextColor"> {
                            eventType === VOLUME ? volumeOptions() : 'In Tables'
                        } </div>}
                        {eventType === FIELD_HEALTH && <>
                            <div className="mt-2 flex gap-2 items-center">
                                <span className="text-sm text-secondaryTextColor"> {'assetDetails?.entity_level4'} </span>
                                <Button
                                    outlined
                                    className="border-secondaryBorderColor rounded-md text-secondaryBtnText h-8">
                                    <div className="flex gap-1"> <span>  % Uniques </span>
                                        <img src={downIcon} alt="down" />
                                    </div>
                                </Button>
                            </div>
                        </>}
                    </div>
                    {/* <div className="flex items-center gap-1">
                        {collaboratorsTemplate('', '')}
                        <span className=""> Last Update 12:23 pm </span>
                    </div> */}
                </div>
                <Divider />
            </>}
            <div style={{
                padding: '0 0px 20.6px 0px',
                borderRadius: '12px',
                boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
                minHeight: state.minHeight
            }}
                className={"apexchart-parent-div_" + eventType}
            >
                {loaded === true ? <Chart
                    title={''}
                    type={state.chartType}
                    options={state.chartOptions}
                    series={state.chartData}
                    showCustomLegendTable={false}
                    showCustomLegend={false}
                    customLegendTemplate={customLegendTemplate}
                    height={state.height}
                    titleIcon=""
                    titleClass="font-RakutenRegular"
                    chartOffsetClass=""
                    updatedChart={state.updatedChart}
                    loading={loaded}
                /> :
                    <div className="flex w-full justify-center items-center mt-32">
                        <Spinner customStyles={{ borderLeftColor: '#262729' }} />
                    </div>
                }
            </div>
        </div>
    )
}

export default AnomalyChart;