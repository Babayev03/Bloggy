import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import React from 'react';
  import SvgArrow from '../../../assets/images/Arrow';
  import {useNavigation} from '@react-navigation/native';
  
  const SignUpScreen = () => {
    const navigation = useNavigation<any>();
  
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => navigation.goBack()}>
          <SvgArrow stroke={'white'} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create Your {'\n'} Account</Text>
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="white"
          />
        </View>
      </View>
    );
  };
  
  export default SignUpScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1823',
    },
    goBack: {
      marginTop: 15,
      marginLeft: 15,
    },
    header: {
      marginTop: 50,
      marginLeft: 25,
    },
    headerText: {
      color: 'white',
      fontSize: 35,
      fontFamily: 'Raleway-Bold',
    },
    inputs: {
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 10,
      marginHorizontal: 25,
      marginTop: 20,
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 4,
      elevation: 4,
    },
    input: {
      color: 'white',
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
  });
  