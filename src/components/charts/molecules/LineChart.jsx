// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { globalLegendClick, globalLegendHover } from "../constants";

const LineChart = ({
    options,
    series,
    type,
    height = '350px',
    showCustomLegendTable = false,
    title,
    titleClass = 'font-RakutenSansUISemiBold',
    legendHeader = ['Table', 'Value'],
    chartOffsetClass="py-1 pl-3 pr-1",
    titleIcon = '',
    dateFilter = '',
    updatedChart,
    customLegendTemplate
}) => {
    const [state, setState] = useState({
        legendData: [],
        legendColor: [],
        selectedRows: [],
        legendLabels: [],
    })
    const chartRef = useRef(null);
    //MIGHT NEEDED IN FUTURE.
    // useEffect(() => {
    //     if (chartRef.current) {
    //         const { props: { series = [], options = {} } } = chartRef.current
    //         setState({
    //             ...state,
    //             legendData: series,
    //             legendColor: options.colors,
    //             legendLabels: series.map(s => s.name)
    //         })
    //     }
    //     if (updatedChart) 
    //         chartRef.current.chart.updateOptions(options)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [chartRef, updatedChart])

    const highLightRow = (label) => {
        return state.selectedRows.includes(label);
    }


    return (
        <>
            <div className="relative">
                {title && <div className={`absolute flex w-full border-b border-b-[#4c4f51] pb-1 ${titleClass} `}>
                    <div className="flex items-center ml-3 w-full mb-2">
                        {titleIcon && <div className="flex">  {titleIcon} </div>}
                        <span className={`ml-2 ${titleClass}`}> {title} </span>
                    </div>
                </div>}
                {dateFilter && <div className={`absolute flex w-full border-b border-b-[#4c4f51] pb-1 ${titleClass} `}>
                    <div className="flex items-center ml-3 w-full mb-2">
                        {dateFilter && <div className="flex">  {dateFilter} </div>}
                    </div>
                </div>}
                <div className={chartOffsetClass}>
                    <ReactApexChart
                        options={options}
                        series={series}
                        type={type}
                        ref={ref => chartRef.current = ref}
                        height={height}
                    />
                </div>
                {showCustomLegendTable && <div className="legend">
                    <div className="table-haeder">
                        <span style={{ visibility: 'hidden' }} className="dot"></span>
                        {legendHeader.map((header, index) =>
                            <div key={index} className={`font-RakutenSemibold header-heading ${index === 0 ? 'w-[85%]' : 'w-[15%] text-end'}`}>  {header}  </div>
                        )}
                    </div>
                    <div className="table-body" style={{ justicyContent: state.legendData.length ? 'center' : 'flex-start' }}>
                        {!state.legendData.length ? <div className="no-data"> No data </div>
                            :
                            <>
                                {state.legendData.map((row, index) => {
                                    let highlight = highLightRow(row.name);
                                    return (
                                        <div
                                            className="table_row relative font-RakutenLight"
                                            key={index}
                                            onClick={() => setState(globalLegendClick(state, chartRef, row.name))}
                                            onMouseEnter={() => (!state.selectedRows.length || highlight) ? globalLegendHover(chartRef, state.legendLabels, 'enter', index) : null}
                                            onMouseLeave={() => (!state.selectedRows.length || highlight) ? globalLegendHover(chartRef, state.legendLabels, 'leave', index) : null}
                                        >
                                            <span className="dot" style={{ backgroundColor: state.legendColor[index] }}> </span>
                                            <div className={'flex w-full overflow-row ' + (highlight && 'highlight')}>
                                                <div className={`absolute left-4 text-transparent ${highlight ? 'highlight' : 'bg-[#363748]'}`} style={{ width: `${(((Number(row.avg) / 100) * 85) / 100) * 85}%` }}> . </div>
                                                <div className="relative w-[85%] table_name"> {row.name} </div>
                                                <div className="w-[15%] text-end"> {row.avg} </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        }
                    </div>
                </div>}
                {customLegendTemplate}
            </div>
        </>
    )
}
export default LineChart;