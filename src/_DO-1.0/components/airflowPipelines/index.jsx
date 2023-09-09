/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { customMenuTemplate } from '_DO-1.0/sharedComponents/customMenuTemplate';
import { getDatesInUTC } from '_DO-1.0/reducers';
import { Menu } from 'primereact/menu';
import selectedRightIcon from '../../assets/selectedRight.svg';
import { Link, useLocation } from "react-router-dom";
import { Divider } from "primereact/divider";
import nextIcon from '../../assets/next.svg';
import PipelineRunsList from "./molecules/PipelineRunsList";
import { useDispatch } from "react-redux";
import { fetchDagsList } from "store";
import { dagPipelines } from "../anomaliesList/molecules/Service";
import { pipelineTableColumns } from "./reducers";
import { Column } from "primereact/column";
import { Loading } from "core-modules/Loader";
import { customPaginatorTemplate } from "_DO-1.0/sharedComponents/customPaginatorTemplate";
import { DataTable } from "primereact/datatable";
import previousIcon from '../../assets/previous.svg';

const PIPELINE_RUNLIST = '/pipeline/runslist';
const PipelineIndex = () => {
    const dispatch = useDispatch();
    const pathname = useLocation()?.pathname;
    const menuLeft = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [state, setState] = useState({
        searchTerm: '',
        pipelines: [],
        dateSelected: 'last15days',
        dateSelectedLabel: 'Last 15 days',
        menuOptions: [],
        dateRange: [getDatesInUTC('last15days')],
        //----
        data: [],
        filteredRows: [],
    })

    useEffect(() => {
        setLoaded(false)
        getAirflowDagList();
    }, []);

    const getAirflowDagList = async () => {
        let setObj = { ...state };
        const response = await dispatch(fetchDagsList()).unwrap();
        if (response.status === 200)
            setObj['data'] = setObj['filteredRows'] = response?.data?.dags ?? [];
        else
            setObj['data'] = setObj['filteredRows'] = dagPipelines?.dags ?? [];
        setState(setObj);
        setLoaded(true);
    }

    const handleSearch = ({ target: { value = '' } }) => {
        let filteredRows = [];
        if (value)
            filteredRows = state.data?.filter(item => `${item.dag_id}`.toLowerCase().toString().indexOf(value.toLowerCase().toString()) !== -1)
        else
            filteredRows = state.data;
        setState({ ...state, filteredRows, searchTerm: value })
    }

    const handleOptionSelect = ({ option }) => {
        let setObj = { ...state };
        if (state.triggerFrom === 'date' && option.key !== 'custom')
            setObj['dateRange'] = [getDatesInUTC(option.key)]
        setObj[`${state.triggerFrom}Selected`] = option.key;
        setObj[`${state.triggerFrom}SelectedLabel`] = option.label;
        setState(setObj);
    }

    const getBodyTemplate = (rowData, pipelineData) => {
        const { key } = pipelineData;
        const { dag_id, last_parsed_time } = rowData;
        let returnData = '';
        if (key === 'last_parsed_time') {
            returnData =
                <div className="flex gap-3 items-center justify-between w-[90%]">
                    <div className="flex items-center gap-3">
                        <span className="font-RakutenLight">{getAirFlowTimeFormat(last_parsed_time)}</span>
                    </div>
                    <Link to={`runslist?pipeline=${dag_id}`}>
                        <img src={nextIcon} alt="" className="hover:opacity-70" />
                    </Link>
                </div>
        } else {
            returnData = <p className="font-RakutenLight"> {rowData[pipelineData.field]} </p>
        }
        return returnData;
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                {pathname === PIPELINE_RUNLIST ?
                    <p className="font-RakutenSemibold text-3xl text-primaryTextColor">Runs</p> :
                    <p className="font-RakutenSemibold text-3xl text-primaryTextColor">Pipelines</p>
                }
                {pathname === PIPELINE_RUNLIST && <div className="flex px-1 pb-2 items-center">
                    <div onClick={() => window.history.back()} className="flex gap-2 cursor-pointer">
                        <img src={previousIcon} alt='previous' />
                        <span className="text-secondaryBorderColor font-RakutenSemibold"> Back </span>
                    </div>
                </div>}
                <Menu
                    model={customMenuTemplate({
                        options: state.menuOptions,
                        onClick: handleOptionSelect,
                        closeMenuAfterSelect: state.closeMenuAfterSelect,
                        selectedOptionIcon: <img src={selectedRightIcon} alt="" />,
                        selectedOption: state[`${state.triggerFrom}Selected`]
                    })}
                    popup
                    ref={menuLeft}
                    id={'popup_menu_left'}
                />
            </div>
            <Divider />
            <div className="flex gap-4 justify-between">
                <div></div>
                {pathname !== PIPELINE_RUNLIST && <div className="p-input-icon-left w-[20rem]">
                    <i className="pi pi-search" />
                    <InputText placeholder="Search" className="w-full h-12 rounded-lg"
                        onChange={handleSearch}
                        value={state.searchTerm}
                    />
                </div>}
                {/* <Button
                        outlined
                        className="border-secondaryBorderColor rounded-md"
                        onClick={(e) => handleClick(e, 'date')}>
                        <div className="flex gap-3">
                            <img src={dateIcon} alt="date-icon" />
                            <p
                                id="dateSelected"
                                className="font-RakutenSemibold text-tertiaryBtnText rounded-md">
                                {state[`${state.triggerFrom}SelectedLabel`]}
                            </p>
                            <img src={downIcon} alt="down" />
                        </div>
                    </Button> */}
                {/* <div className="relative">
                        {state.triggerFrom === 'date' && state.dateSelected === 'custom' && open === true && (
                            <div ref={refOne} className="absolute right-0 top-[3rem] z-10">
                                <CalendarComponent
                                    dateRange={state.dateRange}
                                    updateCustomDate={updateCustomDate}
                                    toggleCustomDate={toggleCustomDate}
                                />
                            </div>
                        )}
                    </div> */}
            </div>
            <div className="flex flex-col gap-3 mt-1">
                {pathname !== PIPELINE_RUNLIST ? <div className="flex flex-col gap-6">
                    <p className="font-PrimaryFont text-secondaryTextColor">
                        Manage your pipelines across all data sources
                    </p>
                    <DataTable
                        value={loaded ? state.filteredRows : []}
                        dataKey="dag_id"
                        onRowToggle={(e) => setState({ ...state, expandedRows: e.data })}
                        tableStyle={{ minWidth: '50rem' }}
                        selectionAutoFocus={false}
                        paginator
                        paginatorTemplate={customPaginatorTemplate}
                        rows={10}
                        removableSort
                        className="anomalies-table"
                        emptyMessage={loaded ? <p className="flex justify-center"> No Pipelines found </p> : <Loading />}
                    >
                        {pipelineTableColumns.map((pipelineData, _i) =>
                            <Column
                                key={"index_" + _i}
                                field={pipelineData.field}
                                header={pipelineData.name}
                                headerStyle={{ width: pipelineData.width }}
                                body={(rowData) => getBodyTemplate(rowData, pipelineData)}
                            />
                        )}
                    </DataTable>
                </div> :
                    <PipelineRunsList dateSelected={state.dateSelected} />
                }
            </div>
        </div>
    );
}

export function getAirFlowTimeFormat(inputTime) {
    const parsedTime = new Date(inputTime);
    const year = parsedTime.getFullYear();
    const month = (parsedTime.getMonth() + 1).toString().padStart(2, '0');
    const day = parsedTime.getDate().toString().padStart(2, '0');
    const hours = parsedTime.getHours();
    const minutes = parsedTime.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const output = `${year}-${month}-${day}, ${formattedHours}:${minutes} ${ampm}`;
    return output;
}


export default React.memo(PipelineIndex);