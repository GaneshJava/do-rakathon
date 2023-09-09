export const SNOWFLAKE = 'snowflake';
export const AZURE = 'azure_blob';
export const MYSQL = 'mysql';
export const AIRFLOW = 'airflow';
export const MATILLION = 'matillion';

export const addDataSourceSteps = [
    {
        id: 1,
        name: 'Select Data Source',
        key: 'select_datasource_type'
    },
    {
        id: 2,
        name: 'Configure Data Source',
        key: 'configure_datasource'
    },
    {
        id: 3,
        name: 'Save Data Source',
        key: 'save_datasource'
    }
];

const mandotoryFields = {
    mysql: ['connectionSchema', 'userName', 'password', 'host', 'port'],
    azure: ['connectionString'],
}

export const validateFormFields = (stateObj) => {
    let proceed = true;
    let { selectedDataSource, warning, ...restState } = stateObj;
    let warningObj = {...warning};
    mandotoryFields[selectedDataSource]?.forEach(stateKey => {
        if (!restState[stateKey]) {
            warningObj[stateKey] = true;
            proceed = false;
        }
    });
    return { proceed, warningObj }
}


export const listDataSourceCol = [
    {
        id: 1,
        key: "connectionName",
        name: "Connection Name",
        field: "connectionName",
        width: '40%',
    },
    {
        id: 2,
        key: "description",
        name: "Description",
        field: "description",
        width: '30%'
    },    
    {
        id: 3,
        key: "createdTime",
        name: "Creation Time",
        field: "createdTime",
        width: '30%'
    }
]

export const listDataSourceData = []

export const READBLE_DATA_SOURCE = {
    [SNOWFLAKE]: 'Snowflake',
    [AZURE]: 'Azure',
    [MYSQL]: 'MySQL',
    [AIRFLOW]: 'AirFlow'
};