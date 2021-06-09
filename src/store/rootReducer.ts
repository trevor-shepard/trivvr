import { combineReducers } from "@reduxjs/toolkit";
import user from "store/slices/userSlice";
import trivias from "store/slices/triviaSlice";
const rootReducer = combineReducers({
  user,
  trivias,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
