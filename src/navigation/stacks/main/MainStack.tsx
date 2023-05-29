import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../../screens/main/MainScreen';
import DetailScreen from '../../screens/detail/DetailScreen';

const Main = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Main.Navigator>
      <Main.Screen
        name="Main"
        component={MainScreen}
        options={{headerShown: false}}
      />
      <Main.Screen
        name="Detail"
        component={DetailScreen}
        options={{headerShown: false}}
      />
    </Main.Navigator>
  );
};

export default MainStack;
