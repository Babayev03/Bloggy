import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const FirstLogin = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize:25,fontFamily:'Raleway-Bold'}}>Welcome!</Text>
      </View>
      <View style={{width:150}}>
        <Text style={{fontSize:30,fontFamily:'Raleway-Bold'}}>Log in to get started</Text>
      </View>
      <View>
        <Image
          source={require('../../../assets/onboard/images/loginImage.png')}
          style={{width: 350, height: 350}}
        />
      </View>
    </View>
  );
};

export default FirstLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1823',
  },
  text: {
    color: '#000',
  },
});
