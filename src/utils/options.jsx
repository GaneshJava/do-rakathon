import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "1_hour",
      handler: props.actionProvider.anomalyresult_1,
      id: 1,
    },
    { text: "24_hour", handler: () => {},handler: props.actionProvider.anomalyresult_2, id: 2 },
    { text: "7_days", handler: () => {},handler: props.actionProvider.anomalyresult_3, id: 3 },
    { text: "30_days", handler: () => {},handler: props.actionProvider.anomalyresult_4, id: 4 }
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
