import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TableTabs as tabs } from '../constants';
import Chart from 'components/charts';
import { TableCharts } from '../constants';
import {recentAlerts} from '../constants';

const TableOverview = () => {
  const location = useLocation();

  const [state, setState] = useState({
    activeTab: 'overview',
    tableBasisData: location?.state
  });

  const handleTabChange = ({ target: { id } }) => {
    setState({ ...state, activeTab: id });
  };

  const styleObj = {
    borderRadius: '8px',
    backgroundImage: 'linear-gradient(to top, #243b55, #757f9a)'
  };

  const getTableTabbs = () => {
    return (
      <div className="font-RakutenSansUISemiBold w-full text-sm">
        <ul className="flex flex-row bg-[#2d3032] gap-8 w-[50%]">
          {tabs.map((tab) => (
            <li key={tab.key} className="">
              <p
                id={tab.key}
                onClick={handleTabChange}
                className={`cursor-pointer inline-block pt-4 pb-2 border-b-2 rounded-t-lg hover:border-[#f59600] ${
                  state.activeTab === tab.key
                    ? 'text-[#f59600] border-[#f59600]'
                    : 'border-transparent'
                }`}>
                {tab.name}
              </p>
            </li>
          ))}
        </ul>
        <div className="h-[1px] w-full bg-[#676767] -mt-[0.1rem]"></div>
      </div>
    );
  };

  const getTableCharts = () => {
    return (
      <div className="flex gap-3 w-full text-white grid grid-cols-2 gap-2 chart-card">
        {TableCharts.map((chart) => (
          <div
            id={chart.id}
            key={chart.id}
            style={{
              padding: '13.5px 0px 20.6px 0px',
              borderRadius: '12px',
              boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
              backgroundColor: '#0d0d0d'
            }}>
            <Chart
              title={chart.name}
              type={chart.type}
              options={chart.options}
              series={chart.series}
              showCustomLegendTable={false}
              height="315rem"
              titleIcon={chart.titleIcon}
            />
          </div>
        ))}
      </div>
    );
  };

  const recentAlertsJsx = () => {
    let overviewCode = recentAlerts.map((alert, index) => {
      return (
        <div className="flex justify-between border-b border-[#2d3032]" key={index}>
          <div className='flex flex-row gap-3'>
            <div className="my-4">
              <img src={alert.icon} alt="?" className='w-7 h-7 px-[0.4rem] bg-[#434343] rounded-full'/>
            </div>
            <div className='my-3'>
            <div className='font-RakutenSansUI text-[#9a9a9a] text-sm'>
              {alert.time} . {alert.category}
            </div>
            <div className='font-RakutenSansUI text-sm'>{alert.quality}</div>
          </div>
          </div>
          <div className='py-5 cursor-pointer'>
            <img src={alert.options} alt="?"/>
          </div>



        </div>
      );
    }); 
    return overviewCode;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex">{getTableTabbs()}</div>
      <div className="flex gap-4 mt-2 items-start">
        <div className="flex basis-[85%]">{getTableCharts()}</div>
        <div className="flex basis-[20%] flex flex-col">
          <div className=' flex flex-row gap-4'>
            <div className='p-5 w-[9rem] h-[8rem]' style={styleObj}>
            <p className="font-RakutenSansUISemiBold text-sm text-white">Total columns </p>
            <div>
              <p className="font-RakutenBold text-3xl text-white pt-4"> 20 </p>
            </div>
            </div>
          
          <div className="p-5 w-[9rem] h-[8rem]" style={styleObj}>
            <p className="font-RakutenSansUISemiBold text-sm text-white">Total alerts </p>
            <div>
              <p className="font-RakutenBold text-3xl text-white pt-4"> 132 </p>
            </div>
          </div>
          </div>
          <div className="bg-[#0d0d0d] my-3 p-4 rounded-md ">
            <div>
            <p className="font-RakutenSansUISemiBold text-sm text-white border-b border-[#2d3032] pb-4">Recent alerts </p>
 <div className="text-[#fff] mt-3 mb-3">{recentAlertsJsx()}</div>
            </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default TableOverview;
