import { INPROGRESS, OPEN, FIXED, FRESHNESS, DQ_RULES, CRITICAL } from "_DO-1.0/reducers";

export const tableData = [
  {
    "id": "1",
    "action_time": null,
    "attributes": null,
    "conn_id": "conn",
    "current_status": INPROGRESS,
    "entity_level1": "SnowflakeProd_con",
    "entity_level2": "customer DNA",
    "entity_level3": "Customers",
    "event_description": "Table did not update in the last 31 mins",
    "event_id": "1-1-1-1",
    "event_sub_type": null,
    "event_time": "2023-07-05T00:00:00",
    "event_type": "freshness",
    "tenant_id": "rakuten",
    "comments": null,
    "severity": CRITICAL
  },
  {
    "id": "2",
    "action_time": null,
    "attributes": null,
    "conn_id": "conn",
    "current_status": OPEN,
    "entity_level1": "SnowflakeProd_con",
    "entity_level2": "Prod_con",
    "entity_level3": "Transactions",
    "event_description": "Table size increased beyond 5K rows",
    "event_id": "3",
    "event_sub_type": null,
    "event_time": "2023-07-06T00:00:00",
    "event_type": "volume",
    "tenant_id": "rakuten",
    "comments": null,
    "severity": CRITICAL
  },
  {
    "id": "3",
    "action_time": null,
    "attributes": null,
    "conn_id": "conn",
    "current_status": INPROGRESS,
    "entity_level1": "db",
    "entity_level2": "customer DNA",
    "entity_level3": "Customers",
    "event_description": "ID uniques is 98%",
    "event_id": "2",
    "event_sub_type": null,
    "event_time": "2023-07-07T00:00:00",
    "event_type": "field_health",
    "tenant_id": "rakuten",
    "comments": null,
    "severity": CRITICAL
  },
  {
    "id": "4",
    "action_time": null,
    "attributes": null,
    "conn_id": "conn",
    "current_status": OPEN,
    "entity_level1": "SnowflakeProd_con",
    "entity_level2": "Prod_con",
    "entity_level3": "Transactions",
    "event_description": "Schema changed description",
    "event_id": "5",
    "event_sub_type": null,
    "event_time": "2023-07-08T00:00:00",
    "event_type": "schema",
    "tenant_id": "rakuten",
    "comments": null,
    "severity": CRITICAL
  },
  {
    "id": "5",
    "action_time": null,
    "attributes": null,
    "conn_id": "conn",
    "current_status": INPROGRESS,
    "entity_level1": "db",
    "entity_level2": "customer DNA",
    "entity_level3": "Cancellation",
    "event_description": "Freshness description",
    "event_id": "4",
    "event_sub_type": null,
    "event_time": "2023-07-09T00:00:00",
    "event_type": "freshness",
    "tenant_id": "rakuten",
    "comments": null,
    "severity": CRITICAL
  },
  {
    "id": "6",
    "action_time": null,
    "attributes": null,
    "conn_id": "conn",
    "current_status": INPROGRESS,
    "entity_level1": "db",
    "entity_level2": "database_new",
    "entity_level3": "Projections",
    "event_description": "Freshness description",
    "event_id": "6",
    "event_sub_type": null,
    "event_time": "2023-07-05T00:00:00",
    "event_type": "freshness",
    "tenant_id": "rakuten",
    "comments": null,
    "severity": CRITICAL
  },
  {
    "id": "7",
    "action_time": null,
    "attributes": null,
    "conn_id": "conn",
    "current_status": OPEN,
    "entity_level1": "db",
    "entity_level2": "database_new",
    "entity_level3": "Certificates",
    "event_description": "Freshness description",
    "event_id": "7",
    "event_sub_type": null,
    "event_time": "2023-07-09T00:00:00",
    "event_type": "freshness",
    "tenant_id": "rakuten",
    "comments": null,
    "severity": CRITICAL
  },
  {
    "id": "8",
    "action_time": null,
    "attributes": null,
    "conn_id": "conn",
    "current_status": FIXED,
    "entity_level1": "db",
    "entity_level2": "database_new",
    "entity_level3": "Customers",
    "event_description": "Volume description",
    "event_id": "8",
    "event_sub_type": null,
    "event_time": "2023-07-10T00:00:00",
    "event_type": "volume",
    "tenant_id": "rakuten",
    "comments": null,
    "severity": CRITICAL,
  },
  {
    "id": "9",
    "action_time": null,
    "attributes": null,
    "conn_id": "conn",
    "current_status": INPROGRESS,
    "entity_level1": "db",
    "entity_level2": "database_new",
    "entity_level3": "Certificates",
    "event_description": "volume description",
    "event_id": "9",
    "event_sub_type": null,
    "event_time": "2023-07-11T00:00:00",
    "event_type": "volume",
    "tenant_id": "rakuten",
    "comments": null,
    "severity": CRITICAL
  },
  {
    "id": "10",
    "action_time": null,
    "attributes": null,
    "conn_id": "conn",
    "current_status": OPEN,
    "entity_level1": "db",
    "entity_level2": "database_new",
    "entity_level3": "Users",
    "event_description": "Freshness description",
    "event_id": "10",
    "event_sub_type": null,
    "event_time": "2023-07-10T00:00:00",
    "event_type": FRESHNESS,
    "tenant_id": "rakuten",
    "comments": null,
    "severity": CRITICAL
  },
  {
    "id": "11",
    "action_time": null,
    "attributes": null,
    "conn_id": "conn",
    "current_status": OPEN,
    "entity_level1": "db",
    "entity_level2": "database_new",
    "entity_level3": "Users",
    "event_description": "DQ Rules description",
    "event_id": "11",
    "event_sub_type": null,
    "event_time": "2023-07-10T00:00:00",
    "event_type": DQ_RULES,
    "tenant_id": "rakuten",
    "comments": null,
    "severity": CRITICAL
  }
];

export const apiData = {
  freshness: [
    {
      "event_time": "2023-07-09T10:04:59",
      "value": true,
      "status": FIXED
    },
    {
      "event_time": "2023-07-10T07:48:12",
      "value": false,
      "status": FIXED
    },
    {
      "event_time": "2023-07-11T13:49:20",
      "value": true,
      "status": INPROGRESS
    },
    {
      "event_time": "2023-07-12T15:02:04",
      "value": false,
      "status": INPROGRESS
    },
    {
      "event_time": "2023-07-13T15:02:08",
      "value": false,
      "status": OPEN
    },
    {
      "event_time": "2023-07-14T15:03:05",
      "value": true,
      "status": OPEN
    }
  ],
  volume: {
    data: [
      {
        "event_time": "2023-07-07T08:42:33",
        "value": 700,
        "status": ""
      },
      {
        "event_time": "2023-07-07T08:43:41",
        "value": 706,
        "status": ""
      },
      {
        "event_time": "2023-07-07T10:42:38",
        "value": 700,
        "status": OPEN
      },
      {
        "event_time": "2023-07-07T10:43:29",
        "value": 715,
        "status": OPEN
      },
      {
        "event_time": "2023-07-07T10:44:35",
        "value": 720,
        "status": ""
      }
    ],
    range: {
      min_value: 200,
      max_value: 650,
    }
  },
  field_health: [
    {
      id: '1',
      value: 100,
      event_time: "2023-06-01T00:00:00"
    },
    {
      id: '1.11',
      value: 100,
      event_time: "2023-06-02T00:00:00"
    },
    {
      id: '1.12',
      value: 85,
      event_time: "2023-06-03T00:00:00"
    },
    {
      id: '1.13',
      value: 100,
      event_time: "2023-06-04T00:00:00"
    },
    {
      id: '1.14',
      value: 100,
      event_time: "2023-06-05T00:00:00"
    },
    {
      id: '1.15',
      value: 100,
      event_time: "2023-06-06T00:00:00"
    },
    {
      id: '1.16',
      value: 100,
      event_time: "2023-06-07T00:00:00"
    },
    {
      id: '1.17',
      value: 100,
      event_time: "2023-06-08T00:00:00"
    },
    {
      id: '1.18',
      value: 85,
      event_time: "2023-06-09T00:00:00"
    },
    {
      id: '1.19',
      value: 100,
      event_time: "2023-06-10T00:00:00"
    },
    {
      id: '1.20',
      value: 100,
      event_time: "2023-06-11T00:00:00"
    },
    {
      id: '1.21',
      value: 100,
      event_time: "2023-06-12T00:00:00"
    },
    {
      id: '2',
      value: 100,
      event_time: "2023-06-13T00:00:00"
    },
    {
      id: '2.1',
      value: 100,
      event_time: "2023-06-14T00:00:00"
    },
    {
      id: '2.2',
      value: 100,
      event_time: "2023-06-15T00:00:00"
    },
    {
      id: '2.3',
      value: 100,
      event_time: "2023-06-16T00:00:00"
    },
    {
      id: '3',
      value: 85,
      event_time: "2023-06-17T00:00:00"
    },
    {
      id: '3.1',
      value: 100,
      event_time: "2023-06-18T00:00:00"
    },
    {
      id: '3.2',
      value: 100,
      event_time: "2023-06-19T00:00:00"
    },
    {
      id: '3.3',
      value: 85,
      event_time: "2023-06-20T00:00:00"
    },
    {
      id: '4',
      value: 100,
      event_time: "2023-06-21T00:00:00"
    },
    {
      id: '4.1',
      value: 100,
      event_time: "2023-06-22T00:00:00"
    },
    {
      id: '4.2',
      value: 100,
      event_time: "2023-06-23T00:00:00"
    },
  ],
  schema: [
    {
      id: '1',
      value: 0,
      event_time: "2023-06-01T00:00:00",
      status: 'no anomaly',
      changes: {
        add: null,
        del: null,
        alter: null,
      }
    },
    {
      id: '1',
      value: 4,
      event_time: "2023-06-02T00:00:00",
      status: 'resolved',
      changes: {
        add: 1,
        del: 1,
        alter: 2,
      }
    },
    {
      id: '1',
      value: 0,
      event_time: "2023-06-04T00:00:00",
      status: 'no anomaly',
      changes: {
        add: null,
        del: null,
        alter: null,
      }
    }
    ,
    {
      id: '1.12',
      value: 7,
      event_time: "2023-06-05T00:00:00",
      status: 'resolved',
      changes: {
        add: 2,
        del: 3,
        alter: 2,
      }
    },
    {
      id: '1.13',
      value: 1,
      event_time: "2023-06-04T00:00:00",
      status: 'no anomaly',
      changes: {
        add: null,
        del: null,
        alter: null,
      }
    },
    {
      id: '1.15',
      value: 1,
      event_time: "2023-06-06T00:00:00",
      status: 'no anomaly',
      changes: {
        add: null,
        del: null,
        alter: null,
      }
    },
    {
      id: '1.16',
      value: 1,
      event_time: "2023-06-07T00:00:00",
      status: 'no anomaly',
      changes: {
        add: null,
        del: null,
        alter: null,
      }
    },
    {
      id: '1.18',
      value: 1,
      event_time: "2023-06-09T00:00:00",
      status: 'no anomaly',
      changes: {
        add: null,
        del: null,
        alter: null,
      }
    },
    {
      id: '1.19',
      value: 8,
      event_time: "2023-06-10T00:00:00",
      status: 'resolved',
      changes: {
        add: 4,
        del: 3,
        alter: 1,
      }
    },
    {
      id: '1.20',
      value: 1,
      event_time: "2023-06-11T00:00:00",
      status: 'no anomaly',
      changes: {
        add: null,
        del: null,
        alter: null,
      }
    },
    {
      id: '1.21',
      value: 1,
      event_time: "2023-06-12T00:00:00",
      status: 'no anomaly',
      changes: {
        add: null,
        del: null,
        alter: null,
      }
    },
    {
      id: '2.2',
      value: 4,
      event_time: "2023-06-15T00:00:00",
      status: 'resolved',
      changes: {
        add: null,
        del: 4,
        alter: null,
      }
    },
    {
      id: '2.3',
      value: 1,
      event_time: "2023-06-16T00:00:00",
      status: 'no anomaly',
      changes: {
        add: null,
        del: null,
        alter: null,
      }
    },
    {
      id: '3',
      value: 2,
      event_time: "2023-06-17T00:00:00",
      status: 'resolved',
      changes: {
        add: 1,
        del: 1,
        alter: null,
      }
    },
    {
      id: '3.1',
      value: 3,
      event_time: "2023-06-18T00:00:00",
      status: 'resolved',
      changes: {
        add: 1,
        del: 1,
        alter: 1,
      }
    },
    {
      id: '3.2',
      value: 1,
      event_time: "2023-06-19T00:00:00",
      status: 'no anomaly',
      changes: {
        add: null,
        del: null,
        alter: null,
      }
    },
    {
      id: '3.3',
      value: 1,
      event_time: "2023-06-20T00:00:00",
      status: 'no anomaly',
      changes: {
        add: null,
        del: null,
        alter: null,
      }
    },
    {
      id: '4',
      value: 3,
      event_time: "2023-06-21T00:00:00",
      status: 'resolved',
      changes: {
        add: 1,
        del: null,
        alter: 2,
      }
    },
    {
      id: '4.1',
      value: 4,
      event_time: "2023-06-22T00:00:00",
      status: 'unresolved',
      changes: {
        add: null,
        del: 1,
        alter: 3,
      }
    },
    {
      id: '4.2',
      value: 2,
      event_time: "2023-06-23T00:00:00",
      status: 'unresolved',
      changes: {
        add: 1,
        del: 1,
        alter: null,
      }
    },
    {
      id: '4.3',
      value: 0,
      event_time: "2023-06-24T00:00:00",
      status: 'no anomaly',
      changes: {
        add: null,
        del: null,
        alter: null,
      }
    }
  ]
};

export const detailedtabledataFreshness = [
  {
    id: '1-1-1-1',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Customer',
    event_time: '2023-05-14T00:00:00',
    event_type: 'freshness',
    event_sub_type: null,
    event_description: 'Table did not update in last 30 mins',
    current_status: INPROGRESS,
    action_time: null,
    attributes: null,
    severity: 'low',
    asset_type: 'table',
    include_star: true,
    resolution: '-'
  },

  {
    id: '2',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Customer',
    event_time: '2023-05-12T00:00:00',
    event_type: 'freshness',
    event_sub_type: null,
    event_description: 'view did not update in last 30 mins',
    current_status: OPEN,
    action_time: null,
    attributes: null,
    severity: 'medium',
    asset_type: 'table',
    include_star: true,
    resolution: '-'
  },
  {
    id: '3',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Invoice',
    event_time: '2023-05-11T00:00:00',
    event_type: 'freshness',
    event_sub_type: null,
    event_description: 'Table did not update in last 3 mins',
    current_status: OPEN,
    action_time: null,
    attributes: null,
    severity: 'low',
    asset_type: 'file',
    resolution: '-'
  },
  {
    id: '4',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Cancellation',
    event_time: '2023-05-10T00:00:00',
    event_type: 'freshness',
    event_sub_type: null,
    event_description: 'Table did not update in last 3 mins',
    current_status: FIXED,
    action_time: null,
    attributes: null,
    severity: 'high',
    asset_type: 'table',
    resolution: "Pipeline 'SAP Dataflow' failed"
  }
];


export const detailedtabledataVolume = [
  {
    id: '1-1-1-1',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Customer',
    event_time: '2023-05-14T00:00:00',
    event_type: 'volume',
    event_sub_type: null,
    event_description: 'Table size increased beyond 5K rows',
    current_status: INPROGRESS,
    action_time: null,
    attributes: null,
    severity: 'low',
    asset_type: 'table',
    include_star: true,
    resolution: '-'
  },

  {
    id: '2',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Customer',
    event_time: '2023-05-12T00:00:00',
    event_type: 'volume',
    event_sub_type: null,
    event_description: 'Table size increased beyond 50K rows',
    current_status: OPEN,
    action_time: null,
    attributes: null,
    severity: 'medium',
    asset_type: 'table',
    include_star: true,
    resolution: 'Overload due to Black Friday Sale'
  },
  {
    id: '3',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Invoice',
    event_time: '2023-05-11T00:00:00',
    event_type: 'volume',
    event_sub_type: null,
    event_description: 'Table size decreased beyond 500 rows',
    current_status: OPEN,
    action_time: null,
    attributes: null,
    severity: 'low',
    asset_type: 'file',
    resolution: 'Failed to sync. Fixed Script.'
  },
  {
    id: '4',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Cancellation',
    event_time: '2023-05-10T00:00:00',
    event_type: 'volume',
    event_sub_type: null,
    event_description: 'Table size increased beyond 5K rows',
    current_status: FIXED,
    action_time: null,
    attributes: null,
    severity: 'high',
    asset_type: 'table',
    resolution: "-"
  }
];

export const detailedFieldHealthData = [];

export const detailedSchemaChangeData = [
]

export const overallDetailedData = [
  {
    id: '1-1-1-1-1',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Customer',
    event_time: '2023-05-14T00:00:00',
    event_type: 'volume',
    event_sub_type: null,
    event_description: 'Table size increased beyond 5K rows',
    current_status: INPROGRESS,
    action_time: null,
    attributes: null,
    severity: 'low',
    asset_type: 'table',
    include_star: true,
    resolution: '-'
  },
  {
    id: '2-2',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Customer',
    event_time: '2023-05-12T00:00:00',
    event_type: 'volume',
    event_sub_type: null,
    event_description: 'Table size increased beyond 50K rows',
    current_status: OPEN,
    action_time: null,
    attributes: null,
    severity: 'medium',
    asset_type: 'table',
    include_star: true,
    resolution: 'Overload due to Black Friday Sale'
  },
  {
    id: '3-3',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Invoice',
    event_time: '2023-05-11T00:00:00',
    event_type: 'volume',
    event_sub_type: null,
    event_description: 'Table size decreased beyond 500 rows',
    current_status: OPEN,
    action_time: null,
    attributes: null,
    severity: 'low',
    asset_type: 'file',
    resolution: 'Failed to sync. Fixed Script.'
  },
  {
    id: '4-4',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Cancellation',
    event_time: '2023-05-10T00:00:00',
    event_type: 'volume',
    event_sub_type: null,
    event_description: 'Table size increased beyond 5K rows',
    current_status: FIXED,
    action_time: null,
    attributes: null,
    severity: 'high',
    asset_type: 'table',
    resolution: "-"
  },
  {
    id: '1-1-1-1-5',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Customer',
    event_time: '2023-05-14T00:00:00',
    event_type: 'freshness',
    event_sub_type: null,
    event_description: 'Table did not update in last 30 mins',
    current_status: INPROGRESS,
    action_time: null,
    attributes: null,
    severity: 'low',
    asset_type: 'table',
    include_star: true,
    resolution: '-'
  },
  {
    id: '2-6',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Customer',
    event_time: '2023-05-12T00:00:00',
    event_type: 'freshness',
    event_sub_type: null,
    event_description: 'view did not update in last 30 mins',
    current_status: OPEN,
    action_time: null,
    attributes: null,
    severity: 'medium',
    asset_type: 'table',
    include_star: true,
    resolution: '-'
  },
  {
    id: '3-7',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Invoice',
    event_time: '2023-05-11T00:00:00',
    event_type: 'freshness',
    event_sub_type: null,
    event_description: 'Table did not update in last 3 mins',
    current_status: OPEN,
    action_time: null,
    attributes: null,
    severity: 'low',
    asset_type: 'file',
    resolution: '-'
  },
  {
    id: '4-8',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Cancellation',
    event_time: '2023-05-10T00:00:00',
    event_type: 'freshness',
    event_sub_type: null,
    event_description: 'Table did not update in last 3 mins',
    current_status: FIXED,
    action_time: null,
    attributes: null,
    severity: 'high',
    asset_type: 'table',
    resolution: "Pipeline 'SAP Dataflow' failed"
  },
  {
    id: '1-1-1-1-9',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Customer',
    event_time: '2023-05-14T00:00:00',
    event_type: 'schema',
    event_sub_type: null,
    event_description: '3 schema changes detected',
    current_status: INPROGRESS,
    action_time: null,
    attributes: null,
    severity: 'low',
    asset_type: 'table',
    include_star: true,
    resolution: '-'
  },
  {
    id: '2-11',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Customer',
    event_time: '2023-05-12T00:00:00',
    event_type: 'schema',
    event_sub_type: null,
    event_description: '5 schema changes detected',
    current_status: OPEN,
    action_time: null,
    attributes: null,
    severity: 'medium',
    asset_type: 'table',
    include_star: true,
    resolution: 'Overload due to Black Friday Sale'
  },
  {
    id: '3-12',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Invoice',
    event_time: '2023-05-11T00:00:00',
    event_type: 'schema',
    event_sub_type: null,
    event_description: '1 schema change detected',
    current_status: OPEN,
    action_time: null,
    attributes: null,
    severity: 'low',
    asset_type: 'file',
    resolution: 'Failed to sync. Fixed Script.'
  },
  {
    id: '4-13',
    tenant_id: 'rakuten',
    conn_id: 'conn',
    entity_level1: 'db',
    entity_level2: 'customer DNA',
    entity_level3: 'Cancellation',
    event_time: '2023-05-10T00:00:00',
    event_type: 'schema',
    event_sub_type: null,
    event_description: '2 schema changes detected',
    current_status: FIXED,
    action_time: null,
    attributes: null,
    severity: 'high',
    asset_type: 'table',
    resolution: "-"
  }
];

export const schemachangedata = [
  {
    id: '1-1-1-1',
    field: 'Age',
    change_type: 'Create',
    new_configuration: 'Decimal (4 digit)',
    db_user: 'John Doe',
    time: 'Today, 12:56'
  },

  {
    id: '2',
    field: 'Phone Number',
    change_type: 'Create',
    new_configuration: 'Number (10 digit)',
    db_user: 'John Doe',
    time: 'Today, 12:56'
  },
  {
    id: '3',
    field: 'Name',
    change_type: 'Create',
    new_configuration: 'String (64 char)',
    db_user: 'John Doe',
    time: 'Today, 12:56'
  },
  {
    id: '4',
    field: 'Weight',
    change_type: 'Create',
    new_configuration: 'Decimal (4 digit)',
    db_user: 'John Doe',
    time: 'Today, 12:56'
  }
];

export const dqRulesChangedData = [
  {
    id: '1',
    rule_label:'[CUSTOM]SALES_TAXAMT<SALES_AMT',
    asset_field: '[Transactions]Sales_Amt',
    status: 'Failed',
    rows_scanned: 7118,
    rows_failed: 740,
    start_time: '2023-07-05T00:00:00Z', //UTC time format
    end_time: '2023-07-10T00:00:00Z',
    values: [
          { count: 2, critically: 'high' },
          { count: 0, critically: 'medium' },
          { count: 1, critically: 'low' }
        ]
  },
  {
    id: '2',
    rule_label:'[CUSTOM]SALES_TAXAMT<SALES_AMT',
    asset_field: '[Transactions]Sales_Amt',
    status: 'Failed',
    rows_scanned: 7118,
    rows_failed: 740,
    start_time: '2023-07-05T00:00:00Z', //UTC time format
    end_time: '2023-07-10T00:00:00Z',
    values: [
          { count: 2, critically: 'high' },
          { count: 0, critically: 'medium' },
          { count: 1, critically: 'low' }
        ]
  },
  {
    id: '3',
    rule_label:'[CUSTOM]SALES_TAXAMT<SALES_AMT',
    asset_field: '[Transactions]Sales_Amt',
    status: 'Failed',
    rows_scanned: 7118,
    rows_failed: 740,
    start_time: '2023-07-05T00:00:00Z', //UTC time format
    end_time: '2023-07-10T00:00:00Z',
    values: [
          { count: 2, critically: 'high' },
          { count: 0, critically: 'medium' },
          { count: 1, critically: 'low' }
        ]
  },
  {
    id: '4',
    rule_label:'[CUSTOM]SALES_TAXAMT<SALES_AMT',
    asset_field: '[CUSTOMER]Phone number',
    status: 'Failed',
    rows_scanned: 7118,
    rows_failed: 740,
    start_time: '2023-07-05T00:00:00Z', //UTC time format
    end_time: '2023-07-10T00:00:00Z',
    values: [
          { count: 2, critically: 'high' },
          { count: 0, critically: 'medium' },
          { count: 1, critically: 'low' }
        ]
  },
  {
    id: '5',
    rule_label:'[CUSTOM]SALES_TAXAMT<SALES_AMT',
    asset_field: '[CUSTOMER]Phone number',
    status: 'Failed',
    rows_scanned: 7118,
    rows_failed: 740,
    start_time: '2023-07-05T00:00:00Z', //UTC time format
    end_time: '2023-07-10T00:00:00Z',
    values: [
          { count: 2, critically: 'high' },
          { count: 0, critically: 'medium' },
          { count: 1, critically: 'low' }
        ]
  },
  {
    id: '6',
    rule_label:'[CUSTOM]SALES_TAXAMT<SALES_AMT',
    asset_field: '[CUSTOMER]Phone number',
    status: 'Failed',
    rows_scanned: 7118,
    rows_failed: 740,
    start_time: '2023-07-05T00:00:00Z', //UTC time format
    end_time: '2023-07-10T00:00:00Z',
    values: [
          { count: 2, critically: 'high' },
          { count: 0, critically: 'medium' },
          { count: 1, critically: 'low' }
        ]
  },
  {
    id: '7',
    rule_label:'[CUSTOM]SALES_TAXAMT<SALES_AMT',
    asset_field: '[CUSTOMER]Phone number',
    status: 'Failed',
    rows_scanned: 7118,
    rows_failed: 740,
    start_time: '2023-07-05T00:00:00Z', //UTC time format
    end_time: '2023-07-10T00:00:00Z',
    values: [
          { count: 2, critically: 'high' },
          { count: 0, critically: 'medium' },
          { count: 1, critically: 'low' }
        ]
  },
  {
    id: '8',
    rule_label:'[CUSTOM]SALES_TAXAMT<SALES_AMT',
    asset_field: '[CUSTOMER]Phone number',
    status: 'Failed',
    rows_scanned: 7118,
    rows_failed: 740,
    start_time: '2023-07-05T00:00:00Z', //UTC time format
    end_time: '2023-07-10T00:00:00Z',
    values: [
          { count: 2, critically: 'high' },
          { count: 0, critically: 'medium' },
          { count: 1, critically: 'low' }
        ]
  }

];


export const dqSummeryData = [
  {
    "tenant_id": "rak01",
    "conn_id": "azure01",
    "entity_level_1": "default",
    "entity_level_2": "avacado",
    "entity_level_3": "chunk0.csv",
    "entity_level_4": "Total_Volume",
    "events": [
      {
        "id": "f42ee77d-c64b-4d1f-85fb-cf8d2a06f32b",
        "type": "dq_rules",
        "sub_type": "expect_column_values_to_be_increasing",
        "severity": "Medium",
        "event_description": "Expect column values to be increasing",
        "current_status": "OPEN",
        "attributes": {
          "end_time": "2023-07-24 11:39:29.628258",
          "start_time": "2023-07-24 11:39:29.628258",
          "element_count": 200,
          "unexpected_count": 28
        }
      },
      {
        "id": "52a22266-b4a7-4b24-90a7-926e9a031e7d",
        "type": "dq_rules",
        "sub_type": "expect_column_value_lengths_to_equal",
        "severity": "Medium",
        "event_description": "Expect column value lengths to equal",
        "current_status": "OPEN",
        "attributes": {
          "end_time": "2023-07-24 11:39:29.628258",
          "start_time": "2023-07-24 11:39:29.628258",
          "element_count": 200,
          "unexpected_count": 28
        }
      }
    ],
    "tags": {
      "critical": 0,
      "major": 0,
      "minor": 0
    }
  },
  {
    "tenant_id": "rak01",
    "conn_id": "azure01",
    "entity_level_1": "default",
    "entity_level_2": "avacado",
    "entity_level_3": "chunk0.csv",
    "entity_level_4": "count",
    "events": [
      {
        "id": "055f11d6-0583-42b3-90b8-065c17f657d3",
        "type": "dq_rules",
        "sub_type": "expect_column_value_lengths_to_equal",
        "severity": "High",
        "event_description": "Expect column value lengths to equal",
        "current_status": "",
        "attributes": {
          "end_time": "2023-07-24 11:39:29.628258",
          "start_time": "2023-07-24 11:39:29.628258",
          "element_count": 200,
          "unexpected_count": 28
        }
      },
      {
        "id": "c5c2a0d7-ecf6-4992-86e8-c77e8491c6b7",
        "type": "dq_rules",
        "sub_type": "expect_column_values_to_be_in_type_list",
        "severity": "High",
        "event_description": "Expect column values to be in type list",
        "current_status": "OPEN",
        "attributes": {
          "end_time": "2023-07-24 11:39:29.628258",
          "start_time": "2023-07-24 11:39:29.628258",
          "element_count": 200,
          "unexpected_count": 28
        }
      }
    ],
    "tags": {
      "critical": 0,
      "major": 0,
      "minor": 0
    }
  }
];


export const dqLastFiveExecution = [
  {
    "id": "bf07916f-6210-4ad7-b6b3-bb8b16ea15d0",
    "tenant_id": "rak01",
    "conn_id": "azure01",
    "entity_level_1": "default",
    "entity_level_2": "avacado",
    "entity_level_3": "chunk0.csv",
    "entity_level_4": "Total_Volume",
    "level": "entity_level_4",
    "severity": "Medium",
    "event_description": "Expect column values to be increasing",
    "current_status": "OPEN",
    "is_passed": false,
    "timestamp": "2023-07-24T15:39:29.628258",
    "type": "dq_rules",
    "sub_type": "expect_column_values_to_be_increasing",
    "attributes": {
      "end_time": "2023-07-24 11:39:29.628258",
      "start_time": "2023-07-24 11:39:29.628258",
      "element_count": 200,
      "unexpected_count": 28
    }
  },
  {
    "id": "20b5a8a9-c2d6-4eeb-999c-4a55a2efba4e",
    "tenant_id": "rak01",
    "conn_id": "azure01",
    "entity_level_1": "default",
    "entity_level_2": "avacado",
    "entity_level_3": "chunk0.csv",
    "entity_level_4": "Total_Volume",
    "level": "entity_level_4",
    "severity": "Medium",
    "event_description": "Expect column values to be increasing",
    "current_status": "OPEN",
    "is_passed": false,
    "timestamp": "2023-07-24T16:39:29.628258",
    "type": "dq_rules",
    "sub_type": "expect_column_values_to_be_increasing",
    "attributes": {
      "end_time": "2023-07-24 11:39:29.628258",
      "start_time": "2023-07-24 11:39:29.628258",
      "element_count": 200,
      "unexpected_count": 28
    }
  },
  {
    "id": "779e26eb-d5e1-4737-84d2-06565197e890",
    "tenant_id": "rak01",
    "conn_id": "azure01",
    "entity_level_1": "default",
    "entity_level_2": "avacado",
    "entity_level_3": "chunk0.csv",
    "entity_level_4": "Total_Volume",
    "level": "entity_level_4",
    "severity": "Medium",
    "event_description": "Expect column values to be increasing",
    "current_status": "OPEN",
    "is_passed": false,
    "timestamp": "2023-07-24T17:39:29.628258",
    "type": "dq_rules",
    "sub_type": "expect_column_values_to_be_increasing",
    "attributes": {
      "end_time": "2023-07-24 11:39:29.628258",
      "start_time": "2023-07-24 11:39:29.628258",
      "element_count": 200,
      "unexpected_count": 28
    }
  },
  {
    "id": "6e170e22-e7af-47b3-86ab-07b7bfc5c0c6",
    "tenant_id": "rak01",
    "conn_id": "azure01",
    "entity_level_1": "default",
    "entity_level_2": "avacado",
    "entity_level_3": "chunk0.csv",
    "entity_level_4": "Total_Volume",
    "level": "entity_level_4",
    "severity": "Medium",
    "event_description": "Expect column values to be increasing",
    "current_status": "OPEN",
    "is_passed": false,
    "timestamp": "2023-07-24T18:39:29.628258",
    "type": "dq_rules",
    "sub_type": "expect_column_values_to_be_increasing",
    "attributes": {
      "end_time": "2023-07-24 11:39:29.628258",
      "start_time": "2023-07-24 11:39:29.628258",
      "element_count": 200,
      "unexpected_count": 28
    }
  },
  {
    "id": "c0e0e1c9-d5e4-4b86-8e22-c2dd44e4af0d",
    "tenant_id": "rak01",
    "conn_id": "azure01",
    "entity_level_1": "default",
    "entity_level_2": "avacado",
    "entity_level_3": "chunk0.csv",
    "entity_level_4": "Total_Volume",
    "level": "entity_level_4",
    "severity": "Medium",
    "event_description": "Expect column values to be increasing",
    "current_status": "OPEN",
    "is_passed": false,
    "timestamp": "2023-07-24T19:39:29.628258",
    "type": "dq_rules",
    "sub_type": "expect_column_values_to_be_increasing",
    "attributes": {
      "end_time": "2023-07-24 11:39:29.628258",
      "start_time": "2023-07-24 11:39:29.628258",
      "element_count": 200,
      "unexpected_count": 28
    }
  }
];

export const assetList = [
  {
    "asset_id": "database_1_$_schema_1_$_asset_one",
    "conn_id": "conn_1",
    "entity_level_1": "database_1",
    "entity_level_2": "schema_1",
    "entity_level_3": "asset_one",
    "asset_type": "table",
    "asset_fields": [
      {
        "field_id": "asset_1.1",
        "field_name": "field1_one",
        "parent_id": "database_1_$_schema_1_$_asset_one"
      },
      {
        "field_id": "asset_1.2",
        "field_name": "field1_two",
        "parent_id": "database_1_$_schema_1_$_asset_one"
      }
    ],
    "monitor_details": {
      "volumeRuleConfig": [
        {
          "id": "828a3c12-cf90-4289-9438-bcd5337fc028",
          "monitorName": "Test Monitor - From Kafka - Sunday",
          "frequency": "0 0 * * * ? *",
          "description": "Record and execute rules - volume & freshness",
          "isActive": true,
          "ruleId": "Rule2",
          "ruleType": "volume",
          "ruleSubType": "expect_change_in_row_count_to_be_greater_than",
          "pillar": "volume",
          "level": "entityLevel3",
          "ruleGroup": null,
          "severity": "CRITICAL",
          "config": {
            "value": 3.0
          }
        }
      ],
      "freshnessRuleConfig": [
        {
          "id": "828a3c12-cf90-4289-9438-bcd5337fc028",
          "monitorName": "Test Monitor - From Kafka - Sunday",
          "frequency": "0 0 * * * ? *",
          "description": "Record and execute rules - volume & freshness",
          "isActive": true,
          "ruleId": "Rule1",
          "ruleType": "freshness",
          "ruleSubType": "expect_change_in_freshness_to_be_greater_than",
          "pillar": "freshness",
          "level": "entityLevel3",
          "ruleGroup": null,
          "severity": "CRITICAL",
          "config": {
            "value": 3.0
          }
        }
      ],
      "schemaRuleConfig": [],
      "dqRuleConfig": []
    }
  },
  {
    "asset_id": "database_2_$_schema_2_$_asset_two",
    "conn_id": "conn_2",
    "entity_level_1": "database_2",
    "entity_level_2": "schema_2",
    "entity_level_3": "asset_two",
    "asset_type": "table",
    "asset_fields": [
      {
        "field_id": "asset_2.1",
        "field_name": "field2_one",
        "parent_id": "database_2_$_schema_2_$_asset_two"
      },
      {
        "field_id": "asset_2.2",
        "field_name": "field2_two",
        "parent_id": "database_2_$_schema_2_$_asset_two"
      }
    ],
    "monitor_details": null
  },
  {
    "asset_id": "database_3_$_schema_3_$_asset_three",
    "conn_id": "conn_3",
    "entity_level_1": "database_3",
    "entity_level_2": "schema_3",
    "entity_level_3": "asset_three",
    "asset_type": "table",
    "asset_fields": [
      {
        "field_id": "asset_3.1",
        "field_name": "field3_one",
        "parent_id": "database_3_$_schema_3_$_asset_three"
      },
      {
        "field_id": "asset_3.2",
        "field_name": "field3_two",
        "parent_id": "database_3_$_schema_3_$_asset_three"
      }
    ],
    "monitor_details": {
      "volume": [{
        "name": "Volume Check - Every 6 hours",
        "schedule_time": "",
        "description": "description of the Monitor"
      }]
    }
  },
  {
    "asset_id": "database_4_$_schema_4_$_asset_four",
    "conn_id": "conn_4",
    "entity_level_1": "database_4",
    "entity_level_2": "schema_4",
    "entity_level_3": "asset_four",
    "asset_type": "table",
    "asset_fields": [
      {
        "field_id": "asset_4.1",
        "field_name": "field4_one",
        "parent_id": "database_4_$_schema_4_$_asset_four"
      },
      {
        "field_id": "asset_4.2",
        "field_name": "field4_two",
        "parent_id": "database_4_$_schema_4_$_asset_four"
      }
    ],
    "monitor_details": null
  },
  {
    "asset_id": "database_5_$_schema_4_$_asset_five",
    "conn_id": "conn_5",
    "entity_level_1": "database_5",
    "entity_level_2": "schema_5",
    "entity_level_3": "asset_five",
    "asset_type": "table",
    "asset_fields": [
      {
        "field_id": "asset_5.1",
        "field_name": "field5_one",
        "parent_id": "database_5_$_schema_4_$_asset_five"
      },
      {
        "field_id": "asset_5.2",
        "field_name": "field5_two",
        "parent_id": "database_5_$_schema_4_$_asset_five"
      }
    ],
    "monitor_details": null
  }
]


export const dagPipelines = {
  "dags": [
    {
      "dag_id": "dataset_consumes_1",
      "default_view": "grid",
      "description": null,
      "file_token": ".eJxNyjEOgCAMAMC_sEsHB59jKlYgFNvYJsrv3YzjJRegSCfAeh0sN0SWhAxcN9DhRc45LmDVaVJMDTPZV-nBrkzrjtl-cDRyizrCC_UUIe0.ZfbPDDqV9cI9t7_pyml3BCNIiMk",
      "fileloc": "/home/airflow/.local/lib/python3.7/site-packages/airflow/example_dags/example_datasets.py",
      "has_import_errors": false,
      "has_task_concurrency_limits": false,
      "is_active": true,
      "is_paused": false,
      "is_subdag": false,
      "last_expired": null,
      "last_parsed_time": "2023-08-16T07:37:56.943510+00:00",
      "last_pickled": null,
      "max_active_runs": 16,
      "max_active_tasks": 16,
      "next_dagrun": null,
      "next_dagrun_create_after": null,
      "next_dagrun_data_interval_end": null,
      "next_dagrun_data_interval_start": null,
      "owners": [
        "airflow"
      ],
      "pickle_id": null,
      "root_dag_id": null,
      "schedule_interval": {
        "__type": "CronExpression",
        "value": "Dataset"
      },
      "scheduler_lock": null,
      "tags": [
        {
          "name": "consumes"
        },
        {
          "name": "dataset-scheduled"
        }
      ],
      "timetable_description": "Triggered by datasets"
    },
    {
      "dag_id": "dataset_consumes_1_and_2",
      "default_view": "grid",
      "description": null,
      "file_token": ".eJxNyjEOgCAMAMC_sEsHB59jKlYgFNvYJsrv3YzjJRegSCfAeh0sN0SWhAxcN9DhRc45LmDVaVJMDTPZV-nBrkzrjtl-cDRyizrCC_UUIe0.ZfbPDDqV9cI9t7_pyml3BCNIiMk",
      "fileloc": "/home/airflow/.local/lib/python3.7/site-packages/airflow/example_dags/example_datasets.py",
      "has_import_errors": false,
      "has_task_concurrency_limits": false,
      "is_active": true,
      "is_paused": true,
      "is_subdag": false,
      "last_expired": null,
      "last_parsed_time": "2023-08-16T07:37:56.947348+00:00",
      "last_pickled": null,
      "max_active_runs": 16,
      "max_active_tasks": 16,
      "next_dagrun": null,
      "next_dagrun_create_after": null,
      "next_dagrun_data_interval_end": null,
      "next_dagrun_data_interval_start": null,
      "owners": [
        "airflow"
      ],
      "pickle_id": null,
      "root_dag_id": null,
      "schedule_interval": {
        "__type": "CronExpression",
        "value": "Dataset"
      },
      "scheduler_lock": null,
      "tags": [
        {
          "name": "consumes"
        },
        {
          "name": "dataset-scheduled"
        }
      ],
      "timetable_description": "Triggered by datasets"
    },
    {
      "dag_id": "dataset_consumes_1_never_scheduled",
      "default_view": "grid",
      "description": null,
      "file_token": ".eJxNyjEOgCAMAMC_sEsHB59jKlYgFNvYJsrv3YzjJRegSCfAeh0sN0SWhAxcN9DhRc45LmDVaVJMDTPZV-nBrkzrjtl-cDRyizrCC_UUIe0.ZfbPDDqV9cI9t7_pyml3BCNIiMk",
      "fileloc": "/home/airflow/.local/lib/python3.7/site-packages/airflow/example_dags/example_datasets.py",
      "has_import_errors": false,
      "has_task_concurrency_limits": false,
      "is_active": true,
      "is_paused": true,
      "is_subdag": false,
      "last_expired": null,
      "last_parsed_time": "2023-08-16T07:37:56.950596+00:00",
      "last_pickled": null,
      "max_active_runs": 16,
      "max_active_tasks": 16,
      "next_dagrun": null,
      "next_dagrun_create_after": null,
      "next_dagrun_data_interval_end": null,
      "next_dagrun_data_interval_start": null,
      "owners": [
        "airflow"
      ],
      "pickle_id": null,
      "root_dag_id": null,
      "schedule_interval": {
        "__type": "CronExpression",
        "value": "Dataset"
      },
      "scheduler_lock": null,
      "tags": [
        {
          "name": "consumes"
        },
        {
          "name": "dataset-scheduled"
        }
      ],
      "timetable_description": "Triggered by datasets"
    }
  ],
  "total_entries": 49
};

export const dagPipelinesRuns = {
  "dag_runs": [
    {
      "conf": {},
      "dag_id": "dataset_consumes_1",
      "dag_run_id": "manual__2023-08-16T06:14:21.190598+00:00",
      "data_interval_end": "2023-08-16T06:14:21.190598+00:00",
      "data_interval_start": "2023-08-16T06:14:21.190598+00:00",
      "end_date": "2023-08-16T06:14:29.787461+00:00",
      "execution_date": "2023-08-16T06:14:21.190598+00:00",
      "external_trigger": true,
      "last_scheduling_decision": "2023-08-16T06:14:29.777235+00:00",
      "logical_date": "2023-08-16T06:14:21.190598+00:00",
      "note": null,
      "run_type": "manual",
      "start_date": "2023-08-16T06:14:21.914216+00:00",
      "state": "success"
    },
    {
      "conf": {},
      "dag_id": "dataset_consumes_1",
      "dag_run_id": "manual__2023-08-16T06:23:54.620513+00:00",
      "data_interval_end": "2023-08-16T06:23:54.620513+00:00",
      "data_interval_start": "2023-08-16T06:23:54.620513+00:00",
      "end_date": "2023-08-16T06:24:04.075636+00:00",
      "execution_date": "2023-08-16T06:23:54.620513+00:00",
      "external_trigger": true,
      "last_scheduling_decision": "2023-08-16T06:24:04.070732+00:00",
      "logical_date": "2023-08-16T06:23:54.620513+00:00",
      "note": null,
      "run_type": "manual",
      "start_date": "2023-08-16T06:23:54.971589+00:00",
      "state": "success"
    }
  ],
  "total_entries": 2
}