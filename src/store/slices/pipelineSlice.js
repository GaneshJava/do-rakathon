import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
    FETCH_LIST_OF_DAGS,
    FETCH_LIST_OF_DAGS_RUNS
} from 'api/constants';
import { __response } from 'api/apiHelper';
import { apiService } from 'api';

// const AIRFLOW_ENDPOINT = 'http://do-airflow.133.237.79.216.sslip.io/api/v1/';

export const fetchDagsList = createAsyncThunk(FETCH_LIST_OF_DAGS, async () => {
    const response = await __response(apiService.get(`${FETCH_LIST_OF_DAGS}`));
    return response;
});

export const fetchDagsRunsList = createAsyncThunk(`${FETCH_LIST_OF_DAGS}_RUNS`, async (dagId) => {
    const response = await __response(apiService.get(`${FETCH_LIST_OF_DAGS_RUNS(dagId)}`));
    return response;
});

const initialState = {
}

const pipelineSlice = createSlice({
    name: 'pipeline',
    initialState,
    reducers: {
    }
})
export const pipelineReducer = pipelineSlice.reducer;
