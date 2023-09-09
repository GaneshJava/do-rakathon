import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FETCH_RULE_CONFIG, STORE_RULE_CONFIG, GET_MASTER_RULES, DELETE_RULE } from "api/constants";
import { __response } from "api/apiHelper";
import { apiService } from "api";
import { _COLUMN, _DATABASE, _TABLE } from "mvp/constants";

export const getRuleConfigData = createAsyncThunk(
    FETCH_RULE_CONFIG,
    async (object) => {
        const endUrl = getUrlBasedOnLevel(object);
        const response = await __response(apiService.get(endUrl))
        return response;
    }
)

export const storeRuleConfigData = createAsyncThunk(
    STORE_RULE_CONFIG,
    async (postData) => {
        const response = await __response(apiService.post(STORE_RULE_CONFIG, postData))
        return response;
    }
)

export const getMaterRules = createAsyncThunk(
    GET_MASTER_RULES,
    async () => {
        const response = await __response(apiService.get(GET_MASTER_RULES));
        return response.data
    }
)

export const deleteRule = createAsyncThunk(
    DELETE_RULE,
    async (ruleConfigId) => {
        let response = await __response(apiService.delete(`${DELETE_RULE}/${ruleConfigId}`));
        return response.data;
    }
)

const getUrlBasedOnLevel = (object) => {
    const { level, tenantId, connId, tableName, columnName } = object;
    let endUrl = '';
    switch (level) {
        case _DATABASE:
            endUrl = `/${connId}`;
            break;
        case _TABLE:
            endUrl = `/${connId}/${tableName}`;
            break;
        case _COLUMN:
            endUrl = `/${connId}/${tableName}/${columnName}`;
            break;
        default:
            break;
    }
    return `${FETCH_RULE_CONFIG}/${tenantId}${endUrl}`;
}

let initialState = {
    masterRules: [],
    loaded: false,
};
const metricSlice = createSlice({
    name: 'metricSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getMaterRules.fulfilled, (state, action) => {
            let masterRules = action.payload || [];
            state.masterRules = masterRules;
            state.masterRuleIds = masterRules.map(rule => rule.ruleId);
            state.loaded = true
          })
      }
});

export const masterRules = (state) => state.masterRules;
export const metricReducer = metricSlice.reducer;