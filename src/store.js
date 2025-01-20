import { configureStore } from "@reduxjs/toolkit";

import weatherApiSliceReducer from "./weatherSlice";

export const store = configureStore({
  reducer: { weather: weatherApiSliceReducer },
});
