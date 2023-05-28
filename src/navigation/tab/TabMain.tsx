import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainStack from '../stacks/main/MainStack';
import AddStack from '../stacks/add/AddStack';

const Tab = createBottomTabNavigator();

const TabMain = () => {
  return (
    <View>
      <Tab.Navigator>
        <Tab.Screen name="MainStack" component={MainStack} />
        <Tab.Screen name="AddStack" component={AddStack} />
      </Tab.Navigator>
    </View>
  );
};

export default TabMain;
