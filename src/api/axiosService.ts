"@ts-nocheck"
import axios, { AxiosInstance, AxiosStatic, CreateAxiosDefaults } from 'axios';
import Cookies from 'universal-cookie';
import store from '../redux/store';
import * as firebase from 'firebase/auth';
import { setCookies } from '../common/utils';
import { setLoader } from '../redux/loaderSlice';
export class AxiosService {
  private baseUrl: string = 'http://localhost:4000/api/v1';
  public client: AxiosInstance;

  constructor() {
    this.configAxiosInstance();
  }

  private configAxiosInstance(): AxiosInstance {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        withCredentials: true,
        Authorization: ''
      }
    };

    this.client = axios.create(config);
    let that = this;
    store.dispatch(setLoader(true));
    this.client.interceptors.request.use(
      async function (config) {
        config.headers['Authorization'] = await that.getToken();
        config.headers.Accept = 'application/json';
        return config;
      },
      function (error) {
        store.dispatch(setLoader(false));
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log('Intercepting the response before sending it', response);
        store.dispatch(setLoader(false));
        return response;
      },
      (error) => {
        store.dispatch(setLoader(false));
        console.log('Response  Error: ', error);
        return Promise.reject((error && error?.response?.data?.errorMessage) || error?.response?.data?.message);
      }
    );
    return this.client;
  }

  public getClient() {
    return this.client;
  }

  private async getToken(): Promise<string> {
    const cookies = new Cookies();

    const firebaseTokenExpire: string = cookies.get('token-time');

    const tokenTime = parseInt(firebaseTokenExpire);

    if (new Date().getTime() > tokenTime) {
      const token = await firebase.getAuth().currentUser.getIdToken(true);

      console.log('token', token);

      setCookies('token', token, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime());

      const timeHourString: string = new Date(Date.now() + 360000).getTime().toString();

      setCookies('token-time', timeHourString, new Date(Date.now() + 360000).getTime());

      return `Bearer ${token}` || '';
    } else {
      return `Bearer ${cookies.get('token')}` || '';
    }
  }
}
