import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import SvgStar from '../../../assets/images/Stars';

const RegisterScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <View style={styles.stars}>
        <SvgStar />
      </View>
      <View style={styles.explore}>
        <Text style={styles.exploreText}>Explore the app</Text>
      </View>
      <View style={styles.under}>
        <Text style={styles.underText}>
          Here you can easily see what people are sharing{' '}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, {marginTop: 50, backgroundColor: '#000'}]}>
        <Text style={[styles.buttonText, {color: '#fff'}]}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateAccount')}
        style={[
          styles.button,
          {
            marginTop: 20,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#000',
          },
        ]}>
        <Text style={[styles.buttonText, {color: '#000'}]}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
  },
  stars: {
    marginHorizontal: 37,
    marginTop: 100,
  },
  explore: {
    marginTop: 50,
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
    marginHorizontal: 25,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
  },
});
