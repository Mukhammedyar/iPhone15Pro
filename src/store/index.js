// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../Services/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
