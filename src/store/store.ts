import { configureStore } from "@reduxjs/toolkit";
import { userProfileApi } from "./query/userProfileApi";
import matchSlice from "./slice/matchSlice";

export const store = configureStore({
  reducer: {
    [matchSlice.name]: matchSlice.reducer,
    [userProfileApi.reducerPath]: userProfileApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    userProfileApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
