import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { globalLegendClickDonut, globalLegendHover } from "../constants";

const DonutChart = ({
    options,
    series,
    type,
    height = '460px',
    showCustomLegend = false,
    title,
    titleClass,
    showCustomTotalInMiddle,
    defaultLabelForTotal
}) => {
    const chartRef = useRef(null);
    const [state, setState] = useState({
        legendData: [],
        legendColor: [],
        selectedRows: [],
        legendLabels: [],
        seriesSum: 0,
        selectedValue: '',
        selectedLabel: '',
    })

    const highLightRow = (label) => {
        return state.selectedRows.includes(label);
    }

    useEffect(() => {
        if (chartRef.current && showCustomLegend) {
            const {
                labels: legendLabels,
                series,
                colors: legendColor
            } = chartRef.current.props?.options ?? {};

            let legendData = legendLabels.map((label, labelIndex) => {
                return { name: label, value: series[labelIndex] }
            });
            let seriesSum = series.reduce((a, b) => a + b);
            setState({ ...state, legendData, legendLabels, series, legendColor, seriesSum })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartRef, showCustomLegend, showCustomTotalInMiddle])

    return (
        <div className="relative w-auto">
            <p className={`font-RakutenSemibold ${titleClass}`}> {title} </p>
            <div className="flex justify-center">
                <div className={`flex flex-col middle-custom-text absolute top-[30%]`}>
                    <div className="text-center -ml-4">
                        <p className="text-2xl font-RakutenBold"> {state.selectedValue || state.seriesSum} </p>
                        <p className="text-xs font-RakutenRegular text-[#959595]"> {state.selectedLabel || defaultLabelForTotal} </p>
                    </div>
                </div>
                <ReactApexChart
                    options={options}
                    series={series}
                    type={type}
                    height={height}
                    width="15rem"
                    ref={ref => chartRef.current = ref}
                />
            </div>
            {showCustomLegend &&
                <div className="legend-container my-2 ml-5 font-RakutenRegular text-[#959595]" style={{ justicyContent: state.legendData.length ? 'center' : 'flex-start' }}>
                    {!state.legendData.length ? <div className="no-data"> No data </div>
                        :
                        <>
                            {state.legendData.map((row, index) => {
                                let highlight = highLightRow(row.name);
                                return (
                                    <div key={index} className="flex flex-col items-center">
                                        <div
                                            className="flex cursor-pointer"
                                            key={index}
                                            onClick={() => setState(globalLegendClickDonut(state, chartRef, row, index))}
                                            onMouseEnter={() => !state.selectedRows.length ? globalLegendHover(chartRef, state.legendLabels, 'enter', index) : null}
                                            onMouseLeave={() => !state.selectedRows.length ? globalLegendHover(chartRef, state.legendLabels, 'leave', index) : null}
                                        >
                                            <span className="dot" style={{ backgroundColor: state.legendColor[index] }}> </span>
                                            <div className={highlight ? "highlight text-white" : ''}> {row.name} </div>
                                        </div>
                                        <div className="font-RakutenBold font-bold text-xl text-[#fff]">
                                            {row.value}
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    }
                </div>
            }
        </div>
    );
}

export default DonutChart;