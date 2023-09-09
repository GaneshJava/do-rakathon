import zoomIn from 'assets/images/zoom-in.svg';
import zoomOut from 'assets/images/zoom-out.svg';
import reset from 'assets/images/reset-chart.svg';
import { STATIC_CATEGORIES } from 'components/home/chartLayout/dataConfig';

const LOW_OPACITY = 0.2;
const HIGH_OPACITY = 1;

const chartTypes = {
    'LINE': 'line'
    ,
    'DONUT': 'donut'
    ,
    'BAR': 'bar'
    ,
    'PIE': 'pie'
    ,
    'AREA': 'area'
};

const globalLegendClick = (state, chartRef, name) => {
    let selectedRows = [...state.selectedRows];
    if (selectedRows.length && selectedRows.includes(name)) {
        selectedRows.splice(selectedRows.indexOf(name), 1);
    } else {
        selectedRows.push(name);
    }
    state.legendLabels.map(seriesName => {
        if (selectedRows.length) {
            selectedRows.includes(seriesName) ?
                chartRef.current.chart.showSeries(seriesName) :
                chartRef.current.chart.hideSeries(seriesName)
        } else chartRef.current.chart.showSeries(seriesName)
        return true;
    });
    return { ...state, selectedRows };
}

const globalLegendHover = (chartRef, legendLabels, event, index) => {
    let opacity = [];
    if (event === 'enter') {
        opacity = toggleHighlightSeries(legendLabels, LOW_OPACITY);
        opacity[index] = HIGH_OPACITY;
    } else {
        opacity = toggleHighlightSeries(legendLabels, HIGH_OPACITY)
    }
    chartRef.current.chart.updateOptions({ fill: { opacity } });
}

const toggleHighlightSeries = (legendLabels, val) => {
    let temp = [];
    legendLabels.map((_, index) => { temp[index] = val; return true })
    return temp;
}

const globalLegendClickDonut = (state, chartRef, row, index) => {
    let selectedRows = [...state.selectedRows];
    let selectedValue = '', selectedLabel = '', opacity = [];
    if (selectedRows.includes(row.name)) {
        selectedRows.splice(selectedRows.indexOf(row.name), 1);
    } else {
        selectedRows = [row.name];
    }
    if (selectedRows.length) {
        selectedValue = row.value;
        selectedLabel = row.name;
        opacity = toggleHighlightSeries(state.legendLabels, LOW_OPACITY);
        opacity[index] = HIGH_OPACITY;
    } else {
        opacity = toggleHighlightSeries(state.legendLabels, HIGH_OPACITY);
    }
    chartRef.current.chart.updateOptions({ fill: { opacity } });
    return { ...state, selectedLabel, selectedValue, selectedRows }
}



export const xAxisObject = (
    type = 'category',
    categories = STATIC_CATEGORIES,
    labelStyle = {
        colors: 'white',
        fontSize: '12px',
        fontFamily: 'RakutenLight',
        fontWeight: 400,
    },
    labels = {
        show: true,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        style: labelStyle
    },
    title = {
        text: undefined,
          offsetX: 0,
          offsetY: 0,
          style: {
              color: undefined,
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-xaxis-title',
          }
    }
) => {
    return {
        type,
        categories,
        labels,
        title
    }
}

export const yAxisObject = (
    yAxisTitle,
    offsetX = 5,
    offsetY = 5,
    style = {
        color: 'white',
        fontFamily: 'RakutenLight',
        fontSize: '13px'
    },
    forceNiceScale = false,
    tickAmount = 3,
    labels = {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
            colors: '#fff',
            fontFamily: 'RakutenSans',
            fontWeight: 400,
            fontSize: '12px'
        },
        offsetX: -10,
        offsetY: 3,
        rotate: 0
    }
) => {
    return {
        title: {
            text: yAxisTitle,
            offsetX,
            offsetY,
            style
        },
        labels,
        forceNiceScale,
        tickAmount
    }
}

export const legendObject = () => {
    return {
        fontFamily: 'RakutenSans',
    }
}

export const chartTitleObj = (
    text,
    align = 'left',
    style = {
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
) => {
    return {
        text,
        align,
        style
    }
}

export const toolbar = () => {
    return {
        tools: {
            download: false,
            selection: true,
            zoom: false,
            pan: false,
            zoomout: `<img src=${zoomOut} class="chart-tools-icons zoomout-icon">`,
            zoomin: `<img src=${zoomIn} class="chart-tools-icons zoomin-icon">`,
            reset: `<img src=${reset} class="chart-tools-icons reset-icon">`
        }
    }
}

export {
    chartTypes,
    globalLegendClick,
    globalLegendClickDonut,
    globalLegendHover,
    toggleHighlightSeries
}