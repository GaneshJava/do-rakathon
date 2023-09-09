import { createAsyncThunk } from '@reduxjs/toolkit';
import { EMAIL_API } from 'api/constants';
import { __response } from 'api/apiHelper';
import { apiService } from 'api';

export const fetchEmails = createAsyncThunk(EMAIL_API, async (tenantId) => {
  const response = await __response(apiService.get(`${EMAIL_API}/${tenantId}`));
  return response;
});

export const saveEmails = createAsyncThunk(EMAIL_API, async (postData) => {
  const response = await __response(apiService.post(EMAIL_API, postData));
  return response;
});

export const deleteEmail = createAsyncThunk(EMAIL_API, async (emailId) => {
  const response = await __response(
    apiService.delete(`${EMAIL_API}/${emailId}`)
  );
  return response;
});
