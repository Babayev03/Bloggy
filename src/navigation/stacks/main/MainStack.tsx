import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../../screens/main/MainScreen';

const Main = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Main.Navigator>
      <Main.Screen name="Main" component={MainScreen} />
    </Main.Navigator>
  );
};

export default MainStack;
