import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "@/services/authApi";
import authReducer from "@/redux/slices/authSlice";
import { courseApi } from "@/services/courseApi";
import { categoryApi } from "@/services/categoryApi";
import { chapterApi } from "@/services/chapterApi";
import { ModulesApi } from "@/services/modulesApi";


const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "admin", "isAuthenticated", "tokenExpiry"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [chapterApi.reducerPath]: chapterApi.reducer,
    [ModulesApi.reducerPath]: ModulesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid errors with non-serializable values in RTK Query
    }).concat(authApi.middleware, courseApi.middleware, categoryApi.middleware, chapterApi.middleware, ModulesApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
