import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import './charts.css';

const LOW_OPACITY = 0.2;
const HIGH_OPACITY = 1;

const ChartBuilder = ({
  options,
  series,
  type,
  height = '460px',
  legendData = [],
  showCustomLegendTable = false,
  legendHeader = ['Table', 'value']
}) => {
  const [state, setState] = useState({
    legendData: [],
    legendColor: [],
    selectedRows: [],
    series: [],
  })
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const { props: { series = [], options = {} } } = chartRef.current
      setState({
        ...state,
        legendData: series,
        legendColor: options.colors,
        series: series.map(s => s.name)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef])

  const highLightRow = (label) => {
    return state.selectedRows.includes(label);
  }

  const handleLegendClick = ({ name }) => {
    let selectedRows = [...state.selectedRows];
    if (selectedRows.length && selectedRows.includes(name)) {
      selectedRows.splice(selectedRows.indexOf(name), 1);
    } else {
      selectedRows.push(name);
    }
    state.series.map(seriesName => {
      if (selectedRows.length) {
        selectedRows.includes(seriesName) ?
          chartRef.current.chart.showSeries(seriesName) :
          chartRef.current.chart.hideSeries(seriesName)
      } else chartRef.current.chart.showSeries(seriesName)
      return true;
    });
    setState({ ...state, selectedRows });
  }

  const hoverOnLegend = (event, index, { name: seriesName }) => {
    let opacity = [];
    if (event === 'enter') {
      opacity = toggleHighlightSeries(LOW_OPACITY);
      opacity[index] = HIGH_OPACITY;
    } else {
      opacity = toggleHighlightSeries(HIGH_OPACITY)
    }
    chartRef.current.chart.updateOptions({ fill: { opacity } });
  }

  const toggleHighlightSeries = (val) => {
    let temp = [];
    state.series.map((s, index) => { temp[index] = val; return true })
    return temp;
  }

  return (
    <>
      <div className="relative">
        <div className="py-1 px-3">
          <ReactApexChart
            options={options}
            series={series}
            type={type}
            height={height}
            ref={ref => chartRef.current = ref}
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
                      onClick={() => handleLegendClick(row)}
                      onMouseEnter={() => (!state.selectedRows.length || highlight) ? hoverOnLegend('enter', index, row) : null}
                      onMouseLeave={() => (!state.selectedRows.length || highlight) ? hoverOnLegend('leave', index, row) : null}
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
      </div>
    </>
  )
}
export default ChartBuilder;