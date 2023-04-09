import { EventsEntity } from "./../common/types/entites/events.entity";
import { UserFlow, UsersEntity } from "./../common/types/entites/user.entity";
import { AxiosInstance } from "./../../node_modules/axios/index.d";
import { Axios } from "axios";
import { AxiosService } from "./axiosService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setEvent } from "../redux/eventSlice";
import store from "../redux/store";

const state = store.getState();

const eventState: EventsEntity = state.event.event;

export class ApiServices {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = new AxiosService().getClient();
  }

  public async loginOrRegister(data?: Partial<UsersEntity>): Promise<UsersEntity> {
    try {
      const response = await this.httpClient.post("/users", { ...data });

      return response.data as UsersEntity;
    } catch (error) {
      throw new Error(error);
    }
  }
  public async updateUser(data: Partial<UsersEntity>, flow: UserFlow): Promise<UsersEntity> {
    try {
      data.flow = flow;
      const response = await this.httpClient.put("/users", { ...data });

      return response.data as UsersEntity;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async createEvent(data: EventsEntity, flow: UserFlow): Promise<UsersEntity> {
    try {
      const response = await this.httpClient.post("/events", { ...data });

      store.dispatch(setEvent(response.data as EventsEntity));

      const user = await this.updateUser({}, flow);

      user.events.push(response.data as EventsEntity);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  public async updateEvent(data: EventsEntity, flow: UserFlow): Promise<UsersEntity> {
    try {
      const state = store.getState();

      const eventState: EventsEntity = state.event.event;
      return;

      const response = await this.httpClient.put(`/events/${eventState.id}`, { ...data });

      const user = await this.updateUser({}, flow);

      user.events.push(response.data as EventsEntity);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
