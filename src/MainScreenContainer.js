import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import MainScreen from './MainScreen';
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

const MainScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainScreen);

export default MainScreenContainer;
