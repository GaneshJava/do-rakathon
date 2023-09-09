import React from "react";
import AlertCount from "./molecules/Count";
import MonitorData from "./molecules/MonitorData";
import AlertOverview from "./molecules/Overview";
import './alerts.css';

const AlertComponent = () => {
    return (
        <div className="flex gap-2 flex-col w-full h-min-screen mb-8">
            <div> <MonitorData /> </div>
            <div> <AlertCount /> </div>
            <div> <AlertOverview /> </div>
        </div>
    );
}

export default AlertComponent;