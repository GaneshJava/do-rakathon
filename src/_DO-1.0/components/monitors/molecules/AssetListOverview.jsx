/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssetsForMonitor } from "store";
import { customPaginatorTemplate } from "_DO-1.0/sharedComponents/customPaginatorTemplate";
import { getSvgIcons } from "_DO-1.0/components/anomaliesList/reducers";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { tableLevelMonitorCols, fieldLevelMonitorsCols, nestedTableCols } from "../reducers";
import { Loading } from "core-modules/Loader";
import { assetNameTemplate } from "_DO-1.0/components/anomaliesList/molecules/AnomaliesOverview";
import { BsPlus } from 'react-icons/bs';
import { CRITICAL, DQ_RULES, EMPTY_KEY, FIELD_HEALTH, FRESHNESS, MAJOR, MINOR, SCHEMA_CHANGE, VOLUME } from "_DO-1.0/reducers";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { useLocation } from "react-router-dom";
import threedotsIcon from 'assets/images/threedotsIcon.svg';
import { Divider } from 'primereact/divider';
import { assetListFilterButtons } from "../reducers";
import downIcon from '../../../assets/downArrow.svg';
import { customMenuTemplate } from '_DO-1.0/sharedComponents/customMenuTemplate';
import { Menu } from 'primereact/menu';
import { Checkbox } from "primereact/checkbox";
import classNames from "classnames";
import Drawer from 'core-modules/Drawer';
import ConfigurationBase from "./ConfigurationBase";
import { getDropdownOptions, getMonitorCounts } from "../reducers/microFunctions";
import { authState, deleteMonitor, fetchAllConnectionBasedOnTenant } from "store";
import { toast } from 'react-toastify';
import { capitalize } from "helpers";
import { readableGreateExpRules } from "../reducers/ruleReducer";
import { READABLE_SEVERITY } from "_DO-1.0/reducers";
import criticalIcon from '../../../assets/critical.svg';
import majorIcon from '../../../assets/major.svg';
import minorIcon from '../../../assets/minor.svg';
import closeIcon from '../../../../assets/images/close-btn.svg';

const AssetListOverview = () => {
    const { user } = useSelector(authState);
    const [staticLoading, setStaticLoading] = useState(false);
    const ellipsisRef = useRef(null);
    const viewRef = useRef(null);
    const connectionRef = useRef(null);
    const databaseRef = useRef(null);
    const schemaRef = useRef(null);
    const assetsRef = useRef(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let monitorType = queryParams.get('type') || '';

    const [loaded, setLoaded] = useState(false);
    const [ellipsis, setEllipsis] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [connectionState, setConnectionState] = useState({
        options: [],
        selectedConnection: '',
        selectedConnectionObj: {},
    });
    const [state, setState] = useState({
        monitorType,
        selectedAssets: [],
        selectedFields: [],
        assetList: [],
        filteredAssetList: [],
        monitorColums: [],
        //filters-----
        searchTerm: '',
        databaseSelected: [],
        schemaSelected: [],
        assetsSelected: [],
        databaseOptions: [],
        schemaOptions: [],
        assetsOptions: [],
        showDeleteModal: false,
        deleteMonitorId: null,
        showMonitorModal: '',
    })

    useEffect(() => {
        document.addEventListener('click', closeEllipsis, true);
        getAssetListForMonitor(true);
        getAllConnections()
    }, [monitorType])

    const closeEllipsis = (e) => {
        if (ellipsisRef.current && !ellipsisRef.current.contains(e.target))
            setEllipsis(false)
        if (viewRef.current && !viewRef.current.contains(e.showMonitorModal))
            setViewModal(false);
    };

    const getAllConnections = async () => {
        let connectionStateObj = { ...connectionState };
        const response = await dispatch(fetchAllConnectionBasedOnTenant(user.tenantId)).unwrap();
        console.log('connections API response:', response);
        if (response.status === 200) {
            connectionStateObj.options = response?.data ?? [];
            // connectionStateObj.selectedConnection = connectionStateObj.options[0].connId ?? '';
            // connectionStateObj.selectedConnectionObj = connectionStateObj.options[0] ?? {};
            setConnectionState(connectionStateObj);
            getAssetListForMonitor(true);
        }
    }

    const getAssetListForMonitor = async (onMount = false, connId = '') => {
        const selectedConnection = connId || connectionState.selectedConnection;
        if (onMount) setLoaded(false);
        if (selectedConnection) {
            let setObj = { ...state };
            const apiResponse = await dispatch(fetchAssetsForMonitor({ tenantId: user.tenantId, connId: selectedConnection, monitorType })).unwrap();
            console.log('asset list monitor API:', apiResponse);
            if (apiResponse.status === 200) {
                setObj['assetList'] = setObj['filteredAssetList'] = apiResponse?.data ?? [];
            } else {
                setObj['assetList'] = setObj['filteredAssetList'] = [];
            }
            setObj['assetList'] = setObj['filteredAssetList'] = monitorType === 'field' ? getMonitorCounts(setObj['assetList']) : setObj['assetList'];
            setObj['monitorColums'] = monitorType === 'field' ? fieldLevelMonitorsCols : tableLevelMonitorCols;
            setObj['showDeleteModal'] = false;
            setObj = getFilterOptions(setObj, setObj.assetList);
            setObj['filteredAssetList'] = filterOutAssets(setObj.searchTerm, setObj.databaseSelected, setObj.schemaSelected, setObj.assetsSelected, setObj.assetList)
            handleDrawer(false)
            setState(setObj)
        }
        setLoaded(true);
    }

    const getFilterOptions = (setObj, assetList) => {
        const { databaseOptions, schemaOptions, assetsOptions } = getDropdownOptions(assetList);
        setObj.databaseOptions = databaseOptions;
        setObj.schemaOptions = schemaOptions;
        setObj.assetsOptions = assetsOptions;
        return setObj;
    }

    const handleDelete = async () => {
        try {
            const response = await dispatch(deleteMonitor(state.deleteMonitorId)).unwrap();
            if (response.status === 200) {
                toast.success('Monitor Deleted Successfully', {
                    position: toast.POSITION.TOP_CENTER,
                    style: { backgroundColor: 'white', color: 'black' }
                });
                getAssetListForMonitor();
            }
        } catch (error) {
            console.error("Error while sending data to the server:", error);
        }
    };

    const getBodyTemplate = (rowData, { key, name: fieldLevelKey }, assetData = {}) => {
        let template = null;
        switch (key) {
            case 'asset_name':
                template = assetNameTemplate(rowData.asset_type, rowData.entity_level_1, rowData.entity_level_3);
                break;
            case FRESHNESS: case VOLUME: case SCHEMA_CHANGE:
                template = eventTypeAddDeleteTemplate(rowData, key);
                break;
            case DQ_RULES: case FIELD_HEALTH:
                template = eventTypeAddDeleteTemplate(rowData, key, 1);
                break;
            case EMPTY_KEY:
                template = eventTypeAddDeleteTemplate(rowData, fieldLevelKey, 0, assetData);
                break;
            case 'field_name':
                template = <p className="font-PrimaryFont text-primaryTextColor"> {rowData?.field_name} </p>;
                break;
            default:
                break;
        }
        return template;
    }

    const eventTypeAddDeleteTemplate = (rowData, eventType, fieldLevel = 0, assetData = {}) => {
        const monitor_details = rowData?.monitor_details ?? {};
        let eventLevelAssetMonitor = monitor_details?.[`${eventType}RuleConfig`]?.[0] ?? null;
        let eventLevelRules = monitor_details?.[`${eventType}RuleConfig`] ?? [];
        return <>
            <div className="flex items-center gap-1">
                <>
                    {eventLevelAssetMonitor ?
                        <div className="flex items-center gap-3 py-[2px] pl-2 pr-4 border border-quaternaryTextColor rounded-[20px]"> {eventLevelAssetMonitor.monitorName}
                            <div className="">
                                <img src={threedotsIcon} alt="" className="hover:opacity-70 cursor-pointer" onClick={(e) => handleEllipsisOption(e, rowData, eventLevelAssetMonitor, eventLevelRules)} />
                            </div>
                        </div>
                        :
                        <div className="flex items-center cursor-pointer" onClick={() => handleAddMonitors(rowData, eventType, fieldLevel, assetData)}>
                            <BsPlus color="#f79008" size={30} />
                            <p className="text-primaryTextColor"> {fieldLevel ? 'Add for All Fields' : 'Add'} </p>
                        </div>
                    }


                </>
            </div>
        </>
    }

    const handleDeleteClick = () => {
        const { selectedEllipseMonitorData } = state;
        setState({
            ...state,
            showDeleteModal: true,
            deleteMonitorId: selectedEllipseMonitorData?.id ?? null
        })
    }

    const handleAddMonitors = (rowData, eventType, fieldLevel, assetData) => {
        if (eventType === FIELD_HEALTH) return;
        let setObj = { ...state };
        let configureData = {};
        if (fieldLevel) {
            configureData.selectedFields = rowData?.asset_fields ?? [];
        } else {
            configureData.selectedFields = [rowData];
        }
        configureData.selectedEventType = eventType;
        configureData.monitorType = monitorType;
        setObj.configureData = configureData;
        setState(setObj);
        handleDrawer(true)
    }

    const handleEllipsisOption = (e, rowData, eventLevelAssetMonitor, eventLevelRules) => {
        let setObj = { ...state }
        const ellipseIcon = e.target;
        const rect = ellipseIcon.getBoundingClientRect();
        const newTop = window.scrollY + rect.top + 10;
        const newLeft = window.scrollX + rect.left + rect.width + 10;  // Adjust the offset as needed
        setObj['ellipsisTop'] = newTop;
        setObj['ellipsisLeft'] = newLeft;
        setObj['selectedEllipseMonitorData'] = eventLevelAssetMonitor;
        setObj['selectedEllipseRowData'] = rowData;
        setObj['selectedEllipseRules'] = eventLevelRules;
        setState(setObj)
        setEllipsis(true);
    }

    const handleSearch = ({ target: { value = '' } }) => {
        let filteredAssetList = filterOutAssets(value, state.databaseSelected, state.schemaSelected, state.assetsSelected);
        setState({ ...state, filteredAssetList, searchTerm: value })
    }

    const filterOutAssets = (searchTerm, databaseSelected, schemaSelected, assetsSelected, data = null) => {
        data = data ? data : state.assetList;
        let filteredAssetList = [];
        if (searchTerm || databaseSelected.length || schemaSelected.length || assetsSelected.length) {
            let status = true;
            filteredAssetList = data.filter((item) => validateFilters(item, databaseSelected, schemaSelected, assetsSelected, searchTerm, status))
        } else filteredAssetList = data;
        return filteredAssetList;
    }

    const validateFilters = (item, databaseSelected, schemaSelected, assetsSelected, searchTerm, status) => {
        if (status && databaseSelected.length)
            status = databaseSelected.includes(item.entity_level_1)
        if (status && schemaSelected.length)
            status = schemaSelected.includes(item.entity_level_2)
        if (status && assetsSelected.length)
            status = assetsSelected.includes(`${item.entity_level_2}-${item.entity_level_3}`)
        if (status && searchTerm)
            status = `${item['entity_level_3']}`.concat(`${item.entity_level_2}`, `${item.entity_level_3}`).toLowerCase().toString().indexOf(searchTerm.toLowerCase().toString()) !== -1;
        return status;
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
        database: getOptionTemplate(state.databaseOptions, 'databaseSelected'),
        schema: getOptionTemplate(state.schemaOptions, 'schemaSelected'),
        assets: getOptionTemplate(state.assetsOptions, 'assetsSelected'),
    }

    const handleFilterBtnClick = (e, btn) => {
        let setObj = { ...state };
        setState(setObj);
        if (btn.key === 'assets')
            assetsRef.current.toggle(e)
        if (btn.key === 'database')
            databaseRef.current.toggle(e)
        if (btn.key === 'schema')
            schemaRef.current.toggle(e)
        if (btn.key === 'connection')
            connectionRef.current.toggle(e)
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
            setObj['filteredAssetList'] = filterOutAssets(setObj['searchTerm'], setObj['databaseSelected'], setObj['schemaSelected'], setObj['assetsSelected'])
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
        setObj['filteredAssetList'] = filterOutAssets(setObj['searchTerm'], setObj['databaseSelected'], setObj['schemaSelected'], setObj['assetsSelected'])
        setState(setObj);
    }

    const handleNestedTable = (assetData) => {
        return (
            <div className="field-expander-table">
                <DataTable value={assetData?.asset_fields} selectionMode={'checkbox'}
                    selection={state.selectedFields} rowClassName="nested-table-row" cellClassName="nested-table-cell"
                    onSelectionChange={(e) => handleSelectionChange(e)}
                >
                    <Column selectionMode="multiple"></Column>
                    {nestedTableCols.map((anomalyCol, _i) =>
                        <Column
                            key={"index_" + _i}
                            field={anomalyCol.field}
                            header={anomalyCol.name}
                            body={(rowData) => getBodyTemplate(rowData, anomalyCol, assetData)}
                        />
                    )}
                </DataTable>
            </div>
        );
    }

    const handleSelectionChange = (e) => {
        setState({ ...state, selectedFields: e.value })
    }

    const getFilterButtonText = (btn) => {
        if (btn.key === 'connection')
            return connectionState.selectedConnectionObj?.connectionName ?? btn.label;
        let selectedFilters = [...state[`${btn.key}Selected`]];
        if (selectedFilters.length) {
            if (selectedFilters.includes('all'))
                selectedFilters.splice(selectedFilters.indexOf('all'), 1);
            return `${btn.label} (${selectedFilters.length})`
        }
        return btn.label;
    }

    const handleDrawer = (val) => {
        sessionStorage.removeItem('dqMonitorDetails');
        setDrawerOpen(val)
    }
    const closeServiceDrawer = () => {
        setState({ ...state, configureData: {} })
        handleDrawer(false)
    }

    const drawerMenu = () => {
        return (
            <Drawer isOpen={drawerOpen}
                closeServiceDrawer={closeServiceDrawer}
            >
                <ConfigurationBase connId={connectionState.selectedConnection} getAssetListForMonitor={getAssetListForMonitor} configureData={state.configureData} setIsOpen={handleDrawer} />
            </Drawer>
        );
    }

    const handleAssetCheckboxChange = (e) => {
        let setObj = { ...state };
        if (monitorType !== 'field') {
            setObj['selectedAssets'] = e.value;
        } else {
            setObj['selectedAssets'] = e.value;
            setObj['selectedFields'] = [];
            e.value?.forEach(element => {
                setObj['selectedFields'] = [...setObj['selectedFields'], ...element?.asset_fields ?? []]
            })
        }
        setState(setObj);
    }

    const handleAddMonitorsbtn = (field = '') => {
        if (monitorType !== 'field' && field) {
            window.open('?type=field', '_self');
            return;
        }
        let setObj = { ...state };
        let configureData = {};
        if (monitorType === 'field') {
            configureData.selectedFields = setObj.selectedFields;
        }
        else {
            configureData.selectedFields = setObj.selectedAssets;
        }
        configureData.selectedEventType = field ? DQ_RULES : EMPTY_KEY;
        configureData.monitorType = field;
        setObj['configureData'] = configureData;
        setState(setObj);
        setStaticLoading(true);
        setTimeout(() => {
            setStaticLoading(false)
            handleDrawer(true)
        }, 2000)
    }

    const handleConnectionChange = ({ option }) => {
        if (option.key !== connectionState.selectedConnection) {
            setConnectionState({
                ...connectionState,
                selectedConnectionObj: option,
                selectedConnection: option.connId
            })
            getAssetListForMonitor(true, option.connId)
        }
    }

    const getIconByType = (severity) => {
        if (severity === CRITICAL)
            return criticalIcon;
        if (severity === MAJOR)
            return majorIcon;
        if (severity === MINOR)
            return minorIcon;
    }

    const viewMonitorDetails = () => {
        if (viewModal !== true)
            return;
        const { selectedEllipseMonitorData, selectedEllipseRowData, selectedEllipseRules } = state;
        const { entity_level_3, field_name } = selectedEllipseRowData;
        const { monitorName, description, pillar, config } = selectedEllipseMonitorData;
        const { type, value } = parseFrequency(selectedEllipseMonitorData?.frequency) || {};
        const configValues = typeof config !== 'string' ? config : JSON.parse(config);
        return (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">
                <div className="text-tertiaryTextColor w-auto h-auto bg-[#1C1917] pt-4  rounded-xl flex flex-col" ref={viewRef} >
                    <div className="flex flex-row justify-between px-8 ">
                        <p className=" text-xl  font-RakutenSemibold text-primaryTextColor"> Monitor Details </p>
                        <img src={closeIcon} alt="" className="cursor-pointer" onClick={() => setViewModal(false)} />
                    </div>
                    <Divider className="my-3 mb-6" />
                    <div className="flex gap-3 flex-col px-8 pb-8">
                        <div className="flex gap-2">
                            <label className="font-RakutenRegular text-[#A9A29D] text-base w-28"> Monitor Name: </label>
                            <label className="font-RakutenRegular text-[#E7E5E4] text-base "> {monitorName} </label>
                        </div>
                        <div className="flex gap-2">
                            <label className="font-RakutenRegular text-[#A9A29D] text-base w-28"> Description: </label>
                            <label className="font-RakutenRegular text-[#E7E5E4] text-base "> {description} </label>
                        </div>
                        <div className="flex gap-2">
                            <label className="font-RakutenRegular text-[#A9A29D] text-base w-28"> Execution: </label>
                            <label className="font-RakutenRegular text-[#E7E5E4] text-base ">
                                This Monitor will execute at every {value} {`${capitalize(type)}${value > 1 ? 's' : ''}`}
                            </label>
                        </div>
                        <div className="flex flex-col  gap-2">
                            <div className="flex">
                                <p className=" font-RakutenRegular text-[#A9A29D] text-base w-28 "> {pillar === DQ_RULES ? 'Field' : 'Asset'}: </p>
                                <label className="font-RakutenRegular text-[#E7E5E4] text-base pl-2"> {entity_level_3 || field_name} </label>
                            </div>
                            {pillar !== SCHEMA_CHANGE &&
                                <div className="flex mt-3">
                                    <p className="font-RakutenRegular text-[#A9A29D] text-base w-28"> {selectedEllipseRules.length > 1 ? 'Rules Added' : 'Rule Added'}:</p>
                                    <div className="flex flex-col gap-2">
                                        {selectedEllipseRules?.map((item, _index) =>
                                            <div className="flex flex-col gap-2">
                                                <label className="font-RakutenRegular text-[#E7E5E4] text-base pl-2 flex flex-row gap-1">
                                                    {pillar === DQ_RULES && <div>{_index + 1}. </div>}
                                                    {readableGreateExpRules[item.ruleSubType] || item.ruleSubType}
                                                </label>
                                                {configValues && <div className="flex gap-2 pl-2">
                                                    {getConfigValuesTag(configValues, pillar)}
                                                </div>}
                                                <div className="flex gap-2 pl-2">
                                                    Severity: <div className="flex items-center gap-1 ml-1">
                                                        <img src={getIconByType(item.severity)} alt="" />
                                                        <p> {READABLE_SEVERITY[item.severity] || ''} </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>}
                            {pillar === SCHEMA_CHANGE &&
                                <div>
                                    <div className="flex gap-2">
                                        <label className="font-RakutenRegular text-[#A9A29D] text-base w-28">Rule Added:</label>
                                        <label className="font-RakutenRegular text-[#E7E5E4] text-base ">
                                            Detect all table level schema change
                                        </label>
                                    </div>
                                    {selectedEllipseRules?.map((item) =>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-2 mt-2">
                                                <label className="font-RakutenRegular text-[#A9A29D] text-base w-28">Severity: </label>
                                                <div className="flex items-center gap-1 ml-1">
                                                    <img src={getIconByType(item.severity)} alt="" />
                                                    <p> {READABLE_SEVERITY[item.severity] || ''} </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const getConfigValuesTag = (configValues, pillar = '') => {
        let keys = Object.keys(configValues);
        if (keys.length === 0) return '';
        return (
            <div className="flex gap-3 font-RakutenRegular text-[#E7E5E4]">
                {keys?.length > 1 ?
                    <>
                        <label> Min Value: {configValues[keys[0]]} </label>
                        <label> Max Value: {configValues[keys[1]]} </label>
                    </> :
                    <label>Value: {configValues[keys[0]]} {pillar === FRESHNESS ? 'Hour' : ''}</label>
                }
            </div>
        );
    }

    return (
        <>
            {
                staticLoading ? <>
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">
                        <Loading />
                    </div>
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">

                        <p className="text-secondaryTextColor">Generating Monitor Rules. Please wait.....</p>
                    </div>
                </> :
                    <>
                        <div className="mx-5">
                            <div className="flex justify-between font-white items-center">
                                <div className="flex flex-col gap-1">
                                    <p className="font-RakutenSemibold text-3xl text-primaryTextColor"> {`Configure ${monitorType !== 'field' ? 'Table' : 'Field'} Monitors`} </p>
                                    <p className="font-RakutenLight text-secondaryTextColor">
                                        Setting up Monitor
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    {(monitorType !== 'field' && state.selectedAssets.length > 0) &&
                                        <Button onClick={() => handleAddMonitorsbtn()} className="text-primaryBtnText" label="Table Monitors" severity="warning" />}
                                    {(monitorType !== 'field' || (monitorType === 'field' && state.selectedFields.length > 0)) &&
                                        <Button onClick={() => handleAddMonitorsbtn('field')} label="Configure Field Monitors" className="text-primaryBtnText" severity="warning" />}
                                    <Button onClick={() => handleAddMonitorsbtn('automatic')} label="Autogenerate Monitors" className="text-primaryBtnText" severity="warning" />
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div className="m-8">
                            <div className="flex justify-between gap-2 mb-4">
                                <div className="flex gap-3">
                                    {assetListFilterButtons.map((btn, _index) =>
                                        <Button outlined className='border-secondaryBorderColor rounded-md' key={_index}
                                            onClick={e => handleFilterBtnClick(e, btn)}>
                                            <div className={`flex gap-3 justify-between ${btn.key === 'connection' ? 'w-auto' : btn.key === 'schema' ? 'w-[6.8rem]' : btn.key === 'database' ? 'w-[7.5rem]' : 'w-[6rem]'}`}>
                                                <p className='font-RakutenSemibold text-secondaryBtnText rounded-md'>
                                                    {getFilterButtonText(btn)}
                                                </p>
                                                <img src={downIcon} alt='down' />
                                                <Menu
                                                    model={customMenuTemplate({
                                                        optionTemplate: btn.key !== 'connection' ? optionsTemplate[btn.key] : null,
                                                        options: btn.key === 'connection' ? connectionState.options : [],
                                                        selectedOption: connectionState.selectedConnection,
                                                        key: 'connId',
                                                        label: 'connectionName',
                                                        onClick: handleConnectionChange
                                                    })}
                                                    popup
                                                    ref={btn.key === 'database' ? databaseRef : btn.key === 'schema' ? schemaRef : btn.key === 'connection' ? connectionRef : assetsRef}
                                                    id={btn.key}
                                                />
                                            </div>
                                        </Button>
                                    )}
                                </div>
                                <div className="p-input-icon-left w-[20rem]">
                                    <i className="pi pi-search" />
                                    <InputText placeholder="Search" className="w-full h-12 rounded-lg"
                                        onChange={handleSearch}
                                        value={state.searchTerm}
                                    />
                                </div>
                            </div>
                            <DataTable
                                value={loaded ? state.filteredAssetList : []}
                                selectionMode={'checkbox'}
                                selection={state.selectedAssets}
                                onSelectionChange={(e) => handleAssetCheckboxChange(e)}
                                dataKey="asset_id"
                                expandedRows={state.expandedRows}
                                onRowToggle={(e) => setState({ ...state, expandedRows: e.data })}
                                expandedRowIcon={() => getSvgIcons('expandToggle', 1)}
                                collapsedRowIcon={() => getSvgIcons('expandToggle', 0)}
                                tableStyle={{ minWidth: '50rem' }}
                                selectionAutoFocus={false}
                                rowExpansionTemplate={(rowData) => handleNestedTable(rowData)}
                                paginator
                                paginatorTemplate={customPaginatorTemplate}
                                rows={10}
                                className="anomalies-table overflow-auto"
                                rowClassName="parent-table-row"
                                emptyMessage={loaded ? <p className="flex justify-center"> {`${connectionState.selectedConnection ? `No ${monitorType === 'field' ? 'fields' : 'assets'} founds for selected connection` : 'No connection has been selected'}`} </p> : <Loading />}
                            >
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                                {state.monitorColums.map((anomalyCol, _i) =>
                                    <Column
                                        key={"index_" + _i}
                                        field={anomalyCol.field}
                                        header={anomalyCol.name}
                                        headerStyle={{ width: anomalyCol.width }}
                                        body={(rowData) => getBodyTemplate(rowData, anomalyCol)}
                                    />
                                )}
                                {monitorType === 'field' && <Column expander={true} style={{ width: '3rem' }} />}
                            </DataTable>
                        </div>
                        {ellipsis && <div ref={ellipsisRef} style={{ top: state.ellipsisTop, left: state.ellipsisLeft }} className="ellipsis-menu absolute text-xs flex flex-col items-start gap-2 w-20 border border-[#808080] rounded-md gap-2 p-3 bg-primaryBgColor">
                            <p className="hover:text-primaryTheme hover:border-b hover:border-primaryTheme cursor-pointer border-b border-transparent" onClick={() => {
                                setEllipsis(false);
                                setViewModal(true)
                            }}> View </p>
                            <p className="hover:text-primaryTheme hover:border-b hover:border-primaryTheme cursor-pointer border-b border-transparent" onClick={() => handleDeleteClick()} > Delete </p>
                        </div>}
                        {viewMonitorDetails()}
                        {drawerMenu()}

                        {state.showDeleteModal && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-50">
                                <div className="w-[30rem] h-[10rem]  bg-[#1b1917] p-4 rounded-xl flex flex-col  gap-2">
                                    <p className="font-RakutenRegular text-xl">Delete Monitor</p>
                                    <p className="text-[#A9A29D]">Are you sure you want to delete this monitor?</p>
                                    <div className="flex justify-end mt-4 gap-3">
                                        <button
                                            className="px-4 py-2 text-base border border-[#f59404] text-[#f59404] hover:border-[#f59404] rounded-md"
                                            onClick={() => setState({ ...state, showDeleteModal: false })}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="px-4 py-2 text-base border border-[#f59404] bg-[#efb053] text-black hover:bg-[#f59404] rounded-md"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>

            }
        </>
    );
}

export const getEllipsisKey = (rowData, eventType, fieldLevel) => {
    const { entity_level_1, entity_level_2, entity_level_3, entity_level4, parent_id, field_id, field_name } = rowData;
    return parent_id ? `${eventType}_${parent_id}_${field_id}_${field_name}`
        : `${eventType}_${entity_level_1}_${entity_level_2}_${entity_level_3}${fieldLevel ? `_${entity_level4}` : ''}`
}

export function parseFrequency(frequency) {
    const components = frequency.split(' ');

    const componentTypeMap = [
        { component: components[1], type: 'minute' },
        { component: components[2], type: 'hour' },
        { component: components[3], type: 'day' },
        { component: components[4], type: 'month' },
        { component: components[5], type: 'day of week' }
    ];
    for (const entry of componentTypeMap) {
        if (entry.component.startsWith('*/')) {
            return {
                value: parseInt(entry.component.substring(2)),
                type: entry.type
            };
        } else if (entry.component.startsWith('*')) {
            return {
                value: 1,
                type: entry.type
            }
        }
    }
    return null;
}

export default React.memo(AssetListOverview);