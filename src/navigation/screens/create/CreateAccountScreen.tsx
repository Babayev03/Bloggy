import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import SvgStars from '../../../assets/images/Stars';
import SvgGoogle from '../../../assets/images/GoogleIcon';
import SvgEmail from '../../../assets/images/EmaiIIcon';
import {useNavigation} from '@react-navigation/native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const CreateAccountScreen = () => {
  const navigation = useNavigation<any>();

  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '416616734802-nonmgqfpueetg7skslqacbdi8ks71rcu.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      Alert.alert(JSON.stringify(userInfo));
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("canceld brat",error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("operation",error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("play service not available",error);
      } else {
        // some other error happened
        console.log("some other",error);
      }
    }
  };

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
        <TouchableOpacity
          style={[styles.button, {marginTop: 35}]}
          onPress={() => signIn()}>
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
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
