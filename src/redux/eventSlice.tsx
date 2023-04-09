// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "../common/types/interface/state.interface";
import { EventsEntity } from "../common/types/entites/events.entity";

const initialState: InitialState = {
  event: null,
};

export const eventSlice = createSlice({
  name: "event",
  initialState: initialState,
  reducers: {
    setEvent: (state, action: PayloadAction<EventsEntity>) => {
      state.event = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEvent } = eventSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default eventSlice.reducer;
