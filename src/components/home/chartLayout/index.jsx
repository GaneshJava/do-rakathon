import React from "react";
import { observabilityChartsConfig } from "./dataConfig";
import Chart from "components/charts";

const ChartLayout = () => {
    return (
        <div className="w-full text-white grid grid-cols-2 gap-2 chart-card">
            {observabilityChartsConfig.map(chart =>
                <div id={chart.id} key={chart.id} style={{
                    padding: '13.5px 0px 20.6px 0px',
                    borderRadius: '12px',
                    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
                    backgroundColor: '#0d0d0d',
                }}>
                    <Chart
                        title={chart.name}
                        type={chart.type}
                        options={chart.options}
                        series={chart.series}
                        showCustomLegendTable={true}
                        height="275rem"
                        titleIcon={chart.titleIcon}
                    />
                </div>
            )}
        </div >
    )
}

export default ChartLayout;