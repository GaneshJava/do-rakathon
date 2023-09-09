
const DistributionCard = ({ card = {}, activeNodeObj = {}}) => {
    return (
      <div className=" bg-[#1F2022] basis-[47%] h-[400px] rounded-lg py-5">
        <span className="px-5 text-lg font-RakutenRegular">{card.label}</span>
        <div className="bg-[#808080] h-[1px] basis-[25%] mt-5"></div>
        <div className="flex flex-row justify-around p-5">
          <div className=" flex flex-col  ">
            <p className="text-xl font-RakutenRegular text-[#FFFFFF99]">{card.overall}</p>
            <p className="text-3xl font-RakutenSansUISemiBold mt-4 flex justify-center">
              {card.totalAnomalyCount || 0}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-xl font-RakutenRegular text-[#FFFFFF99]">{card.unique}</p>
            <p className="text-3xl font-RakutenSansUISemiBold mt-4 flex justify-center ">
              {card.totalAnomalyCount || 0}
            </p>
          </div>
        </div>
        <div className="bg-[#808080] h-[1px] basis-[25%] mt-5 mx-4"></div>
        <div className="mt-8">
          <p className="px-6 my-2 font-RakutenRegular text-[#FFFFFF99]">{card.recurring}</p>
          <div className="flex flex-col gap-1 text-base font-RakutenRegular px-7">
            <p> <span className="opacity-50 inline-block w-[5.2rem]"> Database: </span> <span>{card.mostRecurringDatabase}</span> </p>
            <p> <span className="opacity-50 inline-block w-[5.2rem]"> Table: </span> <span> {card.mostRecurringTable}</span> </p>
            <p> <span className="opacity-50 inline-block w-[5.2rem]"> Column: </span> <span> {card.mostRecurringColumn}</span> </p>
          </div>
        </div>
      </div>
    );
};

export default DistributionCard;