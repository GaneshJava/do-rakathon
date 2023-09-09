import { configureStore } from '@reduxjs/toolkit';
import { userAuthReducer } from './slices/authSlice';
import { addServiceReducer } from './slices/addServiceSlice';
import { navbarReducer } from './slices/navbarSlice';
import { dashboardTreeReducer, matricsTreeReducer, connectionTreeReducer } from './slices/TreeMenuSlice';
import { dashboardReducer } from './slices/dashboardSlice';
import { metricReducer } from './slices/metricSlice';
import { anomalyReducer } from './slices/AnomalySlice';
import { monitorReducer } from './slices/monitorSlice';

export const store = configureStore({
  reducer: {
    auth: userAuthReducer,
    addService: addServiceReducer,
    navbar: navbarReducer,
    dashboardTree: dashboardTreeReducer,
    metricsTree: matricsTreeReducer,
    connectionTree: connectionTreeReducer,
    dashboardState: dashboardReducer,
    masterRules: metricReducer,
    
    //DO-1.0 related code
    anomalyState: anomalyReducer,
    monitorState: monitorReducer,
  }
});

export * from './slices/addServiceSlice';
export * from './slices/authSlice';
export * from './slices/navbarSlice';
export * from './slices/TreeMenuSlice';
export * from './slices/dashboardSlice';
export * from './slices/metricSlice';
export * from './slices/emailSlice';
//DO-1.0 related code
export * from './slices/AnomalySlice';
export * from './slices/monitorSlice';
export * from './slices/pipelineSlice';
export * from './slices/dataHealthSlice';
export * from './slices/matillionSlice';