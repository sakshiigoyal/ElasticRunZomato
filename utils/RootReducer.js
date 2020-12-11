import {combineReducers} from 'redux';
import saveRestaurantReducer from './SaveRestaurantReducer';

const rootReducer = combineReducers({
  saveRestaurantReducer: saveRestaurantReducer,
});

export default rootReducer;
