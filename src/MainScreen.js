import React from 'react';
import {
  View,
  Switch,
  Text,
  SafeAreaView,
  Animated,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {AppConstants} from '../utils/Constant';
import {styles} from './Styles';
import {loaderView} from './Loader';

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      listGrid: true,
      showImage: false,
      imageUrl: '',
      showLoader: true,
    };
  }

export default MainScreen;
