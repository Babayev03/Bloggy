import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../../screens/main/MainScreen';
import SettingScreen from '../../screens/setting/SettingScreen';

const Setting = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <Setting.Navigator>
      <Setting.Screen name="Settiing" component={SettingScreen} options={{headerShown:false}} />
    </Setting.Navigator>
  );
};

export default SettingStack;
