import axios from 'axios';
import {BASE_URL} from './Constant';

const request = async function (options) {
  const headers = {
    'user-key' : 'ebce07efec80d0017e1a3ee7173cdbd6'
  }
  const client = axios.create({
    baseURL: BASE_URL,
    headers: headers
  });

  client.interceptors.request.use((request) => {
    console.log('Starting Request', request);
    return request;
  });

  client.interceptors.response.use((response) => {
    console.log('Response:', response);
    return response;
  });

  const onSuccess = function (response) {
    return response.data;
  };

  const onError = function (error) {
    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
