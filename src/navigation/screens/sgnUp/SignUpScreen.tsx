import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import SvgArrow from '../../../assets/images/Arrow';
import {useNavigation} from '@react-navigation/native';
import SvgProfile from '../../../assets/images/ProfileIcon';
import SvgLock from '../../../assets/images/LockIcon';
import {ThemedButton} from 'react-native-really-awesome-button';
import SvgOpenEye from '../../../assets/images/OpenEye';
import SvgCloseEye from '../../../assets/images/CloseEye';
import SvgLine from '../../../assets/images/LineIcon';

const SignUpScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const handleProgress = (release: any) => setTimeout(release, 1000);

  const handleSecure = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
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
          secureTextEntry={secureTextEntry ? true : false}
        />
        <View style={{position: 'absolute', left: 8, top: '35%'}}>
          <SvgLock />
        </View>
      </View>
      <View style={{alignSelf: 'center', marginTop: 25}}>
        <ThemedButton
          progress
          name="bruce"
          type="secondary"
          onPress={handleProgress}
          size="medium">
          <Text style={styles.buttonText}>Sign Up</Text>
        </ThemedButton>
      </View>
      <View>
        <SvgLine />
      </View>
    </View>
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
    color: '#000',
    paddingVertical: 10,
  },
});
