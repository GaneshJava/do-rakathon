// import React from "react";
import  volumeIcon from 'assets/images/volumeIcon.svg';
import  distributionIcon from 'assets/images/distributionIcon.svg';
import schemaIcon from 'assets/images/schemaIcon.svg';
// import freshnessIcon from 'assets/images/freshnessIcon.svg';

export const countDonutOptions = ({
    showBuiltInLegend = true,
    showDataLabels = false,
    showTextInMiddle = false
}) => {
    return {
        series: [12, 11, 8, 3],
        fill: {
            colors: undefined,
            opacity: [1, 1, 1, 1],
        },
        labels: ['Freshness', 'Volume', 'Distribution', 'Schema'],
        colors: ['#6b96b7', '#e8ecef', '#2f4c74', '#abceee'],
        dataPointSelection: {
            enabled: false,
        },
        chart: {
            type: 'donut',
        },
        dataLabels: {
            enabled: showDataLabels
        },
        legend: {
            show: showBuiltInLegend,
            position: 'bottom',
            formatter: function (value, { seriesIndex, w }) {
                let val = w.globals.seriesTotals[seriesIndex] || 0;
                return `${w.globals.seriesNames[seriesIndex]} - ${val > 9 ? val : `0${val}`}`;
            },
            labels: {
                colors: [
                    'rgb(255, 255, 255)',
                    'rgb(255, 255, 255)',
                    'rgb(255, 255, 255)',
                    'rgb(255, 255, 255)',
                ],
                useSeriesColors: false
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: showTextInMiddle,
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Alerts',
                            fontSize: '14px',
                            fontWeight: 200,
                            color: '#FFFFFF',
                            formatter: function ({ globals }) {
                                return globals.seriesTotals.reduce((a, b) => {
                                    return a + b;
                                }, 0);
                            }
                        },
                        value: {
                            show: true,
                            color: '#FFFFFF',
                            fontWeight: 700,
                            fontSize: '20px'
                        }
                    }
                }
            }
        },
        stroke: {
            show: false
        }
    }
};

export const overviewAlert = [
    {
        time: '5:00 Am',
        category: 'Volume',
        tableName: 'customer_transactions only',
        icon: volumeIcon

    },
    {
        time: '5:01 Am',
        category: 'Volume',
        tableName: 'customer_default_showcase_3…',
        icon: volumeIcon

    },
    {
        time: '5:01 Am',
        category: 'Distribution',
        tableName: 'customer_bills',
        icon: distributionIcon

    },
    {
        time: '5:01 Am',
        category: 'Schema',
        tableName: 'customer_360',
        icon: schemaIcon

    }
];
