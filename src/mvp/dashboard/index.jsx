import React from "react";
import DataSourceTree from "mvp/sharedComponents/DataSoureTree";
import DashboardDetails from "./molecules/Details";
import './dashboard.css';

const DashboardIndex = () => {
    return(
        <div className="relative w-full flex min-h-screen -m-4">
            <div className="w-[20%] bg-[#262729] fixed min-h-screen overflow-scroll">
                <DataSourceTree comingFrom="dashboard" navlink="dashboard" />
            </div>
            <div className="basis-[22%] bg-[#262729] invisible"></div>
            <div className="basis-[78%]">
                <DashboardDetails />
            </div>
        </div>
    );
}

export default DashboardIndex;