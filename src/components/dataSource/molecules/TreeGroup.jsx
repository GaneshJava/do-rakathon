import React from "react";
import TreeItem from "./TreeItem";
import Input from "core-modules/Input";
import searchIcon from 'assets/images/searchIcon.svg';
import allDashboard from 'mvp/assets/all_dashboard.svg';

const TreeGroup = ({
    items,
    search,
    showSearch = true,
    handleNodeClick,
    state:{
        activeNode,
        activeNodeObj
    }
}) => {
    return (
        <div className="flex flex-col pl-2">
            <div className="flex flex-row w-[95%] px-2 my-3">
                {showSearch === true && <Input
                    handleChange={e => search(e.target.value)}
                    customClass="bg-[#1e2021] w-[84%] rounded-r-none rounded border-[#676767]"
                    placeholder="Search metric"
                />}
                <div className="bg-[#f19300] h-[2.35rem] w-[2.6rem] rounded-l-none rounded mt-1 cursor-pointer">
                    <img src={searchIcon} alt="searchIcon" className="pt-[0.2rem] pl-[0.1rem]" />
                </div>
            </div>
            <div className="m-1 flex gap-2 items-center cursor-pointer" onClick={() => handleNodeClick({allDatabases: 'allDatabases'})}>
                <img src={allDashboard} className="w-4 h-5" alt="All dashboard" />
                <span className={activeNode === 'allDatabases' ? 'text-common-color' : ''}> All Databases </span>
            </div>
            <div className="flex flex-col gap-2">
                {items.map(props => <TreeItem  {...props} activeNodeObj={activeNodeObj} />)}
            </div>
        </div>
    )
}

export default TreeGroup;