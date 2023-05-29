import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const AddScreen = () => {
  const themeMode = useSelector((state: any) => state.theme.themeMode);

  const containerStyle: any = {
    flex: 1,
    backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <View style={containerStyle}>
      <Text>AddScreen</Text>
    </View>
  );
};

export default AddScreen;
