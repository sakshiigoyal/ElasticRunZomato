/**
 * Sakshi Goyal
 * Main root file
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

import returnStoreAndPersistor from './utils/Config';
import AppNavigator from './utils/AppNavigator';

// const storeV = store();
const {store, persistor} = returnStoreAndPersistor();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
