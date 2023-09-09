import { getRandomSeries } from "components/home/chartLayout/dataConfig";
import { getChartOptions } from "_DO-1.0/components/anomaliesView/reducers/chartReducer";
import { DQ_RULES, FIELD_HEALTH, FRESHNESS, SCHEMA_CHANGE, VOLUME } from "_DO-1.0/reducers";
export const monitorsData = [
    {
        key: 'connection_count',
        label: 'CONNECTIONS',
        value: '',
        total: ''
    },
    {
        key: 'entity_level_1_count',
        label: 'DATABASES',
        value: '',
        total: ''
    },
    {
        key: 'entity_level_3_count',
        label: 'TABLES',
        value: '',
        total: ''
    },
    {
        key: 'entity_views_count',
        label: 'VIEWS',
        value: '0',
        total: '0'
    },
];

export const monitorsChartsData = [
    {
        key: 'monitor_chart_1',
        type: FRESHNESS,
        label: 'Freshness',
        description: `Detect outages, connectivity issues, or data unavailability, ensuring accessibility`,
        score: '93',
        assets: 1301,
        anomalies: 5,
        latestChange: `Table did not update in the last 30 mins`
    },
    {
        key: 'monitor_chart_2',
        type: VOLUME,
        label: 'Volume',
        description: `Detects spikes or drops in data volume, to help resourse planning & allocation`,
        score: '98',
        assets: 2417,
        anomalies: 2,
        latestChange: `Table size increased`
    },
    {
        key: 'monitor_chart_5',
        type: SCHEMA_CHANGE,
        label: 'Schema Changes',
        description: `Get outliers or unexpected changes, helping to identify potential failures`,
        score: '92',
        assets: 101,
        anomalies: 1,
        latestChange: `Gender Values updated`
    },
    {
        key: 'monitor_chart_4',
        type: DQ_RULES,
        label: 'DQ Rules',
        description: `Get Alerts when table updates are unusually delayed`,
        score: '94',
        assets: 1212,
        anomalies: 0,
        latestChange: `Script_campaign_spring failed in recursive loop`
    }
    // {
    //     key: 'monitor_chart_3',
    //     type: FIELD_HEALTH,
    //     label: 'Field Health',
    //     description: `Detects data & relationships quality issues due to loss in granular data`,
    //     score: '96',
    //     assets: 1514,
    //     anomalies: 1,
    //     latestChange: `Null Value detected in Agree_to_Terms`
    // },
];

export const monitorDetails = [
    // {
    //     key: 'monitor_details_1',
    //     label: 'Score',
    //     valueKey: 'score',
    //     inforMark: true,
    //     forwardLink: false,
    // },
    // {
    //     key: 'monitor_details_2',
    //     label: 'Assets',
    //     valueKey: 'assets',
    //     inforMark: false,
    //     forwardLink: false
    // },
    {
        key: 'monitor_details_3',
        label: 'Anomalies',
        valueKey: 'anomaliesCount',
        inforMark: false,
        forwardLink: true
    }
]

export const monitorsChartData = () => {
    let chartOptions = getChartOptions();
    let dates = ["2023-06-15", "2023-06-16", "2023-06-17", "2023-06-18", "2023-06-19", "2023-06-20", "2023-06-21", "2023-06-22", "2023-06-23", "2023-06-24", "2023-06-25", "2023-06-26", "2023-06-27", "2023-06-28", "2023-06-29", "2023-06-30"]
    chartOptions.colors = ['#f79008', '#a7a7a8', '#E5E5E5'];
    chartOptions.chart.type = 'bar';
    chartOptions.chart.offsetX = -10;
    chartOptions.chart.offsetY = -20;
    chartOptions.chart.stacked = true;
    chartOptions.chart.toolbar = { show: false };
    chartOptions.legend = { show: false }
    chartOptions.xaxis.type = 'datetime';
    chartOptions.xaxis.axisTicks = { show: false };
    chartOptions.xaxis.categories = dates;
    chartOptions.xaxis.grid = { show: false };
    chartOptions.yaxis = {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
    }
    chartOptions.xaxis.labels = { datetimeFormatter: { month: 'MMM \'yy' } }
    chartOptions.xaxis.labels = { 
        datetimeFormatter: { month: 'MMM \'yy' },
        style: { colors: '#a3a3a3' }
    }
    chartOptions.plotOptions.bar.columnWidth = '50%';
    chartOptions.grid.xaxis.lines.show = false;
    chartOptions.grid.yaxis.lines.show = false;
    return {
        series: [
            { name: '', data: getRandomSeries(50, 15) },
            { name: '', data: getRandomSeries(50, 15) },
            { name: '', data: getRandomSeries(50, 15) }
        ],
        options: chartOptions,
    }
}

export const coverageStats = [
    {
        key: 'coverage_1',
        label: 'Connections',
        percentageValue: 64,
    },
    {
        key: 'coverage_2',
        label: 'Database',
        percentageValue: 41,
    },
    {
        key: 'coverage_3',
        label: 'Tables / Views',
        percentageValue: 35,
    },
    {
        key: 'coverage_4',
        label: 'Fields',
        percentageValue: 33,
    }
];

export const tooltipText = `Health Score is calculated on the basis of the anomalies in a rolling 24 hr period. The weight of each anomaly is based on industry guidelines for data observability.`;