import axios from 'axios';
import functions from './functions';

function getAPI() {
  const axiosRequest = axios.create({
    withCredentials: true,
  });

  axiosRequest.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const res = error.response;
      if (res) {
        console.log(res.status);
        console.log(res);
      } else {
        console.log(
          'INTERCEPTOR: no HTTP response (network/CORS/offline).',
          error.message || error.code || error
        );
      }

      if (res && res.status === 498) {
        functions.refreshToken();
      }

      if (res && res.status === 440) {
        localStorage.setItem('localStorageCurrentUser', JSON.stringify('null'));
        window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );

  return axiosRequest;
}

export default { getAPI };
