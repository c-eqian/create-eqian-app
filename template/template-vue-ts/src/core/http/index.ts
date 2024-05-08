import RequestHttp from './interceptor';

export const http = new RequestHttp({
  headers: {
    'Content-Type': 'application/json'
  },
  cache: true,
  isLoading: true
});
