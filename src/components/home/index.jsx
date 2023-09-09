import React, { useState } from 'react';
import ChartLayout from './chartLayout';
import AlertComponent from './AlertsComponents';
// import Button from 'core-modules/Button';
// import { userLogout } from 'store';
// import { useDispatch } from 'react-redux';
import Serviceindex from './services';
import LabelField from 'core-modules/LabelField';

const HomeIndex = () => {
  const [state, setState] = useState({
    showTop: false
  });
  const handleClick = () => {
    setState({
      ...state,
      showTop: !state.showTop
    });
  };
  return (
    <div>
    <div className="mt-4">
       
      <div className="mt-4 gap-2 flex flex-row">
        <Serviceindex />
      </div>
      <div className="bg-[#4c4f51] h-[1.5px] my-2 w-[100%]"></div>
      </div>
      <div className="gap-1.5 flex flex-row ">
        <div>
          <LabelField
            title={'Most volatile data source'}
            mandotory={false}
            className="font-RakutenSemibold text-[16px] mt-[0.3rem]"
            customStyle={{ fontSize: '16px', color: '#c1c1c1' }}
          />
        </div>

        <div className="px-2 py-[0.4rem]">
          <button
            className=" bg-[#40392b] border border-[#f59502] w-[5rem] h-[2rem] items-center focus:ring-1 focus:ring-[#f59502] rounded-lg inline-flex px-2 text-xs"
            type="button"
            onClick={() => null}
            data-dropdown-toggle="dropdown">
              Top 5
              <svg
              className='w-4 ml-[0.7rem]'
                fill="#f59502"
                stroke="#f59502"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg" onClick={handleClick}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
        </div>
      </div>
      <div className="mt-2 gap-2 flex flex-row items-start">
        <div className="flex basis-[78%] flex-start">
          <ChartLayout />
        </div>
        <div className="flex basis-[22%]">
          <AlertComponent />
        </div>
      </div>
    </div>
  );
};

export default HomeIndex;
