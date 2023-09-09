import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { globalLegendClickDonut, globalLegendHover } from "../constants";


const BarChart = ({
    options,
    series,
    type,
    height = '460px',
    showCustomLegend = true,
    title,
    titleClass = 'font-RakutenSansUISemiBold',
    legendHeader = ['Table', 'value'],
    titleIcon = '',
    chartOffsetClass = 'py-1 pl-3 pr-1',
    customLegendTemplate
}) => {
    const [state, setState] = useState({
        legendData: [],
        legendColor: [],
        selectedRows: [],
        legendLabels: [],
    })
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const { props: { series = [], options = {} } } = chartRef.current
            setState({
                ...state,
                legendData: series,
                legendColor: options.colors,
                legendLabels: series.map(s => s.name)   
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartRef])

    const highLightRow = (label) => {
        return state.selectedRows.includes(label);
    }

    return (
        <>
            <div className="relative w-full">
                {title && <div className={`absolute flex w-full border-b border-b-[#4c4f51] pb-1 ${titleClass} `}>
                    <div className="flex items-center ml-3 w-full mb-2">
                        {titleIcon && <div className="border border-0 rounded-full bg-[#434343] p-[0.3rem]">
                            <img src={titleIcon} alt="" width="20px" height="20px" />
                        </div>}
                        <span className={`ml-2 ${titleClass}`}> {title} </span>
                    </div>
                </div>}
                {showCustomLegend &&
                    <div className="flex top-10 left-10 z-10 absolute font-RakutenRegular text-[#959595] w-[50%] justify-between my-3" style={{ justicyContent: state.legendData.length ? 'center' : 'flex-start' }}>
                        {!state.legendData.length ? <div className="no-data"> No data </div>
                            :
                            <>
                                <div className="flex flex-col">
                                    <div className="flex cursor-pointer">
                                        <span className="dot" style={{ backgroundColor: '#dae1f7' }}> </span>
                                        <div className={''}> Total </div>
                                    </div>
                                    <div className="flex mt-1 gap-2 pl-5 items-baseline">
                                        <div className="font-RakutenBold font-bold text-xl text-[#fff]">
                                            {state.legendData.reduce((a, b) => a.sum + b.sum )}
                                        </div>
                                        <span className="font-RakutenRegular text-sm"> Tables </span>
                                    </div>
                                </div>
                                {state.legendData.map((row, index) => {
                                    let highlight = highLightRow(row.name);
                                    return (
                                        <div key={index} className="flex flex-col">
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
                                            <div className="flex mt-1 gap-2 pl-5 items-baseline">
                                                <div className="font-RakutenBold font-bold text-xl text-[#fff]">
                                                    {row.sum}
                                                </div>
                                                <span className="font-RakutenRegular text-sm"> Tables </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        }
                    </div>
                }
                <div id="hehe" className={chartOffsetClass}>
                    <ReactApexChart
                        options={options}
                        series={series}
                        type={type}
                        height={height}
                        ref={ref => chartRef.current = ref}
                    />
                </div>
                {customLegendTemplate}
            </div>
        </>
    )
}

export default BarChart;