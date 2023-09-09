// in MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const lowercase_msg = message.toLowerCase();
    console.log("lowercase_msg ===", lowercase_msg)
    if (lowercase_msg.includes('hello') || lowercase_msg.includes('hi')|| lowercase_msg.includes('howdy')) {
      actions.handleHello();
    }
    if (lowercase_msg.includes("details") || lowercase_msg.includes('detail')  || lowercase_msg.includes('complete') || lowercase_msg.includes('more') ) {
      return actions.handleConfigDocs();
    }

    if (lowercase_msg.includes("anomaly") || lowercase_msg.includes("issues") || lowercase_msg.includes('howerrorsdy')|| lowercase_msg.includes("alerts") || lowercase_msg.includes('anomalies')) {
      actions.anomalydetails();
    }
    if (lowercase_msg.includes("1_hour") || lowercase_msg.includes("24_hour") ||
      lowercase_msg.includes("7_days") || lowercase_msg.includes("30_days")) {
      actions.anomalyresult();
      return actions.handleConfigDocs();
    }

  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;