import { configureStore } from "@reduxjs/toolkit";
import { userProfileApi } from "./query/userProfileApi";

export const store = configureStore({
  reducer: {
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
