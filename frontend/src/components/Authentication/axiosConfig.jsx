    import axios from 'axios';
    import baseUrl from '../shared/baseUrl';

    const api = axios.create({
      baseURL: `${baseUrl}/api`,
    });

    api.interceptors.request.use(
      config => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    api.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post(`${baseUrl}/api/auth/token/refresh/`, { refresh: refreshToken });
            localStorage.setItem('access_token', response.data.access);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            return api(originalRequest);
          } catch (err) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    export default api;
