import React from "react";
import Chart from "components/charts";
import { catalogTableConfigureChatData } from "../constants";

const TablesConfigured = () => {
    let chartData = catalogTableConfigureChatData();
    return (
            <div className="w-full" id={chartData.id} key={chartData.id} style={{
                padding: '13.5px 0px 20.6px 0px',
                borderRadius: '12px',
                boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
                backgroundColor: '#151515',
                height: '23rem'
            }} 
            >
                <Chart
                    title={chartData.name}
                    type={chartData.type}
                    options={chartData.options}
                    series={chartData.series}
                    showCustomLegendTable={false}
                    height="240rem"
                />
            </div>
    )
}

export default TablesConfigured;