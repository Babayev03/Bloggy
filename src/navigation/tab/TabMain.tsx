import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainStack from '../stacks/main/MainStack';
import AddStack from '../stacks/add/AddStack';
import SettingStack from '../stacks/setting/SettingStack';
import SvgSetting from '../../assets/images/Setting';
import SvgHomeIcon from '../../assets/images/Home';
import SvgAddIcon from '../../assets/images/AddIcon';
import {useDispatch, useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const TabMain = () => {
  const themeMode = useSelector((state: any) => state.theme.themeMode);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: themeMode == 'dark' ? '#000' : '#fff',
          borderColor: themeMode == 'dark' ? '#000' : '#fff',
          borderTopWidth: 1,
          borderTopColor: themeMode == 'dark' ? '#000' : '#fff',
        },
      }}>
      <Tab.Screen
        name="MainStack"
        component={MainStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}: any) => (
            <SvgHomeIcon
              stroke={focused ? '#E0783E' : '#494949'}
              fill={focused ? '#E0783E' : '#494949'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddStack"
        component={AddStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}: any) => (
            <SvgAddIcon
              stroke={focused ? '#E0783E' : '#494949'}
              fill={focused ? '#E0783E' : '#494949'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}: any) => (
            <SvgSetting
              stroke={focused ? '#E0783E' : '#494949'}
              fill={focused ? '#E0783E' : '#494949'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabMain;
