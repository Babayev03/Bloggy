import {View, Text, Button, ActivityIndicator} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux';
import {useEffect} from 'react';
import {getLoggedIn} from '../../../redux/login/LoginSlice';
import TabMain from '../../tab/TabMain';
import RegisterStack from '../register/RegisterStack';
import { getTheme } from 'react-native-really-awesome-button';

const StartStack = () => {
  const result = useSelector<RootState, any>((state: any) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const themeMode = useSelector<RootState,any>(state => state.theme.themeMode);
  console.log(themeMode);
  

  useEffect(() => {
    dispatch(getLoggedIn());
  }, []);

  const containerStyle: any = {
    flex: 1,
    backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  };

  if (result.loading === 'pending') {
    return (
      <View style={containerStyle}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  } else if (result.loggedIn === 'true') {
    return <TabMain />;
  } else {
    return <RegisterStack />;
  }
};

export default StartStack;
