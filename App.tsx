import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import {NavigationContainer} from '@react-navigation/native';
import StartStack from './src/navigation/stacks/start/StartStack';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StartStack />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
