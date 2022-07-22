import { configureStore } from '@reduxjs/toolkit';

import filterReducer from '../features/todos/filterSlice';
import logger from 'redux-logger';
import { listsApi } from '../service/listsService';
import { todosApi } from '../service/todosService';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
export const store = configureStore({
    // preloadedState,
    reducer: {
        filter: filterReducer,
        [todosApi.reducerPath]: todosApi.reducer,
        [listsApi.reducerPath]: listsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            logger,
            listsApi.middleware,
            todosApi.middleware
        ),
});
setupListeners(store.dispatch);
/*

 {
      "name": "test",
      "id": 1,
      "user_id": 1
    }
*/
