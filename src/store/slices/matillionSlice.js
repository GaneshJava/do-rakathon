import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    MATILLIION,
    MATILLION_GROUPS,
    MATILLION_PROJECTS,
    MATILLION_VERSIONS,
    MATILLION_JOBS_LIST,
    MATILLION_JOBS_EXECUTION
} from 'api/constants';
import { __response } from 'api/apiHelper';
import { apiService } from 'api';

export const fetchMatillionGroups = createAsyncThunk(MATILLION_GROUPS, async () => {
    const response = await __response(apiService.get(`${MATILLION_GROUPS}`));
    return response;
});

export const fetchMatillionProjects = createAsyncThunk(`${MATILLIION}_projects`, async (params) => {
    const response = await __response(apiService.get(`${MATILLION_PROJECTS(params.groupId)}`));
    return response;
});

export const fetchMatillionVersion = createAsyncThunk(`${MATILLIION}_version`, async (params) => {
    const response = await __response(apiService.get(`${MATILLION_VERSIONS(params.groupId, params.projectId)}`));
    return response;
});

export const fetchMatillionJobs = createAsyncThunk(`${MATILLIION}_Jobs`, async (params) => {
    const response = await __response(apiService.get(`${MATILLION_JOBS_LIST(params.groupId, params.projectId, params.versionId)}`));
    return response;
});

export const fetchMatillionJobsTasks = createAsyncThunk(`${MATILLIION}_JobsTasks`, async (params) => {
    const response = await __response(apiService.get(`${MATILLION_JOBS_EXECUTION(params.groupId, params.projectId, params.jobName)}`));
    return response;
});
