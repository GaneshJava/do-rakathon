// in ActionProvider.jsx
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const anomalydetails = () => {
    const botMessage = createChatBotMessage('For what duration do you want anomaly?',
    {
      widget: "options",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleConfigDocs = () => {
    const botMessage = createChatBotMessage(
      " For me details, please click below: ",
      { widget: "config", withAvatar: true }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const anomalyresult_1 = () => {
    const botMessage = createChatBotMessage('No Anomaly in this duration ');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }
  const anomalyresult_2 = () => {
    const botMessage = createChatBotMessage('5 Anomaly in this duration. \n 2 Freshness(Major) \n 1Volume(Critical) \n 2 DQ Rule(Minor) ');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }
  const anomalyresult_3 = () => {
    const botMessage = createChatBotMessage('26 Anomaly in this duration . \n 12 Freshness(Major) \n 2Volume(Critical) \n 12 DQ Rule(Minor)');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }
  const anomalyresult_4 = () => {
    const botMessage = createChatBotMessage('105 Anomaly in this duration . \n 52 Freshness(Major) \n 20Volume(Critical) \n 33 DQ Rule(Minor)');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello, anomalydetails, anomalyresult_1, anomalyresult_2, anomalyresult_3, anomalyresult_4, handleConfigDocs
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;