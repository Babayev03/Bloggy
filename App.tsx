import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import {NavigationContainer} from '@react-navigation/native';
import TabMain from './src/navigation/tab/TabMain';
import FirstLogin from './src/navigation/stacks/firstLogin/FirstLogin';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <FirstLogin />
        {/* <TabMain /> */}
      </Provider>
    </NavigationContainer>
  );
};

export default App;
