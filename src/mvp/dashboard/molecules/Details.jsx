import React from "react";
import GlobalFiltersPart from "./GlobalFilters";
import VolumeSchemaDistribution from "./VolumeSchemaDistribution";

const DashboardDetails = () => {
    return (
        <div className="flex flex-col justify-between  mx-5 pb-10">
            <div className="">
                <GlobalFiltersPart />
            </div>
            <div className="">
                <VolumeSchemaDistribution />
            </div>
        </div>
    );
}

export default DashboardDetails;