// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "../common/types/interface/state.interface";
import { UsersEntity } from "../common/types/entites/user.entity";

const initialState: InitialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UsersEntity>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default userSlice.reducer;
