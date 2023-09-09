import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
    GET_ALL_CONNECTIONS,
    DASHBOARD_ASSET_COUNTS,
    GET_DASHBOARD_EVENTS_DATA
} from 'api/constants';
import { __response } from 'api/apiHelper';
import { apiService } from 'api';


export const fetchAllConnectionBasedOnTenant = createAsyncThunk(GET_ALL_CONNECTIONS, async (tenantId) => {
    const response = await __response(apiService.get(`${GET_ALL_CONNECTIONS}/${tenantId}`));
    return response;
});

export const fetchDashboardAssetCount = createAsyncThunk(DASHBOARD_ASSET_COUNTS, async (tenantId) => {
    const response = await __response(apiService.get(`${DASHBOARD_ASSET_COUNTS}/${tenantId}`));
    return response;
});

export const fetchDashboardEventsData = createAsyncThunk(GET_DASHBOARD_EVENTS_DATA, async (requestObj) => {
    const response = await __response(apiService.get(`${GET_DASHBOARD_EVENTS_DATA}/${requestObj.tenantId}/${requestObj.eventType}?fromDate=${requestObj.startDate}&toDate=${requestObj.endDate}`));
    return response;
});


const initialState = {
}

const dataHealthSlice = createSlice({
    name: 'pipeline',
    initialState,
    reducers: {
    }
})
export const dataHealthReducer = dataHealthSlice.reducer;
