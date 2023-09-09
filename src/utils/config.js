import { createChatBotMessage } from 'react-chatbot-kit';
import Options from "./options.jsx";
import Config from "./config.jsx";

const botName = 'DataBot';
const config = {
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}`)
    ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
        widgetName: "config",
        widgetFunc: (props) => <Config {...props} />,
        mapStateToProps: ["gist", "infoBox"],
    }
  ]
};

export default config;