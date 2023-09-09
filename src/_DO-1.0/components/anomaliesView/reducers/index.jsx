import { DQ_RULES, FRESHNESS, SCHEMA_CHANGE, VOLUME } from "_DO-1.0/reducers";

export const ownerDetails = {
    name: 'Rinosan',
    email: 'rino@rakuten.com',
    discription: 'Eng for Marketing & Sales data across APAC. Love surfing.'
}

export const anomalyTabs = [
    {
        id: 1,
        name: 'Freshness',
        key: FRESHNESS
    },
    {
        id: 2,
        name: 'Volume',
        key: VOLUME
    },
    {
        id: 3,
        name: 'Schema Change',
        key: SCHEMA_CHANGE
    },
    {
        id: 4,
        name: 'DQ rules',
        key: DQ_RULES
    },
    //WE NEED THIS IN FUTURE
    // {
    //     id: 5,
    //     name: 'Field health',
    //     key: FIELD_HEALTH
    // }
];

export const dqData = [

    {
        valueKey: 'Failed',
        label: 'Rule Status',
        value: 'Failed'
    },
    {
        valueKey: 'element_count',
        label: 'Rows Scanned',
        value: '7860'
    },
    {
        valueKey: 'subtraction',
        label: 'Rows Passed',
        value: '7118'
    },
    {
        valueKey: 'unexpected_count',
        label: 'Rows Failed',
        value: '740'
    },
    {
        valueKey: 'start_time',
        label: 'Start Time',
        value: '21 Nov | 13:27:28'
    },
    {
        valueKey: 'end_time',
        label: 'End Time',
        value: '21 Nov | 13:27:28'
    },
];

export const getEntityData = ({
    entity_level1,
    entity_level2,
    entity_level3,
    entity_level4,
    event_type,
    current_status,
    event_description
}) => {
    return {
        entity_level1,
        entity_level2,
        entity_level3,
        entity_level4,
        event_type,
        event_description,
        current_status,
        "id": Math.random(),
        "tenant_id": "rakuten",
        "conn_id": "azure01",
        "event_sub_type": null,
        "event_time": "2023-05-11T00:00:00",
        "action_time": null,
        "attributes": null,
        "severity": "low",
        "asset_type": "file",
        "conn_type": 'snowflake',
        "event_id": "222"
    }
}


export const timeLine = {
    OPEN: {
        event_time: '202-05-10T00:00:00',
        collaborator: 'userProfileUrl'
    }
};

export const timeLine2 = {
    OPEN: {
        event_time: '2023-05-10T00:00:00',
        collaborator: 'userProfileUrl'
    },
    INPROGRESS: {
        event_time: '2023-05-12T00:00:00',
        collaborator: 'userProfileUrl'
    }
};

export const timeLine3 = {
    open: {
        event_time: '2023-05-10T00:00:00',
        collaborator: 'userProfileUrl || empty'
    },
    inprogress: {
        event_time: '2023-05-12T00:00:00',
        collaborator: 'userProfileUrl'
    },
    fixed: {
        event_time: '2023-05-14T00:00:00',
        collaborator: 'userProfileUrl'
    }
};

export const volumeTypeOptions = {
    Type: [
        {
            key: 'row_count',
            label: 'Row Count'
        },
        {
            key: 'size',
            label: 'Table Size'
        }
    ],
    Subtype: {
        row_count: [
            {
                key: 'row_count',
                label: 'Absolute Count'
            },
            {
                key: 'change_in_row_count',
                label: 'Relative Change'
            },
            {
                key: 'change_in_percentage_row_count',
                label: 'Relative Change In Percentage'
            }
        ],
        size: [
            {
                key: 'size',
                label: 'Absolute Size'
            },
            {
                key: 'change_in_size',
                label: 'Relative Size'
            },
            {
                key: 'change_in_percentage_size',
                label: 'Relative Size In Percentage'
            }
        ]
    }
}
