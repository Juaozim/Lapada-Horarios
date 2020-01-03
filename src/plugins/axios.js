import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sheetsu.com/apis/v1.0bu/e99b9fadea41',
});

export default api;
