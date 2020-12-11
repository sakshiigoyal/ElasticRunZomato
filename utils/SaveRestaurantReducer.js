import {
  LOCATION_LIST_SUCCESS,
} from './ActionTypes';

const initialState = {
    restaurantList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOCATION_LIST_SUCCESS:
      return { ...state, restaurantList: action.payload };
    default:
      return state;
  }
}
