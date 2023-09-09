/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { dqData } from '../reducers';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { dqRulesDataColumns } from '../../anomaliesList/reducers';
import { Divider } from "primereact/divider";
import { getSvgIcons, convertTimeToString } from "../../anomaliesList/reducers";
//
import { fetchAnomalyChartDataBasedOnType, fetchLastExecutions } from "store";
import { useDispatch } from 'react-redux';
import { API_KEY } from "_DO-1.0/reducers";
import { Loading } from "core-modules/Loader";

const DQChart = ({
    eventType,
    anomalyObject,
    fromExpander,
    dateRange,
    user: { tenantId },
    attributes = {}
}) => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        data: [],
        filteredRows: [],
        expandedRow: {},
        nestedRows: {}
    })
    const [loaded, setLoaded] = useState(false);
    useEffect(() => { fetchDQRuleData() }, [eventType, dateRange, anomalyObject?.current_status])

    const fetchDQRuleData = async () => {
        setLoaded(false);
        let setObj = { ...state }
        let response = await dispatch(fetchAnomalyChartDataBasedOnType(getApiObject(API_KEY.fetchAnomalyChartData))).unwrap();
        if (response.status === 200) {
            setObj['data'] = setObj['filteredRows'] = response?.data?.data ?? [];
        }
        // else {
        //   setObj['data'] = setObj['filteredRows'] = dqSummeryData;
        // }
        console.log('dqrules api response: ', response);
        setLoaded(true);
        setState(setObj);
    }

    const getApiObject = (key, subType = '', entityLevel4) => {
        const { entity_level1: entityLevel1, entity_level2: entityLevel2, entity_level3: entityLevel3, entity_level4, conn_id: connId } = anomalyObject;
        let returnObj = {
            ...dateRange,
            key,
            type: eventType,
            subType,
            entityLevel1, entityLevel2, entityLevel3, connId, tenantId,
            entityLevel4: entity_level4 || entityLevel4
        }
        return returnObj;
    }

    const getAssetFieldTemplate = (rowData) => {
        const { events = [] } = rowData;
        return (
            <ul className="flex gap-3 w-full">
                <li style={{ width: '18%' }}>
                    <div className="flex flex-col gap-2">
                        {`[${rowData?.entity_level_3}] ${rowData?.entity_level_4}`}
                        {tagsTemplate(rowData?.tags)}
                    </div>
                </li>
                <li style={{ width: '81%' }} className="flex gap-3 flex-col gap-2">
                    {events.map((event, _i) => {
                        return (
                            <div key={'div_i' + _i} className="flex justify-between">
                                <li style={{ width: '35%' }}> {event.sub_type} </li>
                                <li className="flex flex-col" style={{ width: '65%' }}>
                                    {getNestedRowsData(event)}
                                    {state.expandedRow[getExpandKey(rowData, event)] && <>
                                        {
                                            state.nestedRows?.[getExpandKey(rowData, event)]?.length > 0 ?
                                                state.nestedRows?.[getExpandKey(rowData, event)]?.map(item =>
                                                    getNestedRowsData(item)
                                                ) : <p> There are no past executions found </p>
                                        }
                                    </>}
                                </li>
                                <li className="flex items-center cursor-pointer" onClick={() => handleExpandClick(rowData, event)}> {getSvgIcons('expandToggle', state.expandedRow[getExpandKey(rowData, event)])} </li>
                            </div>
                        )
                    }
                    )}
                </li>
            </ul>
        );
    }

    const handleExpandClick = async (rowData, event) => {
        let setObj = { ...state };
        let expandKey = getExpandKey(rowData, event);
        if (!setObj.expandedRow[expandKey] === true) {
            let response = await dispatch(fetchLastExecutions(getApiObject(API_KEY.fetchLastExecutions, event?.sub_type, rowData?.entity_level_4))).unwrap();
            console.log('last 5 execution api response: ', response);
            if (response.status === 200)
                setObj.nestedRows[expandKey] = response?.data?.data ?? [];
        } else
            delete setObj.nestedRows[expandKey];
        setObj.expandedRow[expandKey] = !setObj.expandedRow[expandKey];
        setState(setObj);
    }

    const getExpandKey = (rowData, event) => {
        const { entity_level_1, entity_level_2, entity_level_3, entity_level_4 } = rowData;
        const { id } = event;
        return `${entity_level_1}_${entity_level_2}_${entity_level_3}_${entity_level_4}_${id}`;
    }

    const getNestedRowsData = (event) => {
        return (
            <div key={'id_' + event.id} className="flex w-full justify-between my-1">
                <li style={{ width: '24%' }}> {event.is_passed ? 'Pass' : 'Fail'}</li>
                <li style={{ width: '23%' }}> {event?.attributes?.element_count} </li>
                <li style={{ width: '16%' }}> {event?.attributes?.unexpected_count} </li>
                <li style={{ width: '20%' }}> {convertTimeToString(convertToISOFormat(event?.attributes?.start_time))?.date} </li>
                <li style={{ width: '17%' }}> {convertTimeToString(convertToISOFormat(event?.attributes?.end_time))?.date} </li>
            </div>
        );
    }

    const tagsTemplate = ({ critical, major, minor }) => {
        return (<div className="flex flex-row items-center gap-3">
            {[critical, major, minor].map((val, index) =>
                <div className="flex items-center gap-1"> <span className={`flex w-4 h-4 ${index === 0 ? 'bg-red-600' : index === 1 ? 'bg-yellow-600' : 'bg-lime-600'} rounded-full border-quaternaryTextColor`} /> {val} </div>
            )}
        </div>
        )
    }

    const getColumns = () => {
        return (
            <ul className="flex gap-3 w-full text-sm">
                {dqRulesDataColumns.map(item =>
                    <li key={item.key + item.field} style={{ width: item.width }}>
                        {item.name}
                    </li>
                )}
            </ul>
        );
    }

    const getvalues = ({ valueKey, value }) => {
        const { element_count, unexpected_count } = attributes;
        if (valueKey === 'subtraction')
            return element_count - unexpected_count;
        if (valueKey.includes('_time'))
            return attributes[valueKey].replace(' ', ' | ');
        return  attributes[valueKey] || value

    }

    return (
        <div >
            <div className="">
                <div className="bg-[#18181B] px-5">
                    {fromExpander === true &&
                        <div className="bg-[#292929] p-5 mx-3 ">
                            <div>
                                <div className='flex flex-wrap flex-row gap-12 mx-6 justify-z my-4'>
                                    {dqData.map((item, _i) => <>
                                        <div key={_i} >
                                            <div className='text-base'>{getvalues(item)}</div>
                                            <div className='text-[#A3A3A3] text-sm my-2'>{item.label}</div>

                                        </div>
                                        {_i === 0 && <div className="flex flex-row"> <Divider layout="vertical " /> </div>}
                                    </>
                                    )}
                                </div>
                            </div>
                        </div>
                    }
                </div>

                {fromExpander !== true && <>
                    <div className="bg-[#292929]">
                        <div className="px-8 pt-6 flex flex-row justify-between">
                            <div className="">
                                <span className='text-xl '>DQ Rules</span>
                                {/* <div className='flex gap-4 my-2'>
                                    <p className='text-[#A3A3A3] text-base mt-[5px]'>Quick Filters</p>
                                    {
                                        [{ label: 'Status', key: 'status' }].map((btn, _index) =>
                                            <Button outlined className=' border-secondaryBorderColor rounded-md'
                                            >
                                                <div className='flex gap-3'>
                                                    <p className='font-RakutenSemibold text-secondaryBtnText rounded-md'>
                                                        {`${btn.label} `}
                                                    </p>
                                                    <img src={downIcon} alt='down' />
                                                </div>
                                            </Button>
                                        )
                                    }
                                    {
                                        [{ label: 'Rule Type', key: 'rule_type' }].map((btn, _index) =>
                                            <Button outlined className=' border-secondaryBorderColor rounded-md'
                                            >
                                                <div className='flex gap-3'>
                                                    <p className='font-RakutenSemibold text-secondaryBtnText rounded-md'>
                                                        {`${btn.label} `}
                                                    </p>
                                                    <img src={downIcon} alt='down' />
                                                </div>
                                            </Button>
                                        )
                                    }
                                </div> */}
                            </div>

                            {/* <div className="flex flex-row items-center gap-2">
                                {collaboratorsTemplate('', '')}
                                <span className=""> Last Update 12:23 pm </span>
                            </div> */}
                        </div>
                        <Divider />
                        <div className="px-5 dq-long-table">
                            <DataTable
                                value={loaded ? state.filteredRows : []}
                                dataKey="entity_level_4"
                                tableStyle={{ minWidth: '50rem' }}
                                selectionAutoFocus={false}
                                className="dq-anomalies-summery-table py-[1rem] w-[150%]"
                                emptyMessage={loaded ? <p className="flex justify-center"> No Anomalies found </p> : <Loading />}
                            >
                                <Column
                                    key="asset_field"
                                    field="asset_field"
                                    header={getColumns()}
                                    body={(rowData) => getAssetFieldTemplate(rowData)}
                                />
                            </DataTable>
                        </div>
                    </div>
                </>}
            </div>
        </div >

    )
}
//JUST FOR DEMO
function convertToISOFormat(inputDateTime) {
    const parts = inputDateTime.split(' ');
  
    const dateParts = parts[0].split('/');
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];
  
    const time = parts[1];
  
    const isoDateTime = `${year}-${month}-${day} ${time}`;
    return isoDateTime;
  }
export default DQChart;