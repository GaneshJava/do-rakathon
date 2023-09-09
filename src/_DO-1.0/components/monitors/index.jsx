import React from "react";
import AssetListOverview from "./molecules/AssetListOverview";
import './monitors.css';
const MonitorIndex = () => {
    return (
        <div className="monitor-listing-overview">
            <AssetListOverview />
        </div>
    );
}
export default React.memo(MonitorIndex);