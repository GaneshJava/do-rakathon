import {
  getOptions,
  getConfigOptions
} from "components/home/chartLayout/dataConfig"
import { legendObject } from "components/charts/constants";
import {
  yAxisObject
} from 'components/charts/constants';
import { _DATABASE, _TABLE } from "mvp/constants";

export const _VOLUME = 0;
export const _SCHEMA = 1;
export const _DISTRIBUTION = 2;


export const detailSections = [
  {
    stateKey: 'volume',
    label: 'Volume',
    expandKey: 'expandVolume',
    childNodes: [
      {
        stateKey: 'rowCount',
        label: 'Row count',
        dataType: 'metric',
        subType: 'row_count',
        countKey: 'value',
      },
      {
        stateKey: 'size',
        label: 'Size in MB',
        dataType: 'metric',
        subType: 'table_size',
        countKey: 'value',
      }
    ]
  },
  {
    stateKey: 'schema',
    label: 'Schema Changes',
    expandKey: 'expandSchema',
    childNodes: [
      {
        stateKey: 'schemaLavelChanges',
        label: 'Schema Changes at DB level',
        groupBy: 'database',
        level: _DATABASE,
        countKey: 'anomaly_count',
      },
      {
        stateKey: 'tableLevelChanges',
        label: 'Schema Changes at Table level',
        groupBy: 'table',
        level: _TABLE,
        countKey: 'anomaly_count',
      }
    ]
  },
  {
    stateKey: 'distribution',
    label: 'Distribution',
    expandKey: 'expandDistribution',
    childNodes: [
      {
        dataType: 'distribution',
        countKey: 'anomaly_count',
        subType: 'expect_column_mean_to_be_between',
        label: 'Mean Breaches',
        overall: 'Overall',
        unique: 'Unique',
        recurring: 'Most Recurring',
      },
      {
        dataType: 'distribution',
        countKey: 'anomaly_count',
        subType: 'expect_column_median_to_be_between',
        label: 'Median breaches',
        overall: 'Overall',
        unique: 'Unique',
        recurring: 'Most Recurring',
      }
    ]
  }
];

export const distributionCard = [
  {
    label: 'Mean Breaches',
    overall: 'Overall',
    value1: '10',
    unique: 'Unique',
    value2: '07',
    recurring: 'Most Recurring',
    data: 'ichiba_order',
    eventSubType: 'expect_column_mean_to_be_between',
    dataType: 'distribution'
  },
  {
    label: 'Median Breaches',
    overall: 'Overall',
    value1: '10',
    unique: 'Unique',
    value2: '07',
    recurring: 'Most Recurring',
    data: 'ichiba_order',
    eventSubType: 'expect_column_median_to_be_between',
    dataType: 'distribution'
  }
];

export const chartOptions = () => {
  return {
    ...getOptions(getConfigOptions('Freshness', '')),
    yaxis: {
      ...yAxisObject(''),
      forceNiceScale: true,
      tickAmount: 3,
      decimalsInFloat: 0,
      min: 0,
    },
    colors: ['#F59500', '#C75D5D', '#c06a10', '#694003'],
    markers: {
      size: 3,
      colors: undefined,
      strokeColors: '#F59500',
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: undefined,
        sizeOffset: 3
      }
    },
    legend: {
      ...legendObject(),
      show: true,
      showForSingleSeries: false,
      showForNullSeries: false,
      showForZeroSeries: true,
      position: 'bottom',
      horizontalAlign: 'center',
      labels: {
        colors: ['#fff'],
      },
      offsetY: 12
    },
  }
}
