import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  Persistor,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userSlice from "../features/User/userSlice"
import toDoSlice from '../features/Todo/toDoSlice';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers(
  {
    userStore : userSlice,
    toDoStore : toDoSlice
  }
))

export const store = configureStore({
  reducer: {
    persistedReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persistor: Persistor = persistStore(store)


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;