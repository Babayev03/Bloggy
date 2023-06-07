import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import {NavigationContainer} from '@react-navigation/native';
import TabMain from './src/navigation/tab/TabMain';
import StartScreen from './src/navigation/stacks/firstLogin/StartScreen';
import StartStack from './src/navigation/stacks/start/StartStack';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        {/* <StartScreen /> */}
        <StartStack />
        {/* <TabMain /> */}
      </Provider>
    </NavigationContainer>
  );
};

export default App;
