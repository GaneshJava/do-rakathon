import Input from 'core-modules/Input';
import React from 'react';
import searchIcon from 'assets/images/searchIcon.svg';
import settingsIcon from 'assets/images/settingsIcon.svg';

const SearchCatalog = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row mt-2 mb-3 ">
        <Input
          customClass="bg-[#1e2021] w-[84%] rounded-r-none rounded border-[#676767]"
          placeholder="Search catalog"
        />
        <div className="bg-[#f19300] h-[2.35rem] w-[2.6rem] rounded-l-none rounded mt-1 cursor-pointer">
          <img src={searchIcon} alt="searchIcon" className="pt-[0.2rem] pl-[0.1rem]" />
        </div>
        <div className="mt-1 ml-5 flex flex-row bg-[#f59600] h-[2.3rem] rounded cursor-pointer w-[12%]">
          <img src={settingsIcon} alt="settingsIcon" className="pl-4 py-[0.6rem] " />
          <button className="px-2 pr-4 text-black"> Configure Services </button>
        </div>
      </div>
      <div className="h-[1px] w-full bg-[#676767] mt-3"></div>
    </div>
  );
};

export default SearchCatalog;
