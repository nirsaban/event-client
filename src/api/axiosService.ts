import axios, { AxiosInstance, AxiosStatic, CreateAxiosDefaults } from "axios";
import Cookies from "universal-cookie";
import store from "../redux/store";
import * as firebase from "firebase/auth";
import { setCookies } from "../common/utils";
export class AxiosService {
  private baseUrl: string = "http://localhost:5000/api/v1";
  public client: AxiosInstance;

  constructor() {
    this.configAxiosInstance();
  }

  private configAxiosInstance(): AxiosInstance {
    const config: CreateAxiosDefaults = {
      baseURL: this.baseUrl,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        withCredentials: true,
      },
    };

    this.client = axios.create(config);
    let that = this;
    this.client.interceptors.request.use(
      async function (config) {
        config.headers["Authorization"] = await that.getToken();
        config.headers.Accept = "application/json";
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log("Intercepting the response before sending it", response);

        return response;
      },
      (error) => {
        console.log("Response  Error: ", error);
        return Promise.reject(
          (error && error?.response?.data?.errorMessage) || error?.response?.data?.message
        );
      }
    );
    return this.client;
  }

  public getClient() {
    return this.client;
  }

  private async getToken(): Promise<string> {
    let token: string;
    const cookies = new Cookies();
    const firebaseTokenExpire: string = cookies.get("token-time");

    const tokenTime = parseInt(firebaseTokenExpire);

    if (new Date().getTime() > tokenTime) {
      token = await firebase.getAuth().currentUser.getIdToken(true);
      setCookies("token", token, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime());
      const timeHourString: string = new Date(Date.now() + 360000).getTime().toString();

      setCookies("token-time", timeHourString, new Date(Date.now() + 360000).getTime());
    } else {
      token = cookies.get("token");
    }
    return `Bearer ${token}` || "";
  }
}
