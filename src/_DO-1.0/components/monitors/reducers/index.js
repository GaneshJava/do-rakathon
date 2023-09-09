import {
    READBLE_EVENT_TEXT,
    DQ_RULES,
    FIELD_HEALTH,
    FRESHNESS,
    VOLUME,
    SCHEMA_CHANGE,
    EMPTY_KEY,
    MINOR, 
    MAJOR,
    CRITICAL
} from "_DO-1.0/reducers";
import freshnessGraph from '../../../assets/freshnessGraph.svg';
import volumeGraph from '../../../assets/volumeGraph.svg';
import schemachangeGraph from '../../../assets/schemachangeGraph.svg';
import dqRuleGraph from '../../../assets/dqRulesGraph.svg';
import fieldHealthGraph from '../../../assets/fieldHealthGraph.svg';

//Time
export const AM='am';
export const PM='pm';
export const MINUTES='minutes';
export const HOURS='hours';
export const DAYS='days';

//Volume Fields
export const INCREASES="incresases_to";
export const DECREASES="decreases_to";
export const BETWEEN="is_between";


export const tableLevelMonitorCols = [
    {
        key: 'asset_name',
        name: 'Assets',
        field: 'asset_name',
    },
    {
        key: FRESHNESS,
        name: READBLE_EVENT_TEXT[FRESHNESS],
        field: FRESHNESS,
    },
    {
        key: VOLUME,
        name: READBLE_EVENT_TEXT[VOLUME],
        field: VOLUME,
    },
    {
        key: SCHEMA_CHANGE,
        name: READBLE_EVENT_TEXT[SCHEMA_CHANGE],
        field: SCHEMA_CHANGE,
    },
];
export const fieldLevelMonitorsCols = [
    {
        key: 'asset_name',
        name: 'Assets',
        field: 'asset_name',
        width: '63.5%'
    },
    {
        key: DQ_RULES,
        name: READBLE_EVENT_TEXT[DQ_RULES],
        field: DQ_RULES,
        // width: '25%'
    },
    // {
    //     key: FIELD_HEALTH,
    //     name: READBLE_EVENT_TEXT[FIELD_HEALTH],
    //     field: FIELD_HEALTH,
    //     width: '30%'
    // }
];

export const nestedTableCols = [
    {
        key: 'field_name',
        name: EMPTY_KEY,
        field: 'field_name',
    },
    {
        key: EMPTY_KEY,
        name: DQ_RULES,
        field: DQ_RULES,
    },
    // {
    //     key: EMPTY_KEY,
    //     name: FIELD_HEALTH,
    //     field: FIELD_HEALTH,
    // }
];

export const assetListFilterButtons = [
    { key: 'connection', label: 'Connection'},
    { key: 'database', label: 'Database' },
    { key: 'schema', label: 'Schema' },
    { key: 'assets', label: 'Assets' },
];

export const changeTypeOption = [
    { key: FRESHNESS, label: 'Freshness', value: FRESHNESS },
    { key: SCHEMA_CHANGE, label: 'Schema Change', value: SCHEMA_CHANGE },
    { key: DQ_RULES, label: 'DQ Rules', value: DQ_RULES },
    { key: VOLUME, label: 'Volume', value: VOLUME },
    { key: FIELD_HEALTH, label: 'Field Health', value: FIELD_HEALTH },
];

export const severityOption = [
    { key: CRITICAL, label: 'Critical', value: CRITICAL },
    { key: MAJOR, label: 'Major', value: MAJOR },
    { key: MINOR, label: 'Minor', value: MINOR }
];

export const scheduleTime = [
    { key: AM, label: 'AM' ,value:AM},
    { key: PM, label: 'PM' , value:PM},
];

export const repeateMonitor = [
    { key: MINUTES, label: 'Minutes',value:MINUTES },
    { key: HOURS, label: 'Hours',value:HOURS },
    { key: DAYS, label: 'Days',value:DAYS }
];

export const confiTableMonitor = {
    table: [{
        key: FRESHNESS,
        name: 'Freshness Monitor',
        imgSrc: freshnessGraph,
        description: 'Freshness tracks how up to date the data is and the frequency data is updated. ',
        btnLabel: 'Configure Freshness Monitor'
    },
    {
        key: SCHEMA_CHANGE,
        name: 'Schema Change Monitor',
        imgSrc: schemachangeGraph,
        description: 'Schema monitors the organization of data, such as data tables, for breaks in the table or data. Rows or columns can be changed, moved, modified or deleted and disrupt data operations.',
        btnLabel: 'Configure Schema Change Monitor'
    },
    {
        key: VOLUME,
        name: 'Volume Monitor',
        imgSrc: volumeGraph,
        description: 'Volume tracks the completeness of data tables and, like distribution, offers insights into the overall health of data sources.',
        btnLabel: 'Configure Volume Monitor'
    }],
    field: [
        {
            key: DQ_RULES,
            name: 'DQ Rule Monitor',
            imgSrc: dqRuleGraph,
            description: 'Data quality rules (also known as data validation rules) are, like automation rules, special forms of business rules. They clearly define the business requirements for specific data.',
            btnLabel: 'Configure DQ Rule Monitor'
        },
        // {
        //     key: FIELD_HEALTH,
        //     name: 'Field Health Monitor',
        //     imgSrc: fieldHealthGraph,
        //     description: 'Here will come a few line description of Field Health. What is it? how does it help? etc etc. Add some details here',
        //     btnLabel: 'Configure Field Health Monitor'
        // }
    ]
}

export const setVolumeMonitor = [
    { key: INCREASES, label: 'Is greater than', value: INCREASES },
    { key: DECREASES, label: 'Is lesser than', value: DECREASES },
    { key: BETWEEN, label: 'Is between', value: BETWEEN }
];