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
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux';
import {useEffect} from 'react';
import {getLoggedIn, setLoggedIn} from '../../../redux/login/LoginSlice';

const SignUpScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const result = useSelector<RootState, any>((state: any) => state.login);
  const dispatch = useDispatch<AppDispatch>();

  console.log(result);
  useEffect(() => {
    dispatch(getLoggedIn());
  }, []);

  const handleSecure = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleSignUp = () => {
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Empty Inputs', 'Please Fill Inputs Then Press Add Again', [
        {text: 'OK'},
      ]);
      return;
    } else if (password !== confirmPassword) {
      Alert.alert('Invalid Inputs', 'Passwords Do Not Match', [{text: 'OK'}]);
      return;
    } else if (password.length < 8 || confirmPassword.length < 8) {
      Alert.alert('Invalid Inputs', 'Password Must Be At Least 8 Characters', [
        {text: 'OK'},
      ]);
      return;
    } else {
      dispatch(setLoggedIn(true));
    }
  };

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
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <View style={{position: 'absolute', left: 8, top: '35%'}}>
          <SvgProfile />
        </View>
      </View>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Your Password"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          onChangeText={text => setPassword(text)}
          secureTextEntry={secureTextEntry}
          value={password}
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
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={secureTextEntry}
          value={confirmPassword}
        />
        <View style={{position: 'absolute', left: 8, top: '35%'}}>
          <SvgLock />
        </View>
      </View>
      <View style={{marginTop: 50}}>
        <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
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
    marginTop: 20,
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
