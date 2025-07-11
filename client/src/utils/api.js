import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-base-url.com',
});

export default api;
