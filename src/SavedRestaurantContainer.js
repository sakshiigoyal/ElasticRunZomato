import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SavedRestaurant from './SavedRestaurant';
import * as SaveRestaurantAction from '../utils/SaveRestaurantAction';

const mapStateToProps = (state) => ({
  saveRestaurantReducer: state.saveRestaurantReducer,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...SaveRestaurantAction,
    },
    dispatch,
  );
}

const SavedRestaurantContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedRestaurant);

export default SavedRestaurantContainer;
