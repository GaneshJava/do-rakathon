import React from 'react';
import ownerIcon from '_DO-1.0/assets/collaborator.svg';
import emailIcon from '_DO-1.0/assets/email.svg';
import { ownerDetails } from '../reducers';

const InfoComponent = () => {
  return (
    <div className=" p-4 bg-[#18181B] rounded-lg">
      <span className="font-RakutenRegular text-base">Owner</span>
      <div className="flex ">
        <img src={ownerIcon} alt="bsxwsbbuj" className="w-[4rem] h-[4rem] pt-2" />

        <div className="flex flex-col p-3 font-RakutenRegular text-sm">
          <span className="text-[#F79009] ">{ownerDetails.name}</span>
          <span className="text-[#E5E5E5]">{ownerDetails.email}</span>
          <p className="text-[#737373]">
            Eng for Marketing & Sales data across APAC. Love surfing.
          </p>
        </div>
      </div>
      <div className="bg-[#737373] h-[0.5px] basis-[25%] my-5 flex flex-col"></div>
      <span className="text-base font-RakutenRegular ">Notifications</span>
      <div className=" flex flex-row gap-8 w-7 h-7 my-5 mx-3 cursor-pointer">
      <img src={emailIcon} alt="email icon"/>
      </div>
      <div className="bg-[#737373] h-[0.5px] basis-[25%] my-5"></div>
    </div>
  );
};

export default React.memo(InfoComponent);
