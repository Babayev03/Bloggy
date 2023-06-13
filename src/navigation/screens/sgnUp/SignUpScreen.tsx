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
import {KeyboardAvoidingView} from 'react-native';
import {Controller, set} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import axios from 'axios';

const SignUpScreen = () => {
  const navigation = useNavigation<any>();
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleSecure = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit(data => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
    } else {
      axios
        .post('http://172.16.0.46:3000/api/register', {
          email: data.email,
          password: data.password,
        })
        .then(res => {
          if (!res.data.success) {
            if (res.data.errors && res.data.errors.length > 0) {
              const errorMsgs = res.data.errors.map((error: any) => error.msg);
              setError(errorMsgs.join(', '));
            } else {
              setError(res.data.errors.msg);
            }
          }
          setError('');
          navigation.navigate('Model');

          // reset();
        })
        .catch(err => {
          console.log(err);
        });
    }
  });

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        style={{backgroundColor: 'white', flex: 1}}></KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}>
        <SvgArrow stroke={'#000'} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Your{'\n'}Account</Text>
      </View>
      <View style={styles.inputs}>
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
              onChangeText={value => onChange(value)}
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
      <View style={styles.inputs}>
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
              onChangeText={value => onChange(value)}
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
      <View style={styles.inputs}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              secureTextEntry={secureTextEntry}
            />
          )}
          name="confirmPassword"
        />
        <View style={{position: 'absolute', left: 8, top: '35%'}}>
          <SvgLock />
        </View>
      </View>
      {errors.confirmPassword ? (
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
      <View style={{marginTop: 35}}>
        <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.terms}>
        <Text style={styles.termsText}>
          By creating an account or signing you agree to our Terms and
          Conditions
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

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
    backgroundColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 8,
    marginHorizontal: 25,
  },
  terms: {
    marginHorizontal: 25,
    flex: 1,
    marginTop: 80,
  },
  termsText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
    opacity: 0.5,
  },
});
