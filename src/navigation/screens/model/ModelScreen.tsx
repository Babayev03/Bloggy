import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;

const ModelScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>You are sucessfully created new account</Text>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#000'}]}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Go to Login screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#000',
    fontSize: 35,
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
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
    paddingHorizontal: WIDTH - 295,
    paddingVertical: 15,
    marginTop: 35,
  },
});
