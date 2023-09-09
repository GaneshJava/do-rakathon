import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_EVENTS_DATA, GET_METRICS_DATA } from "api/constants";
import { __response } from "api/apiHelper";
import { apiService } from "api";
import { _COLUMN, _DATABASE, _OVERALL, _TABLE } from "mvp/constants";

export const getEventMetricsData = createAsyncThunk(
    GET_EVENTS_DATA,
    async (object) => {
        const [endUrl, groupBy = false] = getUrlBasedOnLevel(object);
        const response = await __response(apiService.get(endUrl))
        if (response.status === 200) {
            response.data.groupBy = groupBy;
            return response.data;
        } else {
            return response;
        }
    }
)

const getUrlBasedOnLevel = (object) => {
    const { level, tenantId, connId, tableName, columnName, startDate, endDate, section } = object;
    let dataType = section.dataType || 'schema_change';
    let endUrl = '';
    let { queryParams, groupBy } = getQueryParams(startDate, endDate, tenantId, section, level);
    switch (level) {
        case _OVERALL:
            endUrl = '';
            break;
        case _DATABASE:
            endUrl = `/${connId}`;
            break;
        case _TABLE:
            endUrl = `/${connId}/${tableName}`;
            break;
        case _COLUMN:
            endUrl = dataType !== 'metric' ? `/${connId}/${tableName}/${columnName}` : `/${connId}/${tableName}`;
            break;
        default:
            break;
    }
    return [
        `${section.dataType === 'metric' ? GET_METRICS_DATA : GET_EVENTS_DATA}${endUrl}?${queryParams}`,
        groupBy || false
    ];
}

const getQueryParams = (
    startDate,
    endDate,
    tenantId,
    {
        dataType,
        subType,
        groupBy: sectionGroupBy,
        fromException = false,
    },
    level,
) => {
    let groupBy = '';
    let queryParams = `startDate=${startDate}&endDate=${endDate}&tenantId=${tenantId}`;
    if (dataType === 'metric') {
        queryParams = `${queryParams}&metricType=volume_data&metricSubType=${subType}`;
    } else {
        queryParams = `${queryParams}&eventType=${dataType === 'distribution' ? 'distribution_validation' : 'schema_change'}`;
        if (fromException === true) {
            queryParams = `${queryParams}&eventSubType=overall&groupBy=${sectionGroupBy}`;
        } else {
            if (dataType === 'distribution') {
                groupBy = level === _DATABASE ? 'table' : level === _TABLE ? 'column' : '';
                queryParams = `${queryParams}&eventSubType=${subType}`;
                queryParams = `${queryParams}${groupBy ? ('&groupBy=' + groupBy) : ''}`;
            } else {
                queryParams = `${queryParams}&eventSubType=${level.toLowerCase()}`;
                if (level === _OVERALL) {
                    groupBy = sectionGroupBy;
                    queryParams = `${queryParams}&groupBy=${groupBy}`;
                }
            }
        }
    }
    return { queryParams, groupBy };
}

let initialState = {};
const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: {
    }
});


export const dashboardReducer = dashboardSlice.reducer;