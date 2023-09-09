import React, { useState } from 'react';
import { overviewAlert } from '../constants';

const AlertOverview = () => {
  const [state, setState] = useState({
    tabs: [
      {
        id: 1,
        name: 'Recent alerts',
        key: 'recent-alerts'
      },
      {
        id: 2,
        name: 'Alerts per table',
        key: 'alerts-per-table'
      }
    ],
    activeTab: 'recent-alerts'
  });

  const handleTabChange = ({ target: { id } }) => {
    setState({ ...state, activeTab: id });
  };

  const overviewJsx = () => {
    let overviewCode = overviewAlert.map((alert, index) => {
      return (
        <div className="flex gap-4" key={index}>
          <div className="my-4">
            <img src={alert.icon} alt="?" className='w-8 h-8 px-[0.4rem] bg-[#434343] rounded-full'/>
          </div>
          <div className='my-3'>
            <div className='font-RakutenSansUI text-[#9a9a9a] text-sm'>
              {alert.time} . {alert.category}
            </div>
            <div className='font-RakutenSansUI text-base'>{alert.tableName}</div>
          </div>
        </div>
      );
    });
    return overviewCode;
  };

  return (
    <div className="flex flex-col bg-[#171716] -mt-[0.5rem] rounded-b-lg">
      <div className="font-RakutenSansUI bg-[#2d3032]">
        <ul className="flex flex-row bg-[#262626]">
          {state.tabs.map((tab) => (
            <li key={tab.key} className="ml-5 basis-[35%]">
              <p
                id={tab.key}
                onClick={handleTabChange}
                className={`cursor-pointer inline-block pt-4 pb-2 border-b-2 rounded-t-lg hover:border-[#f59600] ${
                  state.activeTab === tab.key
                    ? 'text-[#f59600] border-[#f59600]'
                    : 'border-transparent'
                }`}>
                {' '}
                {tab.name}{' '}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="ml-3 mr-5 mb-1">
        <div className="text-[#fff] mt-5 mb-3">{overviewJsx()}</div>
        <div className="text-center cursor-pointer mb-1 pt-1 mr-6 border-t border-[#2d3032] text-[#f59600]">
          <span className="hover:border-b-2 hover:border-[#f59600] py-2"> View all alerts </span>
        </div>
      </div>
    </div>
  );
};

export default AlertOverview;
