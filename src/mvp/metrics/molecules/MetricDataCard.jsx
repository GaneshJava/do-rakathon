/* eslint-disable react-hooks/exhaustive-deps */
import { _DATABASE, _TABLE, _OVERALL, _COLUMN } from 'mvp/constants';
import { useState, useEffect } from 'react';
import { dataCard } from '../constants';

const MetricDataCard = ({ type, key }) => {
  const [state, setState] = useState({
    cards: [],
  })
  useEffect(() => {
    const label = type === _OVERALL ? 'Database' : type === _DATABASE ? 'Table' : type === _TABLE ? 'Column' : '';
    const cards = dataCard(label);
    if (type === _COLUMN)
      cards.splice(0, 1);
    setState({ ...state, cards })
  }, [key])


  const showCards = () => {
    return (
      state.cards.map((alert, index) => {
        return (
          <div className="w-full bg-[#1F2022] h-28 rounded-lg  pt-5 " key={index}>
            <p className="text-lg font-RakutenLight text-[#88898a] flex justify-center">
              {alert.name}
            </p>
            <p className="text-2xl font-RakutenSansUISemiBold mt-4 flex justify-center" id={alert.id}>{alert.value}</p>
          </div>
        );
      })
    );
  }

  return (
    <>
      {showCards()}
    </>
  );
};

export default MetricDataCard;
