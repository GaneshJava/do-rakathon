import React from "react";
import { monitorsChartsData } from "../../reducers";
import MonitorChart from "./MonitorChart";

const Monitors = ({ dateRange, user }) => {
    return <>
        <div className="my-8">
            <label className="mx-10 text-lg font-RakutenSemibold"> MONITORS </label>
            <div className="mx-5 mt-8 flex gap-6 flex-wrap">
                {monitorsChartsData.map(eachItem =>
                    <MonitorChart
                        key={eachItem.key}
                        section={eachItem}
                        dateRange={dateRange}
                        user={user}
                    />
                )}
            </div>
        </div>

    </>
}

export default React.memo(Monitors);