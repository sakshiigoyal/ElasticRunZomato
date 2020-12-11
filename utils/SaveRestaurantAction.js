import {
  LOCATION_LIST_SUCCESS,
  LOCATION_LIST_ERROR,
  LOCATION_LIST_REFRESH,
} from './ActionTypes';


export function saveRestaurantSuccess(response) {
  return {
    type: LOCATION_LIST_SUCCESS,
    payload: response,
  };
}


export function saveRestaurant(response) {
  return (dispatch) => {
    dispatch(saveRestaurantSuccess(response));
  };
}
