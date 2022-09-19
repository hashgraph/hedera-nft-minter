import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
} from 'axios';
import isError from 'lodash/isError';
// eslint-disable-next-line import/no-unresolved
import { API_HOST } from '../../Global';

type RequestDataType = {[key: string]: any} | string | number | boolean

/**
 * Class which communicates with backend using REST API and OAuth2
 * Api is able to deal with race condition between calls when refreshing _accessToken
 */

const delay = (delayTime: number) =>
  new Promise(resolve => {
    setTimeout(resolve, delayTime);
  });

export default class Api {
  static instance: Api;

  axios: AxiosInstance;

  authorizeUrl = '/oauth/token';

  token = '';

  refreshToken = '';

  refreshingProcess = false;

  logoutFn: null | ((status: boolean) => void) = null;

  constructor() {
    // eslint-disable-next-line no-undef
    const axiosConfig = { baseURL: API_HOST };

    this.axios = axios.create(axiosConfig);

    // Add error response interceptor
    this.axios.interceptors.response.use(undefined, this.retryRequest);
  }

  /**
   * Get instance of Api (singleton)
   * @return {Api}
   */
  static getInstance() {
    if (Api.instance === undefined) {
      Api.instance = new Api();
    }

    return Api.instance;
  }

  setLogout(cb: null | ((status: boolean) => void)) {
    this.logoutFn = cb;
  }

  /**
   * Get token
   */
  getToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('accessToken', token);
    return this;
  }

  /**
   * Get refresh token
   */
  getRefreshToken() {
    return this.refreshToken;
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
    return this;
  }

  loadSession() {
    this.setToken(localStorage.getItem('accessToken') || '');
    this.setRefreshToken(localStorage.getItem('refreshToken') || '');
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.setToken('');
    this.setRefreshToken('');

    if (this.logoutFn) {
      this.logoutFn(false);
    }
  }

  /**
   * Set OAuth secret
   * @param secret
   */

  /**
   * Request with access token in headers
   * @public
   * @param {object} config
   * @return {Promise<object>}
   */
  request<T>(config: AxiosRequestConfig): AxiosPromise<T> {
    const newConfig = { ...config };

    newConfig.headers = {
      ...newConfig.headers,
      Authorization: `Bearer ${ this.token }`,
      'Content-Type': 'application/json',
    };

    return this.axios(newConfig);
  }

  static obtainAccessToken(username: string, password: string) {
    const api = this.getInstance();

    const headers = {
      Accept: '*',
      // Authorization: `Basic ${ AUTH_BASIC }`,
    };

    const data = new FormData();

    data.append('username', username);
    data.append('password', password);
    data.append('grant_type', 'password');

    return api.axios({
      url: api.authorizeUrl,
      baseURL: API_HOST,
      method: 'post',
      headers,
      data,
    });
  }

  static noAuthRequest(url: string, method = 'get', data = {}, params = {}) {
    const api = this.getInstance();

    const headers = {
      'Content-type': 'application/json',
      // Authorization: `Basic ${ AUTH_BASIC }`,
    };

    return api.axios({
      url,
      baseURL: API_HOST,
      method,
      headers,
      data,
      ...params,
    } as AxiosRequestConfig);
  }

  /**
   * Obtain new refresh token from server
   * @public
   * @return {Object}
   */
  static async renewSession() {
    const api = Api.getInstance();

    api.refreshingProcess = true;

    try {
      const data = new FormData();

      data.append('refresh_token', api.getRefreshToken());
      data.append('grant_type', 'refresh_token');

      const request = await Api.noAuthRequest(api.authorizeUrl, 'post', data);

      if (request.status === 200) {
        const { data } = request;

        api.setToken(data.access_token);
        api.setRefreshToken(data.refresh_token);
      }
    } catch (e) {
      return e;
    } finally {
      api.refreshingProcess = false;
    }

    return null;
  }

  async retryRequest(err: AxiosError) {
    const { config, response } = err;
    const api = Api.getInstance();

    if (
      response?.status === 400 &&
      config.url &&
      /\/oauth\/token$/.test(config.url) &&
      response?.data.error !== 'invalid_grant'
    ) {
      api.refreshingProcess = false;
      api.logout();
      return Promise.reject(new Error('LOGIN_FAILED'));
    }

    // Session is expired
    if (
      response &&
      response.status === 401 &&
      response.data.error === 'invalid_token'
    ) {
      let renewSessionResponse = null;

      if (!api.refreshingProcess) {
        renewSessionResponse = await Api.renewSession();
        if (isError(renewSessionResponse)) {
          api.refreshingProcess = false;
          api.logout();
          return Promise.reject(new Error('LOGIN_FAILED'));
        }
      } else {
        do {
          await delay(500);
        } while (api.refreshingProcess);

        if (!Api.getInstance().getToken()) {
          api.logout();
          return Promise.reject(new Error('Error. Failed token.'));
        }
      }

      return Api.getInstance().request(config);
    }

    return Promise.reject(err);
  }

  /**
   * Alias for request with method GET
   * @public
   * @param {string} url
   * @param {object} data
   * @param {object} headers
   * @param restPrams
   * @return {Promise<object>}
   */
  static get<T>(
    url: string,
    data?: RequestDataType,
    headers?: Headers,
    restPrams?: AxiosRequestConfig
  ) {
    return Api.getInstance().request<T>({
      method: 'GET',
      url,
      data,
      headers,
      ...restPrams,
    });
  }

  /**
   * Alias for request with method POST
   * @public
   * @param {string} url
   * @param {object} data
   * @param {object} headers
   * @param restPrams
   * @return {Promise<object>}
   */
  static post<T>(
    url: string,
    data: RequestDataType,
    headers?: Headers,
    restPrams?: AxiosRequestConfig
  ) {
    return Api.getInstance().request<T>({
      method: 'POST',
      url,
      data,
      headers,
      ...restPrams,
    });
  }

  /**
   * Alias for request with method POST
   * @public
   * @param {string} url
   * @param {FormData} data
   * @param {function} onUploadProgress
   * @param restPrams
   * @return {Promise<object>}
   */
  static upload<T>(
    url: string,
    data: FormData,
    onUploadProgress?: (progress: ProgressEvent) => void | undefined,
    restPrams?: AxiosRequestConfig
  ) {
    if (data instanceof FormData) {
      const config: AxiosRequestConfig = {
        method: 'POST',
        url,
        data,
        ...restPrams,
      };

      if (onUploadProgress) {
        config.onUploadProgress = onUploadProgress;
      }

      return Api.getInstance().request<T>(config);
    }

    return Promise.reject(new Error('Upload data must be of type FormData'));
  }

  /**
   * Alias for request with method PUT
   * @public
   * @param {string} url
   * @param {object} data
   * @param {object} headers
   * @param restPrams
   * @return {Promise<object>}
   */
  static put<T>(
    url: string,
    data?: RequestDataType,
    headers?: Headers,
    restPrams?: AxiosRequestConfig
  ) {
    return Api.getInstance().request<T>({
      method: 'PUT',
      url,
      data,
      headers,
      ...restPrams,
    });
  }

  /**
   * Alias for request with method PATCH
   * @public
   * @param {string} url
   * @param {object} data
   * @param {object} headers
   * @param restPrams
   * @return {Promise<object>}
   */
  static patch<T>(
    url: string,
    data: RequestDataType,
    headers?: Headers,
    restPrams?: AxiosRequestConfig
  ) {
    return Api.getInstance().request<T>({
      method: 'PATCH',
      url,
      data,
      headers,
      ...restPrams,
    });
  }

  /**
   * Alias for request with method DELETE
   * @public
   * @param {string} url
   * @param {object} data
   * @param {object} headers
   * @param restPrams
   * @return {Promise<object>}
   */
  static delete<T>(
    url: string,
    data: RequestDataType,
    headers?: Headers,
    restPrams?: AxiosRequestConfig
  ) {
    return Api.getInstance().request<T>({
      method: 'DELETE',
      url,
      data,
      headers,
      ...restPrams,
    });
  }

  static logout() {
    const api = Api.getInstance();

    // TODO: ADD REST API ENDPOINT;
    api.logout(); // TODO: REMOVE - TEMP SOLUTION
    window.location.href = '/';
  }
}
