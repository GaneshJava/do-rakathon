import React, { useState, useEffect } from "react";
import { Divider } from "primereact/divider";
import { DataTable } from 'primereact/datatable';
import {
    getSvgIcons,
} from "../../anomaliesList/reducers";
import { customPaginatorTemplate } from "_DO-1.0/sharedComponents/customPaginatorTemplate";
import { Loading } from "core-modules/Loader";
import { Column } from 'primereact/column';
import { listDataSourceData, MYSQL, SNOWFLAKE, AZURE, READBLE_DATA_SOURCE, AIRFLOW, MATILLION } from "../reducers";
import { listDataSourceCol } from '../reducers';
import { InputText } from "primereact/inputtext";
import airflowLogo from "../../../assets/airflowIcon.svg";
import matillionIcon from "../../../assets/matillion.svg";
import { useSelector, useDispatch } from "react-redux";
import { authState, fetchAllConnectionBasedOnTenant } from "store";
import { getAirFlowTimeFormat } from "_DO-1.0/components/airflowPipelines";
import { SiMicrosoftazure, SiMysql, SiSnowflake } from "react-icons/si";

const ConnectionList = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(authState);
    const [loaded, setLoaded] = useState(false);
    const [state, setState] = useState({
        searchTerm: '',
        data: [],
        filteredRows: [],
        listDataSource: ''
    });

    useEffect(() => {
        getListOfConnections();
    }, [])

    const getListOfConnections = async () => {
        setLoaded(false);
        let setObj = { ...state };
        const response = await dispatch(fetchAllConnectionBasedOnTenant(user.tenantId)).unwrap();
        console.log('connections API response:', response);
        if (response.status === 200)
            setObj['data'] = setObj['filteredRows'] = response?.data ?? [];
        else
            setObj['data'] = setObj['filteredRows'] = [];
        setLoaded(true);
        setState(setObj);
    }

    const handleSearch = ({ target: { value = '' } }) => {
        let filteredRows = [];
        if (value)
            filteredRows = state.data?.filter(item => `${item.connectionName}`.toLowerCase().toString().indexOf(value.toLowerCase().toString()) !== -1)
        else
            filteredRows = state.data;
        setState({ ...state, filteredRows, searchTerm: value })
    }

    const getBodyTemplate = (rowData, key) => {
        let template = null;
        switch (key) {
            case 'connectionName':
                template = eventConnNameTemplate(rowData);
                break;
            case 'description':
                template = <span className="font-RakutenLight"> {rowData.description} </span>;
                break;
            case 'createdTime':
                template = <span className="font-RakutenLight">{getAirFlowTimeFormat(rowData.createdTime || '2023-08-16T06:14:21.190598+00:00')}</span>
                break;
            default:
                break;
        }
        return template;
    }

    const eventConnNameTemplate = (rowData) => {
        let { connectionName, connectionType } = rowData;
        let logo = null;
        if (connectionType === SNOWFLAKE)
            logo = <SiSnowflake color="#0389d0" size={28} />
        else if (connectionType === AZURE)
            logo = <SiMicrosoftazure color="#0389d0" size={28} />
        else if (connectionType === AIRFLOW)
            logo = <img src={airflowLogo} alt="" className="h-8 w-8"/>   
        else if (connectionType === MATILLION)
            logo = <img src={matillionIcon} alt="" className="h-8 w-8"/>        
        else
            logo = <img src={matillionIcon} alt="" className="h-12 w-12" />
        return (
            <div className="flex gap-4 items-center">
                <span className="flex justify-center w-12"> {logo} </span>
                <p> {connectionName} </p>
            </div>)
    }

    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className="mx-5">
                    <p className="font-RakutenSemibold text-3xl text-primaryTextColor"> Data Sources </p>
                    <p className="font-RakutenLight text-secondaryTextColor">
                        List of data sources configured
                    </p>
                </div>
                <div className="mx-5 p-input-icon-left w-[20rem]">
                    <i className="pi pi-search" />
                    <InputText placeholder="Search" className="w-full h-12 rounded-lg"
                        onChange={handleSearch}
                        value={state.searchDataSource}
                    />
                </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-6 mx-5">
                <DataTable
                    value={loaded ? state.filteredRows : []}
                    selectionMode={'checkbox'}
                    selection={state.listDataSource}
                    onSelectionChange={(e) => setState({ ...state, listDataSource: e.value })}
                    dataKey="id"
                    expandedRows={state.expandedRows}
                    onRowToggle={(e) => setState({ ...state, expandedRows: e.data })}
                    expandedRowIcon={() => getSvgIcons('expandToggle', 1)}
                    collapsedRowIcon={() => getSvgIcons('expandToggle', 0)}
                    tableStyle={{ minWidth: '50rem' }}
                    selectionAutoFocus={false}
                    paginator
                    paginatorTemplate={customPaginatorTemplate}
                    rows={10}
                    removableSort
                    className="anomalies-table"
                    emptyMessage={loaded ? <p className="flex justify-center"> No Connections found </p> : <Loading />}
                >
                    <Column selectionMode="" headerStyle={{ width: '5rem' }}></Column>
                    {listDataSourceCol.map((listDataSourceData, _i) =>
                        <Column
                            key={"index_" + _i}
                            field={listDataSourceData.field}
                            header={listDataSourceData.name}
                            headerStyle={{ width: listDataSourceData.width }}
                            body={(rowData) => getBodyTemplate(rowData, listDataSourceData.key)}

                        />
                    )}
                </DataTable>
            </div>
        </div>
    )
}

export default React.memo(ConnectionList);