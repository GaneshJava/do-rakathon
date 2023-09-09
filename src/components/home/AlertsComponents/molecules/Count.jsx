import React from "react";
import { countDonutOptions as donutOptions} from "../constants";
import Charts from "components/charts";

const AlertCount = () => {
    const countDonutOptions = donutOptions({
        showBuiltInLegend: false, 
        showDataLabels:false,
        showTextInMiddle: false,
    });
    return (
        <div className="flex flex-col bg-[#000000] p-6 rounded-t-lg">
            <div>
                <Charts 
                    options={countDonutOptions}
                    series={countDonutOptions.series}
                    type="donut"
                    height="250px"
                    showCustomLegend = {true}
                    title="Alert count"
                    titleClass=""
                    showCustomTotalInMiddle = {true}
                    defaultLabelForTotal = "ALERTS"
                />
            </div>
        </div>
    );
}

export default AlertCount;