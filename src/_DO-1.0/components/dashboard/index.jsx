import React from "react";
import EngineeringDashboard from "./molecules/EngineeringDashboard";
import './dashboard.css'
const DashboardIndex = () => {
    return (
        <div>
            <EngineeringDashboard />
        </div>
    )
}

export default React.memo(DashboardIndex);