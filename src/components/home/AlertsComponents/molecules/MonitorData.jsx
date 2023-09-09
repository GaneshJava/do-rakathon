import React from "react";

const styleObj = {
    borderRadius: '8px',
    backgroundImage: 'linear-gradient(to top, #757f9a, #d7dde8)',
}

const MonitorData = () => {
    return (
        <div className="p-6" style={styleObj}>
            <p className="font-RakutenSansUISemiBold text-[#583812]"> Monitored data </p>
            <div className="flex my-5 items-center justify-around">
                <div className="text-center"> 
                    <p className="font-RakutenBold text-2xl text-[#583812]"> 20 </p> 
                    <span className="font-RakutenRegular text-[#583812]">  Total data tables </span>
                </div>
                <div className="h-16 border-r-2 border-[#583812]">  </div>
                <div className="text-center">
                    <p className="font-RakutenBold text-2xl text-[#583812]"> 02 </p>
                    <span className="font-RakutenRegular text-[#583812]"> Total pipelines  </span>
                </div>
            </div>
        </div>
    )
}
export default MonitorData;