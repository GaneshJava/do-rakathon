import React from "react";
import { confiTableMonitor } from "../reducers";
import '../../monitors/monitors.css';
import nextIcon from '../../../assets/next.svg';
import { FIELD_HEALTH } from "_DO-1.0/reducers";
import classNames from "classnames";

const SelectConfiguration = (props) => {
    return (
        <div className="py-7 px-5 border border-quaternaryTextColor shadow-md shadow-[#141414] overflow-y-scroll">
            {(confiTableMonitor?.[props.monitorType || 'table']).map(item =>
                <div key={`monitortag-${item.key}`} className="my-4 flex flex-col">
                    <div className="border-2 border-quaternaryBgColor rounded-lg p-4 flex flex-col gap-1">
                        <div className="flex justify-center ">
                            <img src={item.imgSrc} alt="" className="" />
                        </div>
                        <div className="flex flex-col pt-3">
                            <span className="">
                                {item.name}
                            </span>
                            <p className=" text-quaternaryTextColor">
                                {item.description}
                            </p>
                        </div>
                        <div onClick={() => item.key !== FIELD_HEALTH ? props.onSelectMonitor(item.key) : null} className={classNames(
                            "w-[18rem] flex items-center py-2 gap-2 font-medium text-[#F79009] font-RakutenRegular",
                            item.key !== FIELD_HEALTH && "hover:underline hover:opacity-80",
                            item.key === FIELD_HEALTH ? 'cursor-not-allowed' : 'cursor-pointer'
                        )} >
                            {item.btnLabel}
                            <img src={nextIcon} alt="" />
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default React.memo(SelectConfiguration);