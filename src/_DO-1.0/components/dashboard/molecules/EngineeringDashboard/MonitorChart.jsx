/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Chart from "components/charts";
import { Spinner } from "core-modules/Loader";
import classNames from "classnames";
import MonitorReport from "./MonitorReport";
import { useDispatch } from "react-redux";
import { fetchDashboardEventsData } from "store";
import { constructChartData } from "_DO-1.0/components/anomaliesView/reducers/chartReducer";

const MonitorChart = ({ section, dateRange, user }) => {
    const eventType = section.type;
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false)
    const [state, setState] = useState({
        chartOptions: {},
        chartData: [],
        anomaliesCount: '',
    })

    useEffect(() => {
        getDataHealthData();
    }, [dateRange])

    const getDataHealthData = async () => {
        setLoaded(false);
        let stateObj = { ...state };
        const response = await dispatch(fetchDashboardEventsData({
            tenantId: user.tenantId,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            eventType
        })).unwrap();
        console.log(`Dashboard event api response ${section.type}`, response);
        let constructedData = {};
        if (response.status === 200) {
            stateObj['anomaliesCount'] = response?.data?.total_count ?? 0;
            constructedData = constructChartData(dateRange.startDate, dateRange.endDate, response?.data || [], 'dataHealth');
        } else {
            constructedData = constructChartData(dateRange.startDate, dateRange.endDate, [], 'dataHealth');
        }
        console.log(constructedData);
        stateObj['chartData'] = constructedData.series || [];
        stateObj['chartOptions'] = constructedData.chartOptions || {};
        setState(stateObj)
        setLoaded(true)
    }

    return (
        <div className={classNames(
            'flex flex-col',
            'bg-secondaryBgColor',
            'border border-2 border-quaternaryBgColor',
            'rounded-[16px]',
            'hover:shadow-xl',
            'w-[31.5%]',
            'transition duration-150 ease-out hover:ease-in',
            'apexchart-parent-div_datahealth_'
        )}>
            {loaded === true ?
                <>
                    <Chart
                        type='bar'
                        options={state.chartOptions}
                        series={state.chartData}
                        showCustomLegendTable={false}
                        showCustomLegend={false}
                        height="325px"
                        titleIcon=""
                        titleClass="font-RakutenRegular"
                        chartOffsetClass="pl-3 pr-0 -ml-1 -mt-2"
                    />
                    <MonitorReport section={section} anomaliesCount={state.anomaliesCount} />
                </>
                : <div className="flex w-full justify-center items-center h-[420px]">
                    <Spinner customStyles={{ borderLeftColor: '#262729' }} />
                </div>
            }
        </div>
    )
}
export default React.memo(MonitorChart);