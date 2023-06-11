import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import SvgArrow from '../../../assets/images/Arrow';
import {useNavigation} from '@react-navigation/native';
import SvgProfile from '../../../assets/images/ProfileIcon';
import SvgLock from '../../../assets/images/LockIcon';
import SvgOpenEye from '../../../assets/images/OpenEye';
import SvgCloseEye from '../../../assets/images/CloseEye';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux';
import {useEffect} from 'react';
import {getLoggedIn, setLoggedIn} from '../../../redux/login/LoginSlice';
import axios from 'axios';
import SvgLine from '../../../assets/images/Line';
import SvgGoogle from '../../../assets/images/GoogleIcon';
import {Controller} from 'react-hook-form';
import {useForm} from 'react-hook-form';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [error, setError] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    dispatch(getLoggedIn());
  }, []);

  const handleSecure = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onSubmit = handleSubmit(data => {
    axios
      .post('http://192.168.0.112:3000/api/login', {
        email: data.email,
        password: data.password,
      })
      .then(res => {
        if (res.data.success) {
          dispatch(setLoggedIn({loggedIn: 'true', token: res.data.token}));
          reset();
          setError('');
        } else {
          setError(res.data.errors.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}>
        <SvgArrow stroke={'#000'} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Log in</Text>
      </View>
      <View style={[styles.inputs, {marginTop: 20, flex: 1}]}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        <View style={{position: 'absolute', left: 8, top: '35%'}}>
          <SvgProfile />
        </View>
      </View>
      {errors.email ? (
        <View style={{marginHorizontal: 25, paddingTop: 5}}>
          <Text style={{color: 'red'}}>This is required.</Text>
        </View>
      ) : (
        <View style={{height: 24}}></View>
      )}
      <View style={[styles.inputs, {marginTop: 5}]}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Your Password"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
            />
          )}
          name="password"
        />
        <View style={{position: 'absolute', left: 8, top: '35%'}}>
          <SvgLock />
        </View>
        <TouchableOpacity
          style={{position: 'absolute', right: 15, top: '35%', padding: 5}}
          onPress={() => handleSecure()}>
          {secureTextEntry ? <SvgOpenEye /> : <SvgCloseEye />}
        </TouchableOpacity>
      </View>
      {errors.password ? (
        <View style={{marginHorizontal: 25, paddingTop: 5}}>
          <Text style={{color: 'red'}}>This is required.</Text>
        </View>
      ) : (
        <View style={{height: 24}}></View>
      )}
      {error ? (
        <View style={{marginHorizontal: 25, paddingTop: 5}}>
          <Text style={{color: 'red'}}>{error}</Text>
        </View>
      ) : (
        <View style={{height: 24}}></View>
      )}
      <View style={{marginTop: 50}}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#000'}]}
          onPress={() => onSubmit()}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.terms}>
        <SvgLine />
        <Text
          style={{color: '#000', fontFamily: 'Raleway-Medium', fontSize: 18}}>
          Or Login with
        </Text>
        <SvgLine />
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            marginTop: 45,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#000',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <SvgGoogle />
        <Text style={[styles.buttonText, {color: '#000'}]}>
          {' '}
          Log in with Google
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  goBack: {
    marginTop: 40,
    marginLeft: 15,
  },
  header: {
    marginVertical: 50,
    marginLeft: 25,
  },
  headerText: {
    color: '#000',
    fontSize: 35,
    fontFamily: 'Raleway-Bold',
  },
  inputs: {
    borderWidth: 1,
    borderColor: 'rgba(158, 150, 150, .5)',
    borderRadius: 8,
    marginHorizontal: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  input: {
    color: '#000',
    paddingHorizontal: 30,
    paddingVertical: 8,
    fontSize: 18,
    fontFamily: 'Raleway-Regular',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    color: '#fff',
    paddingVertical: 10,
    textAlign: 'center',
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 8,
    marginHorizontal: 25,
  },
  terms: {
    marginHorizontal: 25,
    flex: 1,
    marginTop: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  termsText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
    opacity: 0.5,
  },
});
