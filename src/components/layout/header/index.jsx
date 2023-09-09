import React, { useState } from 'react';
import homeicon from 'assets/images/home_icon.svg';
import alerticon from 'assets/images/alerts_topnav.svg';
import catologicon from 'assets/images/catolog_topnav.svg';
import queryicon from 'assets/images/question_topnav.svg';
import refreshicon from 'assets/images/refresh_topnav.svg';
import calendaricon from 'assets/images/calendar_topnav.svg';
import { calendarOptions, refreshOptions } from './constants';
import { useLocation } from 'react-router-dom';
import LabelField from 'core-modules/LabelField';

const Header = () => {
  const location = useLocation();
  const breadcumbsPath = location.pathname.split('/').filter(Boolean);

  const [state, setState] = useState({
    showMenu: false,
    showCalendar: false
  });
  const handleClick = () => {
    setState({
      ...state,
      showMenu: !state.showMenu,
      showCalendar: !state.showMenu ? false : state.showCalendar
    });
  };
  const handleClickCalendar = () => {
    setState({
      ...state,
      showCalendar: !state.showCalendar,
      showMenu: !state.showCalendar ? false : state.showMenu
    });
  };
  return (
    <section className="gap-6">
      <div className={`flex flex-row items-center h-12 min-w-screen w-full px-4 topnav mr-8`}>
        <div className="flex gap-2 basis-[75%]">
          <span className="font-RakutenSemibold text-xl	"> Rakuten SixthSense </span>
          <span className="font-RakutenRegular text-xl"> Data Observability </span>
        </div>

        <div className="flex gap-8 justify-end w-full items-center">
          <div>
            <button
              className=" bg-[#f59502] focus:ring-1 focus:ring-[#f59502] rounded-lg px-4 py-2.5 inline-flex items-center relative"
              type="button"
              data-dropdown-toggle="dropdown">
              <img src={refreshicon} alt="?" className="pr-3" />
              <svg
                className="w-4 h-4 ml-2"
                fill="block"
                stroke="black"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg" onClick={handleClick}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div>
              {state.showMenu && (
                <div className="absolute z-40 w-[5.3rem] py-1 px-0 text-left bg-black top-12 border border-[#f59502] rounded shadow font-RakutenLight">
                  <ul className="leading-loose px-2">
                    {refreshOptions.map((option) => (
                      <li className="cursor-pointer hover:text-[#f59502]"> {option.name} </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="-ml-[10px]">
            <button
              className=" bg-[#000] focus:ring-1 focus:ring-[#f59502] rounded-lg py-[0.3rem] inline-flex items-center"
              type="button"
              onClick={handleClickCalendar}
              data-dropdown-toggle="dropdown">
              <img src={calendaricon} alt="?" className=" pl-3" />
              <LabelField className='bg-[#575757] mx-[1.1rem] rounded-3xl' title={'5 mins'} customStyle={{ padding: '0.25rem 1.5rem' }} />
            </button>
            <div>
              {state.showCalendar && (
                <div className="absolute z-40 w-[9.4rem] py-1 px-0 text-left bg-black top-12 border border-[#f59502] rounded shadow font-RakutenLight">
                  <ul className="leading-10 px-4 ">
                    {calendarOptions.map((option) => (
                      <li className="cursor-pointer hover:text-[#f59502]">{option.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#808080] h-[25px] w-[1px] flex"></div>
          <div>
            <img src={alerticon} alt="?" className='cursor-pointer' />
          </div>
          <div>
            <img src={catologicon} alt="?" className='cursor-pointer' />
          </div>
          <div>
            <img src={queryicon} alt="?" className='cursor-pointer' />
          </div>
          <div className="flex flex-row rounded bg-[#f59600] w-8 h-8 px-[0.25rem] py-[0.25rem] text-black font-RakutenSemibold cursor-pointer">
            HK
          </div>
        </div>
      </div>
      <div >
        <div className="flex flex-row h-14 gap-3 bg-[#1a1a1a] py-3 px-4 ">
          <div className="rounded bg-[#f59600] w-8 h-8 items-center p-[0.6rem] ">
            <img src={homeicon} alt="?" />
          </div>
          <div className="font-RakutenSansUI py-1"> {breadcumbsPath.length ?
            breadcumbsPath[0].charAt(0).toUpperCase() + breadcumbsPath[0].slice(1)
            : 'Home'
          } </div>
        </div>
      </div>
    </section>
  );
};
export default Header;
