/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ExpandAnomaly from "./ExpandAnomaly";
import dqRuleIcon from '../../../assets/dqRule.svg';
import freshnessIcon from '../../../assets/freshness.svg';
import volumeIcon from '../../../assets/volume.svg';
import schemaChangeIcon from '../../../assets/schemaChange.svg';
import downIcon from '../../../assets/downArrow.svg';
import fileListIcon from '../../../assets/file-overview-ui.svg';
import tableListIcon from '../../../assets/table-overview-ui.svg';
import fixedInProgressIcon from '../../../assets/inprogress.svg';
import criticalIcon from '../../../assets/critical.svg';
// import majorIcon from '../../../assets/major.svg';
// import minorIcon from '../../../assets/minor.svg';
import openIcon from '../../../assets/open.svg';
import collaboratorIcon from '../../../assets/collaborator.svg';
import collaborator2Icon from '../../../assets/collaborator2.svg';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { useLocation } from "react-router-dom";
import { Checkbox } from "primereact/checkbox";
import classNames from "classnames";
import { customMenuTemplate } from '_DO-1.0/sharedComponents/customMenuTemplate';
import { customPaginatorTemplate } from "_DO-1.0/sharedComponents/customPaginatorTemplate";
import { Loading } from "core-modules/Loader";
import {
    convertTimeToString,
    getSvgIcons,
    getRelativeTime,
    anomalyTableColumns,
    filterButtons,
    statusOptions,
    issueTypeOptions,
    severityOptions,
    sortableColums
} from "../reducers";
import { useEffect } from "react";
import { fetAllAnomalies } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { API_KEY, FIXED, INPROGRESS, OPEN, READABLE_SEVERITY } from "_DO-1.0/reducers";
import { getDatesInUTC } from '_DO-1.0/reducers';
import { authState } from 'store';
import { READBLE_EVENT_TEXT, READBLE_STATUS_TEXT, FRESHNESS, VOLUME, SCHEMA_CHANGE, FIELD_HEALTH, DQ_RULES } from "_DO-1.0/reducers";
import { removeDuplicateObjects } from "helpers";

const AnomaliesOverview = ({ dateRange }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(authState);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let issueType = queryParams.get('filter') || '';
    const issueTypeRef = useRef(null);
    const statusRef = useRef(null);
    const assetsRef = useRef(null);
    const severityRef = useRef(null);
    const [state, setState] = useState({
        data: [],
        filteredRows: [],
        selectedAnomalies: null,
        assetsSelected: [],
        statusSelected: [],
        issueTypeSelected: issueType ? [issueType] : [],
        severitySelected: [],
        dateRange: [getDatesInUTC('last7days')],
        assetsOptions: [],
    });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getAnomaliesList(dateRange);
    }, [dateRange])

    const getAnomaliesList = async (dateRange) => {
        setLoaded(false);
        let setObj = { ...state };
        let response = await dispatch(fetAllAnomalies({ ...dateRange[0], tenantId: user.tenantId, key: API_KEY.fetchAllAnomalies })).unwrap();
        console.log('overview api => ', response);
        if (response.status === 200)
            setObj['data'] = setObj['filteredRows'] = response?.data?.data ?? [];
        // else
        //     setObj['data'] = setObj['filteredRows'] = tableData;
        setObj['statusSelected'] = statusOptions.filter(option => option.default).map(_op => _op.key)
        setObj['filteredRows'] = filterOutAnomalies('', setObj['statusSelected'], setObj.issueTypeSelected, setObj.assetsSelected, setObj.severitySelected, setObj['data']);
        let assetOptions = [{ key: 'all', label: 'All' }].concat(getAssetsDropdownOptions(setObj.data));
        setObj['assetsOptions'] = removeDuplicateObjects(assetOptions, 'key');
        setLoaded(true);
        setState(setObj);
    }

    const getAssetsDropdownOptions = (data) => {
        return data.map(item => {
            return {
                key: `${item.entity_level2}-${item.entity_level3}`,
                label: <div className="flex flex-col justify-start">
                    <p className="flex items-center gap-1 font-PrimaryFont text-primaryTextColor"> {item.entity_level3} </p>
                    <p className="font-PrimaryFont text-quaternaryTextColor"> {item.entity_level2} </p>
                </div>
            }
        })
    }

    const handleSearch = ({ target: { value = '' } }) => {
        let filteredRows = filterOutAnomalies(value, state.statusSelected, state.issueTypeSelected, state.assetsSelected, state.severitySelected);
        setState({ ...state, filteredRows, searchTerm: value })
    }

    const filterOutAnomalies = (searchTerm, selectedStatus, issueTypeSelected, assetsSelected, severitySelected, data) => {
        data = data ? data : state.data;
        let filteredRows = [];
        if (searchTerm || selectedStatus.length || issueTypeSelected.length || assetsSelected.length) {
            let status = true;
            filteredRows = data.filter((item) => validateFilters(item, selectedStatus, issueTypeSelected, assetsSelected, severitySelected, searchTerm, status))
        } else filteredRows = data;
        return filteredRows;
    }

    const validateFilters = (item, selectedStatus, issueTypeSelected, assetsSelected, severitySelected, searchTerm, status) => {
        if (status && selectedStatus.length)
            status = selectedStatus.includes(item.current_status)
        if (status && issueTypeSelected.length)
            status = issueTypeSelected.includes(item.event_type)
        if (status && assetsSelected.length)
            status = assetsSelected.includes(`${item.entity_level2}-${item.entity_level3}`)
        if (status && severitySelected.length)
            status = severitySelected.includes(item.severity)
        if (status && selectedStatus && searchTerm)
            status = `${item['entity_level3']}`.concat(`${item.entity_level2}`, `${item.entity_level3}`).toLowerCase().toString().indexOf(searchTerm.toLowerCase().toString()) !== -1;
        return status;
    }

    const getBodyTemplate = (rowData, key) => {
        let template = null;
        switch (key) {
            case 'assetName':
                template = assetNameTemplate(rowData.asset_type, rowData.entity_level2, rowData.entity_level3);
                break;
            case 'eventType':
                template = eventTypeTemplate(rowData);
                break;
            case 'description':
                template = descriptionTemplate(rowData);
                break;
            case 'severity':
                template = severityTemplate(rowData);
                break;
            case 'status':
                template = statusTemplate(rowData);
                break;
            case 'collaborators':
                template = collaboratorsTemplate(rowData);
                break;
            case 'event_time':
                template = timeBodyTemplate(rowData);
                break;
            case 'elapsedTime':
                template = elapsedTimeBodyTemplate(rowData);
                break;
            default:
                break;
        }
        return template;
    }

    const getOptionTemplate = (options, stateKey) => {
        return <ul className={classNames('max-h-80 overflow-auto bg-primaryBgColor', 'flex flex-col', 'gap-1 py-3', 'font-PrimaryFont text-primaryTextColor')}>
            {options.map((option, _i) =>
                <li onClick={e => handleOptionSelect({ option, e, stateKey }, options)} key={_i} className={classNames('gap-3 flex items-center pl-5 py-2', 'cursor-pointer', 'hover:bg-quaternaryBgColor')}>
                    <Checkbox
                        id={`${stateKey}_checkbox_${_i}`}
                        checked={state[stateKey].includes(option.key)}
                    />
                    {option.label}
                </li>
            )}
        </ul>
    }

    const optionsTemplate = {
        status: getOptionTemplate(statusOptions, 'statusSelected'),
        issueType: getOptionTemplate(issueTypeOptions, 'issueTypeSelected'),
        assets: getOptionTemplate(state.assetsOptions, 'assetsSelected'),
        severity: getOptionTemplate(severityOptions, 'severitySelected')
    }

    const handleFilterBtnClick = (e, btn) => {
        let setObj = { ...state };
        setState(setObj);
        if (btn.key === 'assets')
            assetsRef.current.toggle(e)
        if (btn.key === 'status')
            statusRef.current.toggle(e)
        if (btn.key === 'issueType')
            issueTypeRef.current.toggle(e)
        if (btn.key === 'severity')
            severityRef.current.toggle(e)
    }

    const handleOptionSelect = ({ option, e, stateKey }, allOptions) => {
        e.stopPropagation()
        let setObj = { ...state };
        let selectedOption = [...setObj[stateKey]];
        if (option.key === 'all')
            handleAllCheckbox(setObj, stateKey, selectedOption, allOptions);
        else {
            if (selectedOption.includes(option.key))
                selectedOption.splice(selectedOption.indexOf(option.key), 1);
            else
                selectedOption.push(option.key);
            selectedOption = handleAllCheckbox(setObj, stateKey, selectedOption, allOptions, 1);
            setObj[stateKey] = selectedOption;
            setObj['filteredRows'] = filterOutAnomalies(setObj['searchTerm'], setObj['statusSelected'], setObj['issueTypeSelected'], setObj['assetsSelected'], setObj['severitySelected'])
            setState(setObj);
        }
    }

    const handleAllCheckbox = (setObj, stateKey, selectedOption, allOptions, type = 0) => {
        if (type) {
            if (selectedOption.includes('all'))
                selectedOption.splice(selectedOption.indexOf('all'), 1);
            if (selectedOption.length === allOptions.length - 1)
                selectedOption.push('all')
            return selectedOption;
        }
        setObj[stateKey] = selectedOption.includes('all') ? [] : allOptions.map(option => option.key)
        setObj['filteredRows'] = filterOutAnomalies(setObj['searchTerm'], setObj['statusSelected'], setObj['issueTypeSelected'], setObj['assetsSelected'], setObj['severitySelected'])
        setState(setObj);
    }

    const getCount = (btn) => {
        let selectedFilters = [...state[`${btn.key}Selected`]];
        if (selectedFilters.length) {
            if (selectedFilters.includes('all'))
                selectedFilters.splice(selectedFilters.indexOf('all'), 1);
            return `(${selectedFilters.length})`
        }
        return '';
    }

    return (
        <div className="mt-16">
            <div className="flex justify-between">
                <div className="flex gap-3">
                    {filterButtons.map((btn, _index) =>
                        <Button outlined className='border-secondaryBorderColor rounded-md' key={_index}
                            onClick={e => handleFilterBtnClick(e, btn)}>
                            <div className={`flex gap-3 justify-between ${btn.key === 'status' ? 'w-[6rem]' : btn.key === 'issueType' ? 'w-[8rem]' : 'w-[7rem]'}`}>
                                <p className='font-RakutenSemibold text-secondaryBtnText rounded-md'>
                                    {`${btn.label} ${getCount(btn)}`}
                                </p>
                                <img src={downIcon} alt='down' />
                                <Menu
                                    model={customMenuTemplate({ optionTemplate: optionsTemplate[btn.key] })}
                                    popup
                                    ref={btn.key === 'status' ? statusRef : btn.key === 'issueType' ? issueTypeRef : btn.key === 'severity' ? severityRef : assetsRef}
                                    id={btn.key}
                                />
                            </div>
                        </Button>
                    )}
                </div>
                <div className="flex w-[25rem] -mr-1">
                    <span className="w-full p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText placeholder="Search" className="w-full h-12 rounded-lg"
                            onChange={handleSearch}
                            value={state.searchTerm}
                        />
                    </span>
                </div>
            </div>
            <div className="w-full mt-12 text-sm">
                <p className="font-PrimaryFont text-secondaryTextColor mb-4 ml-3">
                    Manage your recent issues across all data sources
                </p>
                <DataTable
                    value={loaded ? state.filteredRows : []}
                    selectionMode={'checkbox'}
                    selection={state.selectedAnomalies}
                    onSelectionChange={(e) => setState({ ...state, selectedAnomalies: e.value })}
                    dataKey="id"
                    expandedRows={state.expandedRows}
                    onRowToggle={(e) => setState({ ...state, expandedRows: e.data })}
                    expandedRowIcon={() => getSvgIcons('expandToggle', 1)}
                    collapsedRowIcon={() => getSvgIcons('expandToggle', 0)}
                    tableStyle={{ minWidth: '50rem' }}
                    selectionAutoFocus={false}
                    rowExpansionTemplate={(rowData) =>
                        <ExpandAnomaly
                            anomalyObject={rowData}
                            dateRange={dateRange}
                            user={user}
                        />
                    }
                    paginator
                    paginatorTemplate={customPaginatorTemplate}
                    rows={10}
                    removableSort
                    className="anomalies-table"
                    sortField="event_time" 
                    sortOrder={-1}
                    emptyMessage={loaded ? <p className="flex justify-center"> No Anomalies found </p> : <Loading />}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    {anomalyTableColumns.map((anomalyCol, _i) =>
                        <Column
                            key={"index_" + _i}
                            field={anomalyCol.field}
                            header={anomalyCol.name}
                            body={(rowData) => getBodyTemplate(rowData, anomalyCol.key)}
                            sortable={sortableColums.includes(anomalyCol.field)}
                        />
                    )}
                    <Column expander={true} style={{ width: '3rem' }} />
                </DataTable>
            </div>
        </div>
    );
}

export const eventTypeTemplate = (rowData) => {
    let entityType = rowData.event_type || '';
    let imgSrc = null, typeText = '';
    switch (entityType) {
        case FRESHNESS:
            imgSrc = freshnessIcon;
            typeText = READBLE_EVENT_TEXT[FRESHNESS];
            break;
        case DQ_RULES:
            imgSrc = dqRuleIcon;
            typeText = READBLE_EVENT_TEXT[DQ_RULES];
            break;
        case VOLUME:
            imgSrc = volumeIcon;
            typeText = READBLE_EVENT_TEXT[VOLUME];
            break;
        case FIELD_HEALTH:
            imgSrc = volumeIcon;
            typeText = READBLE_EVENT_TEXT[FIELD_HEALTH];
            break;
        case SCHEMA_CHANGE:
            imgSrc = schemaChangeIcon;
            typeText = READBLE_EVENT_TEXT[SCHEMA_CHANGE];
            break;
        default:
            break;
    }
    return <div className="flex gap-3">
        <img src={imgSrc} alt={typeText} height="24px" width="24px" />
        <p> {typeText} </p>
    </div>
}

export const timeBodyTemplate = (rowData, direction = 'quaternaryTextColor flex-col', elapsed = 1) => {
    let timeStringObj = convertTimeToString(rowData.event_time)
    let elapsedTime = getRelativeTime(rowData.event_time);
    return <div className={`flex gap-1 ${elapsed === 1 && 'justify-center'} items-start ${direction}`}>
        {elapsed === 1 && <p> {elapsedTime} </p>}
        <p className={`text-${direction}`}> {timeStringObj.date} </p>
    </div>
}

export const assetNameTemplate = (asset_type, entity_level2, entity_level3) => {
    return <>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D6D6D6] rounded-full flex justify-center">
                <img src={asset_type === 'table' ? tableListIcon : fileListIcon} alt="" width="20px" />
            </div>
            <div className="flex flex-col">
                <p className="flex items-center gap-1 font-PrimaryFont text-primaryTextColor"> {entity_level3} </p>
                <p className="font-PrimaryFont text-quaternaryTextColor"> {entity_level2} </p>
            </div>
        </div>
    </>
}

export const elapsedTimeBodyTemplate = (rowData) => {
    let elapsedString = getRelativeTime(rowData.event_time)
    return <p> {elapsedString} </p>
}

export const collaboratorsTemplate = (rowData, margin = "-ml-2") => {
    return <div className="flex">
        <img src={collaboratorIcon} alt="" />
        <img src={collaborator2Icon} alt="" className={margin} />
    </div>
}

export const descriptionTemplate = ({ event_description }) => {
    return <>
        <div className="flex gap-3 items-center">
            <p> {event_description} </p>
        </div>
    </>
}


export const statusTemplate = ({ current_status }) => {
    let text, icon, bgColor = 'bg-[#054F31]', textColor, width = 'w-20';
    if (current_status === OPEN) {
        text = READBLE_STATUS_TEXT[OPEN];
        icon = openIcon;
        bgColor = 'bg-[#FFD6AE]';
        textColor = 'text-[#FF692E]';
    }
    if (current_status === INPROGRESS) {
        text = READBLE_STATUS_TEXT[INPROGRESS];
        icon = fixedInProgressIcon;
        width = 'w-28';
    }
    if (current_status === FIXED) {
        text = READBLE_STATUS_TEXT[FIXED];
        icon = fixedInProgressIcon;
    }

    return <>
        <div className={`flex items-center px-2 py-1 ${width} rounded-2xl ${bgColor} gap-2`}>
            <img src={icon} alt={text} width="10px" />
            <p className={`text-sm ${textColor}`}> {text} </p>
        </div>
    </>
}

export const severityTemplate = ({ severity }) => {
    const severityText = READABLE_SEVERITY[severity] || 'Critical';
    return <div className="flex flex-row items-center gap-1">
        <img src={criticalIcon} alt="severity" />
        <span> {severityText} </span>
    </div>
}
export default React.memo(AnomaliesOverview);