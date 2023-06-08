import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoggedInScreen from '../../screens/loggedIn/LoggedInScreen';

const LoggedInStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="LoggedInScreen" component={LoggedInScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default LoggedInStack;
