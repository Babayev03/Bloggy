import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import SvgStars from '../../../assets/images/Stars';
import SvgGoogle from '../../../assets/images/GoogleIcon';
import SvgEmail from '../../../assets/images/EmaiIIcon';
import {useNavigation} from '@react-navigation/native';

const CreateAccountScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <View style={styles.backGround}>
        <View style={styles.stars}>
          <SvgStars fill={'none'} />
        </View>
        <View style={styles.explore}>
          <Text style={styles.exploreText}>Explore the app</Text>
        </View>
        <View style={styles.under}>
          <Text style={styles.underText}>
            Here you can easily see what people are sharing
          </Text>
        </View>
        <TouchableOpacity style={[styles.button, {marginTop: 35}]}>
          <SvgGoogle />
          <Text style={[styles.buttonText]}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {marginTop: 10}]}
          onPress={() => navigation.navigate('SignUp')}>
          <SvgEmail />
          <Text style={[styles.buttonText]}>Continue with Email</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logIn}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.logInLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  backGround: {
    backgroundColor: '#d3daeb',
    height: 600,
    marginTop: 60,
    marginHorizontal: 10,
    borderRadius: 32,
  },
  stars: {
    alignItems: 'center',
    marginTop: 20,
  },
  explore: {
    marginTop: 18,
    alignItems: 'center',
  },
  exploreText: {
    fontSize: 32,
    fontFamily: 'Raleway-Bold',
    color: '#000',
  },
  under: {
    marginTop: 11,
    alignItems: 'center',
    marginHorizontal: 25,
  },
  underText: {
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    color: '#000',
    opacity: 0.6,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
    color: '#000',
  },
  logIn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginText: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#000',
    opacity: 0.8,
    textAlign: 'center',
  },
  logInLink: {
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    color: '#000',
    textAlign: 'center',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});
