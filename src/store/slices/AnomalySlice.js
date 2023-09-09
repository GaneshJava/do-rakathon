import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from 'api';
import {
    FETCH_ALL_ANOMALIES,
    FETCH_ANOMALY_HEADER_DATA,
    FETCH_ANOMALY_FOR_AN_ASSET,
    UPDATE_STATUS_OF_AN_ANOMALY,
    FETCH_ANOMALY_GRAPH_BASED_ON_TYPE,
    FETCH_LAST_N_EXECUTION_RESULTS
} from "api/constants";
import { API_KEY } from '_DO-1.0/reducers';
import { __response } from 'api/apiHelper';

export const fetAllAnomalies = createAsyncThunk(FETCH_ALL_ANOMALIES, async (object) => {
    const response = await __response(apiService.get(getApiEndPoint(FETCH_ALL_ANOMALIES, object)));
    return response;
});

export const fetchAnomalyHeaderData = createAsyncThunk(FETCH_ANOMALY_HEADER_DATA, async (object) => {
    const response = await __response(apiService.get(getApiEndPoint(FETCH_ANOMALY_HEADER_DATA, object)));
    return response;
});

export const fetchAnomalyListOfAnAsset = createAsyncThunk(FETCH_ANOMALY_FOR_AN_ASSET, async (object) => {
    const response = await __response(apiService.get(getApiEndPoint(FETCH_ANOMALY_FOR_AN_ASSET, object)));
    return response;
});

export const updateStatusOfAnAnomaly = createAsyncThunk(UPDATE_STATUS_OF_AN_ANOMALY, async (object) => {
    const response = await __response(apiService.put(getApiEndPoint(UPDATE_STATUS_OF_AN_ANOMALY, object), object.postData));
    return response;
});

export const fetchAnomalyChartDataBasedOnType = createAsyncThunk(FETCH_ANOMALY_GRAPH_BASED_ON_TYPE, async (object) => {
    const response = await __response(apiService.get(getApiEndPoint(FETCH_ANOMALY_GRAPH_BASED_ON_TYPE, object)));
    return response;
});

export const fetchLastExecutions = createAsyncThunk(FETCH_LAST_N_EXECUTION_RESULTS, async (object) => {
    const response = await __response(apiService.get(getApiEndPoint(FETCH_LAST_N_EXECUTION_RESULTS, object)));
    return response;
});

function getApiEndPoint(url, object) {
    const {
        startDate,
        endDate,
        tenantId,
        eventId,
        connId,
        type,
        subType,
        entityLevel1,
        entityLevel2,
        entityLevel3,
        entityLevel4,
        key,
        volumeType,
        volumeSubtype,
    } = object;
    // const [startDate, endDate] = [convertDate(object.startDate), convertDate(object.endDate)];
    let finalUrl = `${url}`;
    
    switch (key) {
        case API_KEY.fetchAllAnomalies:
            finalUrl = `${finalUrl}/tenant/${tenantId}?fromDate=${startDate}&toDate=${endDate}`;
            break;
        case API_KEY.fetchAllAnomalyHeader:
            finalUrl = `${finalUrl}/${eventId}`
            break;
        case API_KEY.fetchAnomaliesOfAnAsset:
            finalUrl = `${finalUrl}/${tenantId}/${connId}?fromDate=${startDate}&toDate=${endDate}&entityLevel1=${entityLevel1}&entityLevel2=${entityLevel2}&entityLevel3=${entityLevel3}`
            break;
        case API_KEY.updateAnomalyStatus:
            finalUrl = `${finalUrl}/${eventId}`
            break;
        case API_KEY.fetchAnomalyChartData:
            finalUrl = `${finalUrl}/${type}/${tenantId}/${connId}?fromDate=${startDate}&toDate=${endDate}&entityLevel1=${entityLevel1}&entityLevel2=${entityLevel2}&entityLevel3=${entityLevel3}${volumeType ? `&type=${volumeType}` : ''}${volumeSubtype ? `&subType=${volumeSubtype}` : ''}`
            break;
        case API_KEY.fetchLastExecutions:
            finalUrl = `${finalUrl}/${tenantId}/${connId}?fromDate=${startDate}&toDate=${endDate}&entityLevel1=${entityLevel1}&entityLevel2=${entityLevel2}&entityLevel3=${entityLevel3}&entityLevel4=${entityLevel4}&type=${type}&subType=${subType}&count=5`
            break;
        default:
            break;
    }
    return finalUrl;
}

let initialState = {};
const anomalySlice = createSlice({
    name: 'anomalySlice',
    initialState: initialState,
    reducers: {},
    extraReducers: {}
});
export const anomalyReducer = anomalySlice.reducer;
export const anomalyState = (state) => state.anomalyState;
