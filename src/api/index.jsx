import axios from './axioConfig';

export const apiService = {
  get: (url, config) => axios.get(url, config)
  , post: (url, data, config) => axios.post(url, data, config)
  , put: (url, data, config) => axios.put(url, data, config)
  , delete: (url, config) => axios.delete(url, config)
  , patch: (url, config) => axios.patch(url, config),
};
