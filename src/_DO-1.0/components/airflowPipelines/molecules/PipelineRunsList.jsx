/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import downIcon from '../../../assets/downArrow.svg';
import { customMenuTemplate } from '_DO-1.0/sharedComponents/customMenuTemplate';
import { Menu } from 'primereact/menu';
import { Loading } from "core-modules/Loader";
import { DataTable } from 'primereact/datatable';
import { customPaginatorTemplate } from "_DO-1.0/sharedComponents/customPaginatorTemplate";
import { runListTableColumns } from '../reducers'
import { Column } from 'primereact/column';
import { Checkbox } from "primereact/checkbox";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { fetchDagsRunsList, fetchDagsList } from "store";
import { useLocation } from "react-router-dom";
import { dagPipelines, dagPipelinesRuns } from "_DO-1.0/components/anomaliesList/molecules/Service";
import { getAirFlowTimeFormat } from "..";

const filterButtons = [
    { key: 'status', label: 'Status' },
    { key: 'pipeline', label: 'Pipelines' },
];

const PipelineRunsList = ({ dateSelected }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const pipelineRef = useRef(null);
    const statusRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [state, setState] = useState({
        runlist: [],
        searchTerm: '',
        statusSelected: [],
        pipelineSelected: [],
        //----
        data: [],
        filteredRows: [],
    });

    const [pipelineState, setPipelineState] = useState({
        selectedDagId: queryParams.get('pipeline'),
        options: [],
    })

    useEffect(() => {
        setLoaded(false)
        getAirflowDagList();
    }, []); //selectedDate

    const getAirflowDagList = async () => {
        getDagPipelineList();
        getDagRunsList(pipelineState.selectedDagId);
        setLoaded(true);
    }


    const getDagPipelineList = async () => {
        let daglist = [];
        const response = await dispatch(fetchDagsList()).unwrap();
        if (response.status === 200)
            daglist = response?.data?.dags ?? [];
        else
            daglist = dagPipelines?.dags ?? [];
        let dagOptions = daglist.map(item => { return { key: item.dag_id, label: item.dag_id } });
        setPipelineState({ ...pipelineState, options: dagOptions });
    }

    const getDagRunsList = async (selectedDagId = '') => {
        setLoaded(false);
        let setObj = { ...state };
        const response = await dispatch(fetchDagsRunsList(selectedDagId)).unwrap();
        if (response.status === 200)
            setObj['data'] = setObj['filteredRows'] = response?.data?.dag_runs ?? [];
        else
            setObj['data'] = setObj['filteredRows'] = dagPipelinesRuns?.dag_runs ?? [];
        setObj['filteredRows'] = filterOutDagRuns(setObj['searchTerm'], setObj['statusSelected'], setObj['data']);
        setState(setObj);
        setLoaded(true);
    }

    const filterOutDagRuns = (searchTerm, selectedStatus, data) => {
        data = data ? data : state.data;
        let filteredRows = [];
        if (searchTerm || selectedStatus.length) {
            let status = true;
            filteredRows = data.filter((item) => validateFilters(item, selectedStatus, searchTerm, status))
        } else filteredRows = data;
        return filteredRows;
    }

    const validateFilters = (item, selectedStatus, searchTerm, status) => {
        if (status && selectedStatus.length)
            status = selectedStatus.includes(item.state)
        if (status && selectedStatus && searchTerm)
            status = `${item.dag_id}`.concat(`${item.dag_run_id}`).toLowerCase().toString().indexOf(searchTerm.toLowerCase().toString()) !== -1;
        return status;
    }

    const handleSearch = ({ target: { value = '' } }) => {
        let filteredRows = filterOutDagRuns(value, state.statusSelected);
        setState({ ...state, filteredRows, searchTerm: value })
    }

    const getOptionTemplate = (options, stateKey) => {
        return <ul className={classNames('max-h-80 overflow-auto bg-primaryBgColor', 'flex flex-col', 'gap-1 py-3 px-2', 'font-PrimaryFont text-primaryTextColor')}>
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
            setObj['filteredRows'] = filterOutDagRuns(setObj['searchTerm'], setObj['statusSelected'])
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
        setObj['filteredRows'] = filterOutDagRuns(setObj['searchTerm'], setObj['statusSelected'])
        setState(setObj);
    }
    const optionsTemplate = {
        status: getOptionTemplate([
            { key: 'all', label: 'All' },
            { key: 'failed', label: 'Failed' },
            { key: 'queued', label: 'Queued' },
            { key: 'success', label: 'Passed' }
        ], 'statusSelected'),
    }

    const handleFilterBtnClick = (e, btn) => {
        let setObj = { ...state };
        setState(setObj);
        if (btn.key === 'pipeline')
            pipelineRef.current.toggle(e)
        if (btn.key === 'status')
            statusRef.current.toggle(e)
    }

    const getBodyTemplate = (rowData, pipelineData) => {
        const { key } = pipelineData;
        const { state } = rowData;
        let returnData = '';
        if (key === 'state') {
            returnData =
                <div className="font-RakutenLight flex items-center gap-3">
                    <span className={`flex w-2 h-2 ${state === 'failed' ? 'bg-red-600' : state === 'queued' ? 'bg-yellow-600': 'bg-lime-600'} rounded-full border-quaternaryTextColor`} />
                    {state === 'failed' ? 'Fail' : state === 'queued' ? 'Queue' : 'Pass'}
                </div>
        } else if (key === 'start_date' || key === 'end_date') {
            returnData = <span className="font-RakutenLight">{getAirFlowTimeFormat(rowData[pipelineData.field])}</span>
        } else {
            returnData = <p className="font-RakutenLight"> {rowData[pipelineData.field]} </p>
        }
        return returnData;
    }

    const handleDagChange = ({ option }) => {
        if (option.key !== pipelineState.selectedDagId) {
            getDagRunsList(option.key);
            setPipelineState({ ...pipelineState, selectedDagId: option.key });
        }
    }

    const getButtonText = (btn) => {
        if (btn.key === 'pipeline')
            return pipelineState.selectedDagId;

        let selectedFilters = [...state[`${btn.key}Selected`]];
        if (selectedFilters.length) {
            if (selectedFilters.includes('all'))
                selectedFilters.splice(selectedFilters.indexOf('all'), 1);
            return `${btn.label} (${selectedFilters.length})`
        }
        return btn.label
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between">
                <div className=" flex gap-4">
                    {filterButtons.map((btn, _index) =>
                        <Button outlined className='border-secondaryBorderColor rounded-md' key={_index}
                            onClick={e => handleFilterBtnClick(e, btn)}>
                            <div className={`flex gap-3 justify-between ${btn.key === 'status' ? 'w-[6rem]' : 'w-auto'}`}>
                                <p className='font-RakutenSemibold text-secondaryBtnText rounded-md'>
                                    {getButtonText(btn)}
                                </p>
                                <img src={downIcon} alt='down' />
                                <Menu
                                    model={customMenuTemplate({
                                        optionTemplate: btn.key === 'status' ? optionsTemplate[btn.key] : null,
                                        options: btn.key !== 'status' ? pipelineState.options : [],
                                        selectedOption: pipelineState.selectedDagId,
                                        onClick: handleDagChange
                                    })}
                                    popup
                                    ref={btn.key === 'status' ? statusRef : pipelineRef}
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
            <p className="font-PrimaryFont text-secondaryTextColor">
                Manage your pipelines across all data sources
            </p>
            <DataTable
                value={loaded ? state.filteredRows : []}
                selectionMode={'checkbox'}
                selection={state.runlist}
                onSelectionChange={(e) => setState({ ...state, runslist: e.value })}
                dataKey="dag_run_id"
                tableStyle={{ minWidth: '50rem' }}
                selectionAutoFocus={false}
                paginator
                paginatorTemplate={customPaginatorTemplate}
                rows={10}
                removableSort
                className="anomalies-table"
                emptyMessage={loaded ? <p className="flex justify-center"> No Runs found </p> : <Loading />}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                {runListTableColumns.map((runlistData, _i) =>
                    <Column
                        key={"index_" + _i}
                        field={runlistData.field}
                        header={runlistData.name}
                        body={(rowData) => getBodyTemplate(rowData, runlistData)}
                    />
                )}
            </DataTable>
        </div>
    )
}

export default React.memo(PipelineRunsList);

