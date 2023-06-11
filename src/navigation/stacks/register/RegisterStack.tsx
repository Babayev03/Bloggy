import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SignUpScreen from '../../screens/sgnUp/SignUpScreen';
import RegisterScreen from '../../screens/register/RegisterScreen';
import CreateAccountScreen from '../../screens/create/CreateAccountScreen';
import LoginScreen from '../../screens/login/LoginScreen';
import ModelScreen from '../../screens/model/ModelScreen';

const RegisterStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Model"
        component={ModelScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RegisterStack;
