import { createSlice } from '@reduxjs/toolkit';
import { addDays } from 'date-fns';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CONNECTIONS_TREE } from 'api/constants';
import { apiService } from 'api';
import { __response } from 'api/apiHelper';

const initialState = {
    activeNode: 'allDatabases',
    openNodes: [],
    activeNodeObj: {
        key: 'allDatabases', 
        id: 'allDatabases',
        label: 'All Databases',
        type: 'OVERALL',
    },
    globalDateRange: [
        {
          startDate: addDays(new Date(), -6).toISOString(),
          endDate: new Date().toISOString(),
          key: 'selection'
        }
      ]
}

const reducerCallBackObject = {
    updateNodes: (state, action) => {
        const { activeNode, openNodes, activeNodeObj, allDatabases } = action.payload;                
        state.activeNode = allDatabases || activeNode;
        state.openNodes = openNodes;
        state.activeNodeObj = allDatabases ? initialState.activeNodeObj : activeNodeObj;
    },
    updateGlobalDateRange: (state, action) => {
        state.globalDateRange = action.payload;
    }
}

const dashboardTreeSlice = createSlice({
    name: 'dashboardTree',
    initialState: initialState,
    reducers: reducerCallBackObject,
})

const matricsTreeSlice = createSlice({
    name: 'metricsTree',
    initialState: initialState,
    reducers: reducerCallBackObject,
})

const connectionTreeSlice = createSlice({
    name: 'connecttionTree',
    initialState: { treeArray: [], loaded: false },
    reducers: {
        storeConnectionTreeData: (state, action) => {
            state.treeArray = action.payload.treeArray;
            state.treeLoaded = action.payload.loaded;
        }
    }
})

export const getConnectionTreeData = createAsyncThunk(
    CONNECTIONS_TREE,
    async (tenantId) => {
      const response = await __response(apiService.get(`${CONNECTIONS_TREE}/${tenantId}`))
      return response?.data??{};
    }
  );

export const updateGlobalDateRange = dashboardTreeSlice.actions.updateGlobalDateRange;

export const nodeUpdateCallback = {
    dashboard: dashboardTreeSlice.actions.updateNodes,
    metrics: matricsTreeSlice.actions.updateNodes
};

export const stateData = {
    dashboard: (state) => state.dashboardTree,
    metrics: (state) => state.metricsTree,
    treeArray: (state) => state.connectionTree,
};

export const dashboardTreeReducer = dashboardTreeSlice.reducer;
export const matricsTreeReducer = matricsTreeSlice.reducer;
export const connectionTreeReducer = connectionTreeSlice.reducer;
export const storeConnectionTreeData = connectionTreeSlice.actions.storeConnectionTreeData;
