import React from 'react';
import { dataCard } from '../constants';

const DataCard = () => {
  let datacardView = dataCard.map((alert, index) => {
    return (
      <div className="w-full bg-[#121212] h-28 rounded-lg px-5 pt-5" key={index}>
        <p className="text-sm font-RakutenLight">{alert.name}</p>
        <p className="text-2xl font-RakutenSansUISemiBold mt-4">{alert.value}</p>
      </div>
    );
  });
  return datacardView;
};

export default DataCard;
