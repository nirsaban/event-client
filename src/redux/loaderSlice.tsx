// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from '../common/types/interface/state.interface';
import { EventsEntity } from '../common/types/entites/events.entity';

const initialState: InitialState = {
  loader: false
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setLoader } = loaderSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default loaderSlice.reducer;
