import zoomIn from 'assets/images/zoom-in.svg';
import zoomOut from 'assets/images/zoom-out.svg';
import reset from 'assets/images/reset-chart.svg';
import schemaIcon from 'assets/images/schemaIcon.svg';
import freshnessIcon from 'assets/images/freshnessIcon.svg';
import distributionIcon from 'assets/images/distributionIcon.svg';
import volumeIcon from 'assets/images/volumeIcon.svg';
import threedotsIcon from 'assets/images/threedotsIcon.svg';

import {
    getRandomSeries,
    getOptions,
    getConfigOptions
} from "components/home/chartLayout/dataConfig"
import {
    xAxisObject,
    yAxisObject,
    legendObject
} from 'components/charts/constants';


export const catalogTableConfigureChatData = () => {
    let data = [
        getRandomSeries(20),
        getRandomSeries(20)
    ];
    return (
        {
            id: 'data-observability-catalog-table-configure',
            name: 'Timeline of tables configured',
            series: [{
                name: 'MySQL',
                data: data[0],
                sum: getCalculatedVal(data[0], 'sum')
            }, {
                name: 'Snowflake',
                data: data[1],
                sum: getCalculatedVal(data[1], 'sum')
            }],
            type: 'bar',
            options: {
                plotOptions: {
                    bar: {
                        columnWidth: '50%', // set the bar width to 20 pixels
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                tooltip: {
                    style: {
                        fontSize: '12px',
                        fontFamily: 'RakutenLight',
                    },
                    marker: {
                        show: true,
                    },
                    theme: 'dark',
                    fixed: {
                        enabled: false,
                        position: 'topRight',
                        offsetX: 0,
                        offsetY: 0,
                    }
                },
                chart: {
                    offsetY: 100,
                    offsetX: 8,
                    type: 'bar',
                    stacked: true,
                    toolbar: {
                        tools: {
                            download: false,
                            selection: false,
                            zoom: false,
                            pan: false,
                            zoomout: `<img src=${zoomOut} class="chart-tools-icons zoomout-icon">`,
                            zoomin: `<img src=${zoomIn} class="chart-tools-icons zoomin-icon">`,
                            reset: `<img src=${reset} class="chart-tools-icons reset-icon">`
                        }
                    }
                },
                fill: {
                    opacity: [1, 1],
                },
                colors: ['#5e80bf', '#7cd2ff'],
                xaxis: { ...xAxisObject(), tickPlacement: 'on' },
                yaxis: yAxisObject('Tables configured', 7, -8),
                legend: {
                    ...legendObject(),
                    position: 'top',
                    show: false,
                },
            }
        }
    )
};

export const getCalculatedVal = (arr, type) => {
    if (type === 'sum')
        return arr.reduce((a, b) => a + b)
    if (type === 'avg')
        return Math.round((arr.reduce((a, b) => a + b)) / arr.length * 100)
}

export const TableTabs = [
    {
        id: 1,
        name: 'Overview',
        key: 'overview'
    },
    {
        id: 2,
        name: 'Volume',
        key: 'volume'
    },
    {
        id: 3,
        name: 'Freshness',
        key: 'freshness'
    },
    {
        id: 4,
        name: 'Distribution',
        key: 'distribution'
    },
    {
        id: 5,
        name: 'Data quality',
        key: 'data-quality'
    },
    {
        id: 6,
        name: 'Schema',
        key: 'scema'
    },
    {
        id: 7,
        name: 'Lineage',
        key: 'lineage'
    },
];

const fillObject = (colorStart, colorStop) => {
    return {
        type: "gradient",
        gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.5,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            colorStops: [
                {
                    offset: 0,
                    color: colorStart
                },
                {
                    offset: 100,
                    color: colorStop
                }
            ]
        }
    }
}

export const TableCharts = [
    {
        id: 'data-observability-freshness',
        name: 'Freshness',
        series: [{
            name: "Freshness",
            data: [3, 3.5, 4, 3.6, 4, 3.5, 4],
        }],
        type: 'area',
        options: {
            ...getOptions(getConfigOptions('Freshness', 'Time in hours')),
            fill: fillObject('#e8ecef', '#0d0d0d'),
            yaxis: {
                ...yAxisObject('Time in hours'),
                forceNiceScale: false,
                tickAmount: 3,
                max: 8,
                min: 0,
            }
        },
        titleIcon: <img src={freshnessIcon} alt="freshnessIcon" className=' w-7 h-7 pt-[0.6rem] pb-[0.2rem] bg-[#434343] rounded-full' />
    },
    {
        id: 'data-observability-volumn',
        name: 'Volume',
        series: [{
            name: "Volume",
            data: getRandomSeries(70),
        }],
        type: 'area',
        options: {
            ...getOptions(getConfigOptions('Volume', 'Row count')),
            fill: fillObject('#5a8edb', '#0d0d0d'),
            yaxis: {
                ...yAxisObject('Row count'),
                forceNiceScale: false,
                tickAmount: 3,
                max: 75,
                min: 0,
            }
        },
        titleIcon: <img src={volumeIcon} alt="volumeIcon" className=' w-7 h-7 px-[0.4rem]  bg-[#434343] rounded-full' />
    },
    {
        id: 'data-observability-distribution',
        name: 'Distribution',
        series: [{
            name: "Distribution",
            data: getRandomSeries(60),
        }],
        type: 'area',
        options: {
            ...getOptions(getConfigOptions('Distribution', 'Percentage of anomalies')),
            fill: fillObject('#6b96b7', '#0d0d0d'),
            yaxis: {
                ...yAxisObject('Percentage of anomalies'),
                forceNiceScale: false,
                tickAmount: 3,
                max: 75,
                min: 0,
            }
        },
        titleIcon: <img src={distributionIcon} alt="distributionIcon" className=' w-7 h-7 px-[0.4rem]  bg-[#434343] rounded-full' />
    },
    {
        id: 'data-observability-scema',
        name: 'Scema',
        series: [{
            name: "Scema",
            data: getRandomSeries(15),
        }],
        type: 'area',
        options: {
            ...getOptions(getConfigOptions('Scema', 'Number of changes')),
            fill: fillObject('#abceee', '#0d0d0d'),
            yaxis: {
                ...yAxisObject('Number of changes'),
                forceNiceScale: false,
                tickAmount: 3,
                max: 60,
                min: 0,
            }
        },
        titleIcon: <img src={schemaIcon} alt="schemaIcon" className=' w-7 h-7 px-[0.4rem]  bg-[#434343] rounded-full' />
    },
]

export const recentAlerts = [
    {
        time: '5:00 Am',
        category: 'Volume',
       quality:'Data droped by 3%',
        icon: volumeIcon,
        options: threedotsIcon

    },
    {
        time: '5:00 Am',
        category: 'Volume',
        quality: 'Data droped by 3%',
        icon: volumeIcon,
        options: threedotsIcon

    },
    {
        time: '5:00 Am',
        category: 'Volume',
        quality: 'Data droped by 3%',
        icon: volumeIcon,
        options: threedotsIcon
    },
    {
        time: '02 Feb 2023',
        category: 'Volume',
        quality:'Data droped by 3%',
        icon: volumeIcon,
        options: threedotsIcon

    },
    {
        time: '01 Feb 2023',
        category: 'Volume',
        quality:'Data droped by 3%',
        icon: volumeIcon,
        options: threedotsIcon

    },
    {
        time: '28 Jan 2023',
        category: 'Volume',
        quality:'Data droped by 3%',
        icon: volumeIcon,
        options: threedotsIcon

    },
    {
        time: '24 Jan 2023',
        category: 'Volume',
        quality:'Data droped by 3%',
        icon: volumeIcon,
        options: threedotsIcon

    },
    {
        time: '24 Jan 2023',
        category: 'Volume',
        quality:'Data droped by 3%',
        icon: volumeIcon,
        options: threedotsIcon

    }
];