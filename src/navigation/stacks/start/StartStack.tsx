import {View, Text, Button} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux';
import {toggleLogin} from '../../../redux/login/LoginSlice';
import {useEffect} from 'react';
import { setLoggedIn } from '../../../redux/login/LoginSlice';
import { getLoggedIn } from '../../../redux/login/LoginSlice';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { Dispatch, AnyAction } from 'redux';

const StartStack = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const result = useSelector<RootState, any>((state: any) => state.login);
  const dispatch = useDispatch<AppDispatch>();

  console.log(result);
  useEffect(() => {
    console.log('StartStack');
    dispatch(getLoggedIn())
  }, [isLogged]);

  const goooo = () => {
dispatch(setLoggedIn(!result.loggedIn));
  };

  return (
    <View>
      <Text>StartStack</Text>
      <Button title="Press" onPress={goooo}></Button>
    </View>
  );
};
export default StartStack;
function dispatch(arg0: AsyncThunkAction<boolean, boolean, { state?: unknown; dispatch?: Dispatch<AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown; }>) {
    throw new Error('Function not implemented.');
}

