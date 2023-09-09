import schemaIcon from 'assets/images/schemaIcon.svg';
import freshnessIcon from 'assets/images/freshnessIcon.svg';
import distributionIcon from 'assets/images/distributionIcon.svg';
import volumeIcon from 'assets/images/volumeIcon.svg';
import { xAxisObject, yAxisObject, legendObject, toolbar } from 'components/charts/constants';


export const STATIC_CATEGORIES = [
    '21/11',
    '22/11',
    '23/11',
    '24/11',
    '25/11',
    '26/11',
    '27/11',
];

export const STATIC_OPTIONS = {
    enableZoom: true,
    dataLabels: false,
    strokeCurve: 'straight',
    chartTitle: {
        text: '',
        align: 'left',
        style: {
            margin: `0.7px 30px 11.1px 5px`,
            fontFamily: 'RakutenLight',
            fontSize: '18px',
            fontWeight: 600,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            textAlign: 'left',
            color: 'transparent',
        }
    },
    colors: ['#e8ecef', '#ccd9e3', '#afc6d7', '#93b2cb', '#769fbf'],
    yAxisTitle: '',
}

export const getConfigOptions = (title, yAxisTitle, type = 'line') => {
    return {
        ...STATIC_OPTIONS,
        chartTitle: { ...STATIC_OPTIONS.chartTitle, text: title },
        yAxisTitle,
        type
    }
}

export const getRandomSeries = (max, length = 7) => Array.from({ length: length }, () => Math.floor(Math.random() * max))

const getStaticSeries = (len) => {

    let maxLength = 7;

    let data = [
        getRandomSeries(len),
        getRandomSeries(len),
        getRandomSeries(len),
        getRandomSeries(len)
    ];
    return [
        {
            name: "gke-skywalking-showcase—default-pool-3ee76",
            data: data[0],
            avg: getAvg(data[0], maxLength, len),
        },
        {
            name: "gke-skywalking-showcase—default-pool-3ff86",
            data: data[1],
            avg: getAvg(data[1], maxLength, len),
        },
        {
            name: "gke-skywalking-showcase—default-pool-5fa86",
            data: data[2],
            avg: getAvg(data[2], maxLength, len),
        },
        {
            name: "gke-skywalking-showcase—default-pool-78a86",
            data: data[3],
            avg: getAvg(data[3], maxLength, len),
        }
    ]
}

const getAvg = (arr, max, len) => Math.round((arr.reduce((a, b) => a + b)) / max / len * 100);

export const getOptions = ({
    type = 'line',
    enableZoom,
    dataLabels,
    strokeCurve,
    chartTitle,
    colors,
    yAxisTitle
}
) => {
    return {
        chart: {
            type,
            offsetY: 20,
            toolbar: toolbar()
        },
        fill: {
            colors: undefined,
        },
        grid: {
            show: true,
            borderColor: '#90A4AE',
            strokeDashArray: 0,
            position: 'back',
            yaxis: {
                lines: {
                    show: true,
                    style: {
                        color: undefined
                    }
                }
            },
            row: {
                colors: undefined,
                opacity: 0.5
            },
            column: {
                colors: undefined,
                opacity: 0.5
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
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
            },
            y: {
                formatter: (value) => value,
            }
        },
        colors,
        dataLabels: { enabled: dataLabels },
        stroke: {
            curve: strokeCurve,
            width: 1.5,
        },
        title: chartTitle,
        xaxis: xAxisObject(),
        yaxis: yAxisObject(yAxisTitle, 10),
        legend: {
            ...legendObject(),
            show: false,
            fontSize: '12px',
            position: "bottom",
            horizontalAlign: 'left',
            onItemClick: {
                toggleDataSeries: true
            },
            labels: {
                colors: ['#fff', '#000'],
            },
            markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                strokeColor: '#fff',
                fillColors: undefined,
                radius: 12,
                customHTML: undefined,
                onClick: undefined,
                offsetX: -10,
                offsetY: 3
            }
        },
        noData: {
            text: 'No data found',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: -50,
            style: {
                color: '#a3a3a3',
                fontSize: '25px',
                fontFamily: 'RakutenRegular'
            }
        }
    }
};

export const observabilityChartsConfig = [
    {
        id: 'data-observability-freshness',
        name: 'Freshness',
        series: getStaticSeries(10),
        type: 'line',
        options: getOptions(getConfigOptions('Freshness', 'Time in hours')),
        titleIcon: <img src={freshnessIcon} alt="freshnessIcon" className=' w-7 h-7 pt-[0.6rem] pb-[0.2rem] bg-[#434343] rounded-full' />
    },
    {
        id: 'data-observability-volumn',
        name: 'Volume',
        series: getStaticSeries(70),
        type: 'line',
        options: getOptions(getConfigOptions('Volume', 'Row count')),
        titleIcon: <img src={volumeIcon} alt="volumeIcon" className=' w-7 h-7 px-[0.4rem]  bg-[#434343] rounded-full' />
    },
    {
        id: 'data-observability-distribution',
        name: 'Distribution',
        series: getStaticSeries(70),
        type: 'line',
        options: getOptions(getConfigOptions('Distribution', 'Percentage of anomalies')),
        titleIcon: <img src={distributionIcon} alt="distributionIcon" className=' w-7 h-7 px-[0.4rem]  bg-[#434343] rounded-full' />
    },
    {
        id: 'data-observability-scema',
        name: 'Scema',
        series: getStaticSeries(60),
        type: 'line',
        options: getOptions(getConfigOptions('Scema', 'Number of changes')),
        titleIcon: <img src={schemaIcon} alt="schemaIcon" className=' w-7 h-7 px-[0.4rem]  bg-[#434343] rounded-full' />
    },
];