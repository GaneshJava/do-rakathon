/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { Button } from 'primereact/button';
import downIcon from '../../assets/downArrow.svg';
import { customMenuTemplate } from '_DO-1.0/sharedComponents/customMenuTemplate';
import { Menu } from 'primereact/menu';
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    fetchMatillionGroups,
    fetchMatillionProjects,
    fetchMatillionVersion,
    fetchMatillionJobs
} from "store";
import { matillionFilters } from "./reducers";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { customPaginatorTemplate } from "_DO-1.0/sharedComponents/customPaginatorTemplate";
import { Column } from "primereact/column";
import { Loading } from "core-modules/Loader";
import { matillianColumns } from "./reducers";
import nextIcon from '../../assets/next.svg';
import { getAirFlowTimeFormat } from "../airflowPipelines";
import MatillionTaskList from "./molecules/MatillionTaskList";
import previousIcon from '../../assets/previous.svg';

const EXECUTIONS = '/pipeline/execution';
const MatillionMain = () => {
    const dispatch = useDispatch();
    const pathname = useLocation()?.pathname;
    const filterRef = useRef({});
    const [loaded, setLoaded] = useState(false);
    const [filtersState, setFiltersState] = useState({
        groupSelected: '',
        projectSelected: '',
        versionSelected: '',
    })
    const [state, setState] = useState({
        searchTerm: '',
        pipelines: [],
        groupList: [],
        projectList: [],
        versionList: [],
        //----
        data: [],
        filteredRows: [],
    })

    useEffect(() => {
        if (pathname !== EXECUTIONS)
            getMatillionGroupsList();
    }, []);

    const apiCall = async (method, params, responseKey = 'data') => {
        const response = await dispatch(method(params)).unwrap();
        console.log(response);
        if (response.status === 200)
            return response?.data?.[responseKey] ?? [];
        else
            return [];
    }

    const getMatillionGroupsList = async () => {
        let setObj = { ...state };
        setObj['groupList'] = await apiCall(fetchMatillionGroups, {});
        setState(setObj);
    }

    const getMatillionProjectsList = async (groupId) => {
        let setObj = { ...state };
        setFiltersState({ ...filtersState, groupSelected: groupId })
        setObj['projectList'] = await apiCall(fetchMatillionProjects, { groupId });
        setState(setObj);
    }

    const getMatillionVersionList = async (projectId) => {
        let setObj = { ...state };
        setFiltersState({ ...filtersState, projectSelected: projectId })
        setObj['versionList'] = await apiCall(fetchMatillionVersion, { projectId, groupId: filtersState.groupSelected });
        setState(setObj);
    }

    const getMatillionJobsList = async (versionId) => {
        setFiltersState({ ...filtersState, versionSelected: versionId })
        setLoaded(false)
        let setObj = { ...state };
        setObj['data'] = setObj['filteredRows'] = await apiCall(fetchMatillionJobs, { versionId, projectId: filtersState.projectSelected, groupId: filtersState.groupSelected }, 'jobs');
        setState(setObj);
        setLoaded(true);
    }

    const handleSearch = ({ target: { value = '' } }) => {
        let filteredRows = [];
        if (value)
            filteredRows = state.data?.filter(item => `${item.id}`.concat(`${item.name}`, `${item.type}`, `${item.description}`).toLowerCase().toString().indexOf(value.toLowerCase().toString()) !== -1)
        else
            filteredRows = state.data;
        setState({ ...state, filteredRows, searchTerm: value })
    }

    const getBodyTemplate = (rowData, pipelineData) => {
        const { key } = pipelineData;
        const { id, name, created } = rowData;
        let returnData = '';
        if (key === 'created') {
            returnData =
                <div className="flex gap-3 items-center justify-between w-[90%]">
                    <div className="flex items-center gap-3">
                        <span className="font-RakutenLight">{getAirFlowTimeFormat(created)}</span>
                    </div>
                    <Link to={`execution?_key=matillion&jobId=${id}&jobName=${name}&groupId=${filtersState.groupSelected}&projectId=${filtersState.projectSelected}`}>
                        <img src={nextIcon} alt="" className="hover:opacity-70" />
                    </Link>
                </div>
        } else {
            returnData = <p className="font-RakutenLight"> {rowData[pipelineData.field]} </p>
        }
        return returnData;
    }

    const handleOptionSelect = ({ option, props }) => {
        const key = option.key;
        if (props === 'group')
            getMatillionProjectsList(key)
        if (props === 'project')
            getMatillionVersionList(key)
        if (props === 'version')
            getMatillionJobsList(key)
    }

    const getEmptyMessage = () => {
        const { groupSelected, projectSelected, versionSelected } = filtersState;
        let returnEmptyMessage = '';
        if (!groupSelected || !projectSelected || !versionSelected) {
            if (!groupSelected)
                returnEmptyMessage = 'Select Group, Project and Version to see Job list';
            else if (!projectSelected)
                returnEmptyMessage = 'Select Project and Version to see Job list';
            else if (!versionSelected)
                returnEmptyMessage = 'Select Version to see Job list';
            return <p className="flex justify-center"> {returnEmptyMessage} </p>
        } else
            return loaded ? <p className="flex justify-center"> No Jobs found </p> : <Loading />
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                {pathname === EXECUTIONS ?
                    <p className="font-RakutenSemibold text-3xl text-primaryTextColor">Jobs Executions</p> :
                    <p className="font-RakutenSemibold text-3xl text-primaryTextColor">Jobs</p>
                }
                {pathname === EXECUTIONS && <div className="flex px-1 pb-2 items-center">
                    <div onClick={() => window.history.back()} className="flex gap-2 cursor-pointer">
                        <img src={previousIcon} alt='previous' />
                        <span className="text-secondaryBorderColor font-RakutenSemibold"> Back </span>
                    </div>
                </div>}
            </div>
            <Divider />
            {pathname !== EXECUTIONS ?
                <>
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            {matillionFilters.map((btn, _index) =>
                                <div className="flex flex-col gap-1">
                                    <Button outlined className='border-secondaryBorderColor rounded-md w-28' key={_index}
                                        onClick={e => filterRef.current[btn.key].toggle(e)}>
                                        <div className={`flex w-full gap-3 justify-around`}>
                                            <p className='truncate font-RakutenSemibold text-secondaryBtnText rounded-md'>
                                                {
                                                    filtersState[`${btn.key}Selected`] ? filtersState[`${btn.key}Selected`] : `${btn.label}`
                                                }
                                            </p>
                                            <img src={downIcon} alt='down' />
                                            <Menu
                                                model={customMenuTemplate({
                                                    options: state[`${btn.key}List`],
                                                    onClick: handleOptionSelect,
                                                    closeMenuAfterSelect: state.closeMenuAfterSelect,
                                                    selectedOption: `${filtersState[`${btn.key}Selected`]}`,
                                                    props: btn.key
                                                })}
                                                popup
                                                ref={ref => filterRef.current[btn.key] = ref}
                                                id={btn.key}
                                            />
                                        </div>
                                    </Button>
                                    <p className="ml-2 text-sm text-quaternaryTextColor font-RakutenSemibold"> {btn.label} </p>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-4">
                            {pathname !== 'PIPELINE_RUNLIST' && <div className="p-input-icon-left w-[20rem]">
                                <i className="pi pi-search" />
                                <InputText placeholder="Search" className="w-full h-12 rounded-lg"
                                    onChange={handleSearch}
                                    value={state.searchTerm}
                                />
                            </div>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                        <p className="font-PrimaryFont text-secondaryTextColor">
                            Manage your Jobs
                        </p>
                        <DataTable
                            value={loaded ? state.filteredRows : []}
                            tableStyle={{ minWidth: '50rem' }}
                            selectionAutoFocus={false}
                            paginator
                            paginatorTemplate={customPaginatorTemplate}
                            rows={10}
                            removableSort
                            className="anomalies-table"
                            emptyMessage={getEmptyMessage()}
                        >
                            {matillianColumns.map((matillian, _i) =>
                                <Column
                                    key={"index_" + _i}
                                    field={matillian.field}
                                    header={matillian.name}
                                    headerStyle={{ width: matillian.width }}
                                    body={(rowData) => getBodyTemplate(rowData, matillian)}
                                />
                            )}
                        </DataTable>
                    </div>
                </> :
                <>
                    <MatillionTaskList />
                </>
            }
        </div>
    );
}
export default React.memo(MatillionMain);