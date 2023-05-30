import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SaveScreen from '../../screens/save/SaveScreen';

const Save = createNativeStackNavigator();

const SaveStack = () => {
  return (
    <Save.Navigator>
      <Save.Screen
        name="Save"
        component={SaveScreen}
        options={{headerShown: false}}
      />
    </Save.Navigator>
  );
};

export default SaveStack;
