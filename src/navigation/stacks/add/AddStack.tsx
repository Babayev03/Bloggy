import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddScreen from '../../screens/add/AddScreen';

const Add = createNativeStackNavigator();

const AddStack = () => {
  return (
    <Add.Navigator>
      <Add.Screen name="Add" component={AddScreen} options={{headerShown:false}} />
    </Add.Navigator>
  );
};

export default AddStack;
