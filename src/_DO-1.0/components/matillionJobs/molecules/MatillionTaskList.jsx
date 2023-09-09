/* eslint-disable no-duplicate-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { fetchMatillionJobsTasks } from "store";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { customPaginatorTemplate } from "_DO-1.0/sharedComponents/customPaginatorTemplate";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Loading } from "core-modules/Loader";
import { InputText } from "primereact/inputtext";
import { matillianExecutions, taskListColumns } from "../reducers";
import { getAirFlowTimeFormat } from "_DO-1.0/components/airflowPipelines";
import { getSvgIcons } from "_DO-1.0/components/anomaliesList/reducers";

const MatillionTaskList = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [loaded, setLoaded] = useState(false);
    const [state, setState] = useState({
        searchTerm: '',
        groupId: queryParams.get('groupId'),
        jobName: queryParams.get('jobName'),
        projectId: queryParams.get('projectId'),
        //----
        data: [],
        filteredRows: [],
    })

    useEffect(() => {
        getJobExecutionsList();
    }, [])

    const getJobExecutionsList = async () => {
        setLoaded(false)
        let setObj = { ...state };
        let response = await dispatch(fetchMatillionJobsTasks({ groupId: state.groupId, projectId: state.projectId, jobName: state.jobName })).unwrap();
        if (response.status === 200)
            setObj['data'] = setObj['filteredRows'] = response?.data ?? [];
        else
            setObj['data'] = setObj['filteredRows'] = [];
        setState(setObj);
        setLoaded(true);
    }

    const handleSearch = ({ target: { value = '' } }) => {
        let filteredRows = [];
        if (value)
            filteredRows = state.data?.filter(item => `${item.environmentName}`.concat(`${item.type}`, `${item.state}`).toLowerCase().toString().indexOf(value.toLowerCase().toString()) !== -1)
        else
            filteredRows = state.data;
        setState({ ...state, filteredRows, searchTerm: value })
    }

    const getBodyTemplate = (rowData, { key }, subTable = 0) => {
        let template = null;
        switch (key) {
            case 'environmentName':
            case 'type':
            case 'taskBatchID':
            case 'componentName':
            case 'jobRevision':
                template = rowData[key];
                break;
            case 'state':
                template = <div className="font-RakutenLight flex items-center gap-3">
                    <span className={`flex w-2 h-2 ${rowData[key] !== 'SUCCESS' ? 'bg-red-600' : 'bg-lime-600'} rounded-full border-quaternaryTextColor`} />
                    {rowData[key] === 'SUCCESS' ? 'Success' : 'Failed'}
                </div>
                break;
            case 'startTime':
            case 'endTime':
                template = <span className="font-RakutenLight">{getAirFlowTimeFormat(rowData[key])}</span>
                break;
            default:
                break;
        }
        return template;
    }

    const getExpandTable = (rowData) => {
        return (
            <DataTable
                value={rowData?.tasks ?? []}
                dataKey="taskBatchID"
                tableStyle={{ minWidth: '50rem' }}
                className="anomalies-table"
                emptyMessage={<p className="flex justify-center"> No Tasks found </p>}
            >
                {taskListColumns.map((taskList, _i) =>
                    <Column
                        key={"index_" + _i}
                        field={taskList.field}
                        header={taskList.name}
                        body={(rowData) => getBodyTemplate(rowData, taskList, 1)}
                    />
                )}
            </DataTable>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between items-center">
                <div className="flex gap-4 font-RakutenLight text-lg">
                    <p> <span className="">Group:</span>  {state.groupId} </p>
                    <p> <span className="">Project:</span>  {state.projectId} </p>
                    <p> <span className="">Job:</span>  {state.jobName} </p>
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
                value={loaded ? state.filteredRows : []}
                dataKey="id"
                tableStyle={{ minWidth: '50rem' }}
                selectionAutoFocus={false}
                paginator
                paginatorTemplate={customPaginatorTemplate}
                rows={10}
                expandedRows={state.expandedRows}
                onRowToggle={(e) => setState({ ...state, expandedRows: e.data })}
                expandedRowIcon={() => getSvgIcons('expandToggle', 1)}
                collapsedRowIcon={() => getSvgIcons('expandToggle', 0)}
                rowExpansionTemplate={(rowData) => getExpandTable(rowData)}
                className="anomalies-table"
                emptyMessage={loaded ? <p className="flex justify-center"> No Executions found </p> : <Loading />}
            >
                {matillianExecutions.map((executionList, _i) =>
                    <Column
                        key={"index_" + _i}
                        field={executionList.field}
                        header={executionList.name}
                        body={(rowData) => getBodyTemplate(rowData, executionList)}
                    />
                )}
                <Column expander={true} style={{ width: '3rem' }} />
            </DataTable>
        </div>
    )
}

export default MatillionTaskList;