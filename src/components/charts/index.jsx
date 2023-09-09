import React from "react";
import { chartTypes } from "./constants";
import LineChart from "./molecules/LineChart";
import DonutChart from "./molecules/DonutChart";
import BarChart from "./molecules/BarChart";
import './charts.css';

const { 
    LINE, 
    DONUT,
    BAR,
    AREA
} = chartTypes || {};

const ChartBox = {
    [LINE]: (props) => <LineChart {...props} />,
    [AREA]: (props) => <LineChart {...props} />,
    [DONUT]: (props) => <DonutChart {...props} />,
    [BAR]: (props) => <BarChart {...props} />,
}


const Chart = (props) => {
    let chartType = props.type;
    return  <>  
        {
            ChartBox[chartType] ?.(props) || <> Chart type not exists </>
        } 
     </>
}

export default React.memo(Chart);
