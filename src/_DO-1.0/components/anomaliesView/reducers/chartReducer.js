/* eslint-disable no-unused-vars */
import { getCategories, dayEndTime } from "mvp/dashboard/constants/chartAlgorithm";
import { getConfigOptions, getOptions } from "components/home/chartLayout/dataConfig";
import { legendObject } from "components/charts/constants";
import { yAxisObject, xAxisObject } from 'components/charts/constants';
import refresh from '../../../assets/refresh.svg';

import {
    FRESHNESS,
    VOLUME,
    SCHEMA_CHANGE,
    FIELD_HEALTH,
    DQ_RULES,
    FIXED,
    OPEN,
    INPROGRESS
} from "_DO-1.0/reducers";
import { ChartTooltip } from "../molecules/ChartTooltip";

let apiData;
let eventType;
const colorCodes = {
    open: '#FF5252',
    inprogress: '#9B8AFB',
    fixed: '#4CA30D',
    OPEN: '#FF5252',
    INPROGRESS: '#9B8AFB',
    FIXED: '#4CA30D',
}

export const constructChartData = (startDate, endDate, data, chartType) => {
    apiData = data;
    eventType = chartType;
    let chartData = [];
    switch (chartType) {
        case FRESHNESS:
            chartData = constructDataForFreshness(startDate, endDate);
            break;
        case VOLUME: case 'dataHealth':
            chartData = constructDataForVolume(chartType);
            break;
        case SCHEMA_CHANGE:
            chartData = constructDataForSchemaChange();
            break;
        case FIELD_HEALTH:
            chartData = constructDataForFieldHealth();
            break;
        case DQ_RULES:

            break;
        default:
            break;
    }
    return chartData;
}

const constructDataForFreshness = () => {
    let categories = []
    let outputObj = [];
    let statusInfo = [];
    let colors = [];
    let categoryLabels = {};
    apiData.forEach((item) => {
        const { status, event_time, value } = item;
        outputObj.push(value ? 1 : 1.00001);
        categories.push(event_time)
        statusInfo.push(status);
        colors.push(value ? 'transparent' : (colorCodes[status] || '#4CA30D'));

        //label Grouping code
        const day = event_time.substr(0, 10); // Extract the day part of the event_time
        categoryLabels[event_time] = categoryLabels[day] ? false : true;
        categoryLabels[day] = true;
    })
    let chartOptions = getChartOptions();
    chartOptions.chart.type = 'bar';
    chartOptions.legend.show = false;
    chartOptions.xaxis = commonXaxisValues(chartOptions.xaxis, categories);
    chartOptions.xaxis.labels.show = outputObj.length > 0;
    chartOptions.xaxis.type = 'category';
    //Label group
    chartOptions.xaxis.labels.formatter = (value) => {
        let currentDateVal = convertTimestamp(value);
        return categoryLabels[value] ? currentDateVal : '';
    }
    // chartOptions.xaxis.labels.formatter = (value) => convertTimestamp(value);
    chartOptions.yaxis.labels.show = false;
    chartOptions.yaxis.max = 1.1;
    chartOptions.colors = colors;
    chartOptions.plotOptions.bar.distributed = true;
    chartOptions.plotOptions.bar.columnWidth = '90%';
    chartOptions.grid.xaxis.lines.show = true;
    chartOptions.tooltip = {
        ...chartOptions.tooltip,
        y: { formatter: (val) => val === 1 ? 'No Anomaly' : 'Anomaly' },
        x: { formatter: (val) => `Freshness on: ${convertMillisecondsToDate(val, 1)}` }
    }
    return {
        series: [{
            name: 'Freshness',
            data: outputObj,
            statusInfo
        }],
        chartOptions,
        typeOfChart: 'bar',
        height: '270px',
        minHeight: '300px'
    };
}

const constructDataForVolume = (chartType = '') => {
    let categories = []
    let data = [];
    let colors = [];
    let categoryLabels = {};
    const { data: volumeData, range = {} } = apiData;
    let parsedRange = typeof range === 'string' ? JSON.parse(range) : {};
    volumeData?.forEach(item => {
        const { event_time, value, status, date, count } = item;
        const eventTime = chartType === 'dataHealth' ? date : event_time;
        const eventValue = chartType === 'dataHealth' ? count : value;
        categories.push(eventTime)
        data.push(eventValue);
        colors.push(colorCodes[status] || '#FEC84B')
        //label Grouping code
        const day = eventTime.substr(0, 10); // Extract the day part of the eventTime
        categoryLabels[eventTime] = categoryLabels[day] ? false : true;
        categoryLabels[day] = true;
    })
    let chartOptions = getChartOptions();
    chartOptions.chart.type = 'bar';
    chartOptions.chart.toolbar.show = false;
    chartOptions.yaxis.labels.show = true;
    chartOptions.yaxis.labels.formatter = volumeDataRoundUp;
    chartOptions.legend.show = false;
    chartOptions.yaxis.max = Math.max(...data) + 100;
    chartOptions.xaxis = commonXaxisValues(chartOptions.xaxis, categories);
    chartOptions.xaxis.type = 'category';

    //Label group
    chartOptions.xaxis.labels.formatter = (value) => {
        let currentDateVal = convertTimestamp(value);
        return categoryLabels[value] ? currentDateVal : '';
    }
    // chartOptions.xaxis.labels.formatter = (value) => convertTimestamp(value);
    chartOptions.colors = colors;
    chartOptions.plotOptions.bar.distributed = true;
    chartOptions.plotOptions.bar.columnWidth = '20%';
    chartOptions.grid.xaxis.lines.show = false;
    chartOptions.grid.yaxis.lines.show = false;
    chartOptions.tooltip = {
        ...chartOptions.tooltip,
        y: { formatter: (val) => `${chartType === 'dataHealth' ? 'Incidents:' : ''} ${volumeDataRoundUp(val)}` },
        x: { formatter: (val) => `${chartType === 'dataHealth' ? 'Anomalies on' : 'Volume on'}: ${convertMillisecondsToDate(val, 1)}` }
    }
    chartOptions.annotations.yaxis = [{
        y: parsedRange.min_value || null,
        y2: parsedRange.max_value || null,
        borderColor: "#fff",
        fillColor: '#A5A5A5',
        opacity: 0.3,
        label: {
            borderColor: "#333",
            position: 'left',
            style: {
                fontSize: "10px",
                color: "#333",
                fontWeight: 'bold',
                background: "#FEB019",
                padding: {
                    left: 5,
                    right: 5,
                    top: 7,
                    bottom: 5,
                }
            },
            text: `${parsedRange.min_value ? `Min: ${parsedRange.min_value}` : ''}${parsedRange.min_value && parsedRange.max_value ? ', ' : ''}${parsedRange.max_value ? `Max: ${parsedRange.max_value}` : ''}`,
            offsetX: 90,
            offsetY: 0
        }
    }];
    return {
        chartOptions,
        typeOfChart: 'bar',
        series: [
            {
                name: 'Volume',
                data
            }
        ]
    }
}

const constructDataForSchemaChange = () => {
    let data = [];
    let annotationsPoints = [];
    let tooltipInfo = [];
    let categories = [];
    let categoryLabels = {};
    apiData.forEach((item, index) => {
        let status = item.status;
        categories[index] = new Date(item.event_time).getTime();
        data[index] = 10 + Number(`0.00000${item.value}`);
        tooltipInfo[index] = typeof item.changes === 'string' ? JSON.parse(item.changes) : item.changes;
        if (item.value) {
            annotationsPoints.push({
                x: new Date(item.event_time).getTime(),
                y: 10,
                marker: {
                    size: 5 * item.value,
                    fillColor: status === FIXED ? colorCodes.fixed : status === OPEN ? colorCodes.open : colorCodes.inprogress,
                    strokeColor: 'transparent',
                    radius: 2,
                    cssClass: "apexcharts-custom-class"
                }
            })
        }

        //label Grouping code
        const day = item.event_time.substr(0, 10); // Extract the day part of the event_time
        categoryLabels[new Date(item.event_time).getTime()] = categoryLabels[day] ? false : true;
        categoryLabels[day] = true;
    })
    let chartOptions = getChartOptions(SCHEMA_CHANGE);
    chartOptions.chart.type = 'line';
    chartOptions.chart.toolbar = {
        show: true,
        tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: `<img src=${refresh} class="chart-tools-icons reset-icon" title="Zoom Reset">`, //true,
        }
    }
    chartOptions.colors = ['#6C737F'];
    chartOptions.grid = { show: false }
    chartOptions.xaxis = commonXaxisValues(chartOptions.xaxis, categories, false);
    chartOptions.xaxis.categories = categories;
    chartOptions.xaxis.type = 'datetime';
    //Label group
    // chartOptions.xaxis.labels.formatter = (value) => {
    //     let currentDateVal = convertTimestamp(value);
    //     return categoryLabels[value] ? currentDateVal : '';
    // }
    // chartOptions.xaxis.labels.formatter = (value) => convertTimestamp(value);
    // chartOptions.xaxis.labels.format = 'dd/MM';
    chartOptions.xaxis.labels.datetimeFormatter = {
        day: 'dd/MM',
        hour: 'dd/MM hh:mm'
    }
    chartOptions.yaxis.min = 0;
    chartOptions.yaxis.max = 15;
    chartOptions.yaxis.tickAmount = 6;
    chartOptions.annotations.points = annotationsPoints;
    chartOptions.yaxis.labels.show = false;
    chartOptions.tooltip = {
        ...chartOptions.tooltip,
        custom: ({ dataPointIndex }) => ChartTooltip({ tooltipInfo, dataPointIndex, eventType, value: extractNumberAfterDecimal(data[dataPointIndex]), categories }),
    }
    return {
        series: [{
            name: 'Changes',
            data
        }],
        chartOptions,
        typeOfChart: 'line',
    }
}

const constructDataForFieldHealth = () => {
    let data = [];
    let categories = [];
    apiData.forEach((item, index) => {
        categories[index] = item.event_time;
        data[index] = Number(item.value);
    })
    let chartOptions = getChartOptions('field_health');
    chartOptions.stroke = {
        curve: 'straight',
        width: 2
    }
    chartOptions.chart.type = 'line';
    chartOptions.chart.toolbar.show = false;
    chartOptions.colors = ['#E5E5E5'];
    chartOptions.grid = {
        ...chartOptions.grid,
        strokeDashArray: 3,
        show: true,
        borderColor: "#959595",
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } }
    }
    chartOptions.xaxis = commonXaxisValues(chartOptions.xaxis, categories);
    chartOptions.xaxis.categories = categories;
    chartOptions.xaxis.type = 'datetime';
    chartOptions.xaxis.categories = categories;
    chartOptions.xaxis.type = 'datetime';
    chartOptions.xaxis.labels.formatter = (value) => convertTimestamp(value);
    chartOptions.yaxis.min = 0;
    chartOptions.yaxis.max = 100;
    chartOptions.yaxis.tickAmount = 6;
    chartOptions.annotations = {
        points: getPoints()
    }
    chartOptions.yaxis.labels = {
        ...chartOptions.yaxis.labels,
        formatter: (val) => `${val}%`
    }
    chartOptions.tooltip = {
        ...chartOptions.tooltip,
        y: { formatter: (val) => `${val}% Unique` },
        x: { formatter: (val) => `Current anomaly on (${convertMillisecondsToDate(val)})` }
    }
    return {
        series: [{
            name: 'Field Health',
            data
        }],
        chartOptions,
        typeOfChart: 'line',
    }
}

const getCategoriesBasedOnDateRange = (startDate, endDate) => {
    let forAllDays = getDaysDifference(dayEndTime(startDate), dayEndTime(endDate)) < 11;
    if (forAllDays) {
        const dateMap = new Map();
        return getCategories(startDate, endDate, dateMap, '')
    }
    else {
        return createXAxis(apiData);
    }
}

const createXAxis = () => {
    const uniqueDates = new Set();
    apiData.forEach((item) => {
        const date = item.event_time.split('T')[0]; // Extract the date part
        uniqueDates.add(date);
    })
    return Array.from(uniqueDates).sort().map((date) => {
        // eslint-disable-next-line no-unused-vars
        const [year, month, day] = date.split('-');
        return `${day}/${month}`;
    });
}

export const getDaysDifference = (startDate, endDate) => {
    var startMs = startDate.getTime();
    var endMs = endDate.getTime();
    var diffMs = endMs - startMs;
    var diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return diffDays;
}

export const getChartOptions = () => {
    return {
        ...getOptions(getConfigOptions('', '')),
        yaxis: {
            ...yAxisObject(''),
            forceNiceScale: true,
            tickAmount: 1,
            decimalsInFloat: 0,
            min: 0,
            labels: {
                ...yAxisObject('').labels,
                formatter: (val) => val,
                show: true
            }
        },
        xaxis: {
            ...xAxisObject(null, null, {
                colors: '#737373',
                fontFamily: 'PrimaryFont',
                fontSize: '15px',
                cssClass: 'apexcharts-xaxis-title',
            })
        },
        colors: [],
        legend: {
            ...legendObject(),
            show: true,
            showForSingleSeries: false,
            showForNullSeries: false,
            showForZeroSeries: true,
            position: 'bottom',
            horizontalAlign: 'left',
            labels: {
                colors: ['#fff'],
            },
            offsetY: 5,
            itemMargin: {
                horizontal: 20,
                vertical: 10
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '90%'
            },
        },
        grid: {
            show: true,
            borderColor: '#90A4AE',
            strokeDashArray: 0,
            position: 'back',
            xaxis: {
                lines: {
                    show: true,
                }
            },
            yaxis: {
                lines: {
                    show: false,
                    style: {
                        color: undefined
                    }
                }
            },
        },
        annotations: {
            points: [],
            yaxis: [],
            xaxis: [],
        }
    }
}

export const anomalyChartLegends = [
    {
        name: 'Open',
        key: 'open',
        fillColor: colorCodes.open
    },
    {
        name: 'In Progress',
        key: 'inprogress',
        fillColor: colorCodes.inprogress
    },
    {
        name: 'Fixed',
        key: 'fixed',
        fillColor: colorCodes.fixed
    }
];

const getPoints = () => {
    let pointsCoordinates = [];
    [
        {
            x: '2023-06-03T00:00:00',
            y: 85,
            status: 'fixed',
            fillColor: colorCodes.fixed,
        },
        {
            x: '2023-06-09T00:00:00',
            y: 85,
            status: 'fixed',
            fillColor: colorCodes.fixed,
        },
        {
            x: '2023-06-17T00:00:00',
            y: 85,
            status: 'inprogress',
            fillColor: colorCodes.inprogress,
        },
        {
            x: '2023-06-20T00:00:00',
            y: 85,
            status: 'open',
            fillColor: colorCodes.open,
        },
    ].map(item =>
        pointsCoordinates.push({
            x: new Date(item.x).getTime(),
            y: 85,
            marker: {
                size: 10,
                fillColor: item.fillColor,
                strokeColor: 'transparent',
                radius: 2,
                cssClass: "apexcharts-custom-class"
            }
        })
    )
    return pointsCoordinates;
}

export function convertMillisecondsToDate(milliseconds, includeHrs = true) {
    const date = new Date(milliseconds);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const formattedDate = `${day}/${month.toString().padStart(2, '0')}`;
    if (includeHrs) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHrs = `${(hours % 12 || 12).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${ampm}`;
        return `${formattedDate} [ ${formattedHrs} ]`;
    }
    return formattedDate;
}

function extractNumberAfterDecimal(input) {
    var inputString = `${input}`;
    var decimalIndex = inputString.indexOf('.');
    var substring = inputString.substring(decimalIndex + 1);
    return parseInt(substring);
}

function convertTimestamp(timestamp) {
    try {
        const dateObj = new Date(timestamp);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const readableFormat = `${day}/${month}`;
        return readableFormat;
    } catch (error) {
        return "";
    }
}

function commonXaxisValues(xaxis, categories, formatter = true) {
    xaxis.title.text = '(DD/MM)';
    xaxis.title.offsetY = -8;
    xaxis.title.style.color = '#737373';
    xaxis.title.style.fontSize = '15px';
    xaxis.title.style.fontFamily = 'RakutenSemibold';
    xaxis.categories = categories;
    xaxis.labels.show = true;
    xaxis.labels.datetimeUTC = false;
    if (formatter) xaxis.labels.formatter = (value) => convertTimestamp(value);
    return xaxis;
}

export function volumeDataRoundUp(val) {
    let number = Number(val)
    if (number >= 1000) {
        var suffixes = ["", "k", "m", "b", "t"];
        var suffixIndex = 0;
        while (number >= 1000 && suffixIndex < suffixes.length - 1) {
            number /= 1000;
            suffixIndex++;
        }
        return number.toFixed(1) + suffixes[suffixIndex];
    }
    return number.toString();
}