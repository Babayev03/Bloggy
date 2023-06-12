import {View, Text, Button} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux';
import {useEffect} from 'react';
import {getLoggedIn} from '../../../redux/login/LoginSlice';
import TabMain from '../../tab/TabMain';
import RegisterStack from '../register/RegisterStack';

const StartStack = () => {
  const result = useSelector<RootState, any>((state: any) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  

  useEffect(() => {
    dispatch(getLoggedIn());
  }, []);

  if (result.loggedIn == 'true') {
    return <TabMain />;
  } else {
      return <RegisterStack />;
  }
};
export default StartStack;
