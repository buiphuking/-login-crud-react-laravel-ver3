import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { apiSlice } from "../api/apiMajorSlice";
// export const store = configureStore({
//   reducer: {
//     listMajor: listMajor_reducer,
//     product: product_reducer,
//   },
// });
// import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
