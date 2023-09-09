import React, { useState } from "react";
import DataSourceTree from "../../mvp/sharedComponents/DataSoureTree";
import DataOverview from "./molecules/DataOverview";
import { dataSourceTabs as tabs } from "./constants";
import './dataSource.css';


const DataSourceIndex = () => {
  const [state, setState] = useState({
    activeTab: 'metrics',
  });

  const handleTabChange = ({ target: { id } }) => {
    setState({ ...state, activeTab: id });
  };

  const getTableTabbs = () => {
    return (
      <div className="font-RakutenLight w-full pl-11">
        <ul className="flex flex-row gap-10 w-[50%]">
          {tabs.map((tab) => (
            <li key={tab.key} className="">
              <p
                id={tab.key}
                onClick={handleTabChange}
                className={`cursor-pointer inline-block pt-4 pb-2 border-b-[0.3rem] hover:border-[#f59600] rounded-sm ${state.activeTab === tab.key
                    ? 'text-[#f59600] border-[#f59600] rounded-sm'
                    : 'border-transparent'
                  } text-center w-28`}>
                {tab.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex bg-[#0a0a0a] -mx-4 -mt-4"> {getTableTabbs()} </div>
      <div className="data-source flex flex min-h-[78vh] gap-10">
        <div className="flex basis-[18%]  bg-[#191818] rounded-lg">
          <DataSourceTree />
        </div>
        <div className="flex basis-[82%] ">
          <DataOverview />
        </div>
      </div>
    </div>
  )
}

export default DataSourceIndex;