import {
    Routes,
    Route,
    Outlet
} from "react-router-dom";
import AnomaliesIndex from '_DO-1.0/components/anomaliesList';
import Details from '_DO-1.0/components/anomaliesView';
import DODashboardIndex from '_DO-1.0/components/dashboard';
// import Source from '_DO-1.0/components/source';
import ConnectionList from "_DO-1.0/components/source/molecules/ConnectionList";
import MonitorIndex from '_DO-1.0/components/monitors';
// import PipelineIndex from '_DO-1.0/components/airflowPipelines';
import MatillionJobs from "_DO-1.0/components/matillionJobs";
import './chat.css';

import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'

import config from './config.js';
import MessageParser from './MessageParser.js';
import ActionProvider from './ActionProvider.js';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route index element={<DODashboardIndex />} />
                <Route path="/do-dashboard" element={<DODashboardIndex />} />
                <Route path="/anomalies" element={<AnomaliesIndex />} />
                <Route path="/anomalies/details" element={<Details />} />
                <Route path="/data-source" element={<ConnectionList />} />
                <Route path="/monitors" element={<MonitorIndex />} />

                <Route path="/pipeline" element={<MatillionJobs />} />
                <Route path="/pipeline/runslist" element={<MatillionJobs />} />
                <Route path="/pipeline/execution" element={<MatillionJobs />} />
                <Route path="/chatbot" element={<MyComponent />} />
                <Route path="*" element={<> Page not found </>} />
            </Routes>
            <Outlet />
        </>
    )
}


const MyComponent = () => {
    return (
      <div>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    );
  };
export default AppRoutes;