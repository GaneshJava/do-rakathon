import { _DATABASE, _TABLE, _COLUMN } from "mvp/constants";
export const dataSourceTabs = [
  {
    id: 1,
    name: 'Dashboard',
    key: 'dashboard'
  },
  {
    id: 2,
    name: 'Metrics',
    key: 'metrics'
  },
  {
    id: 3,
    name: 'Incidents',
    key: 'incidents'
  },
  {
    id: 4,
    name: 'Discover',
    key: 'discover'
  }
];

export const treeArray = [
  {
    key: 'ichiba_campaigns',
    id: 'ichiba_campaigns_5',
    label: 'ichiba_campaigns',
    type: _DATABASE,
    nodes: []
  },
  {
    key: 'ichiba_demographics',
    id: 'ichiba_demographics',
    label: 'ichiba_demographics',
    type: _DATABASE,
    nodes: []
  },
  {
    key: 'ichiba_orders',
    id: 'ichiba_orders',
    label: 'ichiba_orders',
    type: _DATABASE,
    nodes: [
      {
        key: 'payment_method',
        id: 'payment_method',
        label: 'payment_method',
        type: _TABLE,
        nodes: []
      },
      {
        key: 'shipping_details',
        id: 'shipping_details',
        label: 'shipping_details',
        type: _TABLE,
        nodes: []
      },
      {
        key: 'order_details',
        id: 'order_details',
        label: 'order_details',
        database: 'ichiba_orders',
        type: _TABLE,
        nodes: [
          {
            key: 'order_id',
            id: 'order_id',
            label: 'order_id',
            database: 'ichiba_orders',
            table: 'order_details',
            type: _COLUMN
          },
          {
            key: 'easy_id',
            id: 'easy_id',
            label: 'easy_id',
            type: _COLUMN
          },
          {
            key: 'tracking_id',
            id: 'tracking_id',
            label: 'tracking_id',
            type: _COLUMN
          },
          {
            key: 'product_id',
            id: 'product_id',
            label: 'product_id',
            type: _COLUMN
          }
        ]
      }
    ]
  },
];


export const dataCard = [
  {
    name: 'TOTAL SCHEMAS',
    value: '03'
  },
  {
    name: 'ACTIVE SCHEMAS',
    value: '03'
  },
  {
    name: 'TOTAL METRICS',
    value: '09'
  },
  {
    name: 'ACTIVE METRICS',
    value: '04'
  }
];