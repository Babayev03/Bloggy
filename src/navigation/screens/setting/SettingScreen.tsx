import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SvgDarkIcon from '../../../assets/images/DarkIcon';
import SvgLightIcon from '../../../assets/images/LightIcon';
import {toggleTheme} from '../../../redux/theme/ThemeSlice';

const SettingScreen = () => {
  const themeMode = useSelector((state: any) => state.theme.themeMode);
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const containerStyle: any = {
    flex: 1,
    backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <View style={[containerStyle]}>
      {themeMode === 'dark' ? <SvgDarkIcon /> : <SvgLightIcon />}
      <TouchableOpacity style={styles.button} onPress={handleToggleTheme}>
        <Text style={styles.buttonText}>Change Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  buttonText: {
    color: '#e3e3e3',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#80669d',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
