import {createStore, applyMiddleware} from 'redux';
import Reducers from './RootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['saveRestaurantReducer'],
  // stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, Reducers);

export default () => {
  let store = createStore(pReducer, applyMiddleware(logger, thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};

// export const configureStore = createStore(
//   pReducer,
//   applyMiddleware(logger, thunk),
// );
// export const persistor = persistStore(configureStore);
