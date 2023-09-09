import { createSlice } from '@reduxjs/toolkit';
import { TEST_CONNECTION, SAVE_CONNECTION } from 'api/constants';
import { apiService } from 'api';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  service: {
    selectedService: 'mysql',
    description: ''
  },
  configure: {
    name: '',
    connectionName: '',
    userName: '',
    password: '',
    account: '',
    role: '',
    database: '',
    wareHouse: '',
    privateKey: '',
    snowflakePassphraseKey: '',
    host: '',
    port: '',
    databaseSchema: '',
    connectionOptions: [
      {
        key: '',
        value: ''
      }
    ],
    connectionArguments: [
      {
        key: '',
        value: ''
      }
    ]
  },
  warning: {
    selectedServiceWarning: false,
    nameWarning: false,
    connectionNameWarning: false,
    userNameWarning: false,
    passwordWarning: false,
    hostWarning: false,
    portWarning: false,
    accountWarning: false,
    roleWarning: false,
    wareHouseWarning: false,
    snowflakePassphraseKeyWarning: false,
    privateKeyWarning: false,
  }
};

export const testConnection = createAsyncThunk(
  TEST_CONNECTION,
  async (postData) => {
    const response = await apiService.post(TEST_CONNECTION, postData);
    return response.data;
  }
);


export const saveConnection = createAsyncThunk(
  SAVE_CONNECTION,
  async (postData) => {
    const response = await apiService.post(SAVE_CONNECTION, postData);
    return response.data;
  }
);


const addServiceSlice = createSlice({
  name: 'addService',
  initialState: structuredClone(initialState),
  reducers: {
    updateStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateService: (state, action) => {
      const { key, value } = action.payload;
      state.service[key] = value;
      state.warning[`${key}Warning`] = false;
    },
    updateConfigure: (state, action) => {
      const { key, value } = action.payload;
      state.configure[key] = value;
      state.warning[`${key}Warning`] = false;
    },
    updateWarnings: (state, action) => {
      state.warning = { ...state.warning, ...action.payload }
    },
    resetServiceState: () => initialState  
  }
});

export const addServiceReducer = addServiceSlice.reducer;
export const serviceState = (state) => state.addService;
export const updateConfigure = addServiceSlice.actions.updateConfigure;
export const updateService = addServiceSlice.actions.updateService;
export const updateWarnings = addServiceSlice.actions.updateWarnings;
export const updateStep = addServiceSlice.actions.updateStep;
export const resetServiceState = addServiceSlice.actions.resetServiceState;
