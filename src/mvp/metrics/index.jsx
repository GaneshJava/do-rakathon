/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useLocation } from "react-router-dom";
import MetricsHeader from "./molecules/MetricsHeader";
import DataSourceTree from "mvp/sharedComponents/DataSoureTree";
import ManageMatrics from "./molecules/ManageMatrics";

const ComponentObj = {
    manageMetrics: <ManageMatrics />
}


const MetricsIndex = () => {
    const location = useLocation();
    const { component } = location.state || {};
    return (
        <div className="relative w-full flex min-h-[80vh] -m-4">
            <div className="w-[20%] bg-[#262729] fixed min-h-screen overflow-scroll">
                <DataSourceTree comingFrom="metrics" navlink="data-quality" />
            </div>
            <div className="basis-[22%] bg-[#262729] invisible"></div>
            <div className="basis-[78%]">
                {ComponentObj[component] ||  <MetricsHeader />}
            </div>
        </div>
    );
}

export default MetricsIndex;