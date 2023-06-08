import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import SvgGoogle from '../../../assets/images/GoogleIcon';
import {ThemedButton} from 'react-native-really-awesome-button';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const handleProgress = (release: any) => setTimeout(release, 1000);
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Text style={styles.welText}>Welcome!</Text>
      </View>
      <View style={styles.logView}>
        <Text style={styles.logText}>Log in to get started</Text>
      </View>
      <View>
        <Image
          source={require('../../../assets/onboard/images/loginImage.png')}
          style={styles.image}
        />
      </View>
      <View style={{alignSelf: 'center'}}>
        <ThemedButton
          name="bruce"
          type="secondary"
          onPress={handleProgress}
          size="large">
          <SvgGoogle />
          <Text style={styles.ButtonText}> Connect With Google</Text>
        </ThemedButton>
      </View>
      <View style={styles.slicer}>
        <Text style={styles.slicerText}>or</Text>
      </View>
      <View style={{alignSelf: 'center'}}>
        <ThemedButton
          name="bruce"
          type="secondary"
          onPress={handleProgress}
          size="large">
          <Text style={styles.ButtonText}>Log In With Your Email</Text>
        </ThemedButton>
      </View>
      <View style={styles.singUp}>
        <Text style={styles.signUpText}>Dont have an account?</Text>
        <TouchableOpacity
          style={styles.signNext}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.goSingnUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1823',
  },
  text: {
    color: '#000',
  },
  logText: {
    fontSize: 35,
    fontFamily: 'Raleway-Bold',
    color: '#e3e3e3',
  },
  logView: {
    marginHorizontal: 25,
    width: 300,
  },
  welText: {
    fontSize: 25,
    fontFamily: 'Raleway-Light',
    color: '#fff',
    fontWeight: '600',
    opacity: 0.6,
  },
  imageView: {
    marginTop: 55,
    marginHorizontal: 25,
  },
  image: {
    width: 350,
    height: 350,
  },
  button: {
    backgroundColor: '#fff',
    marginHorizontal: 25,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 10,
  },
  ButtonText: {
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    color: '#000',
    paddingVertical: 10,
  },
  slicer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  slicerText: {
    fontSize: 20,
    fontFamily: 'Raleway-Medium',
    color: '#fff',
    opacity: 0.6,
  },
  singUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  signUpText: {
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    color: '#fff',
    opacity: 0.6,
  },
  signNext: {
    fontSize: 20,
    fontFamily: 'Raleway-Medium',
    color: '#fff',
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goSingnUp: {
    color: 'green',
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
  },
});
