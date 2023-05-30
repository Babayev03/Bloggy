import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';

const SaveScreen = () => {
  const themeMode = useSelector((state: any) => state.theme.themeMode);

  const containerStyle: any = {
    flex: 1,
    backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
  };

  const textStyle: any = {
    color: themeMode === 'dark' ? '#fff' : '#000',
  };

  const save = useSelector<RootState, any>(state => state.save.save);

  const noBlogText: any = {
    color: themeMode === 'dark' ? '#fff' : '#000',
    fontSize: 20,
    fontWeight: 'bold',
  };

  return (
    <GestureHandlerRootView style={containerStyle}>
      {save.length > 0 ? (
        <>
          <Text style={[styles.headerText, textStyle]}>Saved Blogs</Text>
          <FlatList
            data={save}
            renderItem={({item}) => (
              <View>
                <Text style={{color: 'red'}}>{item.title}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={noBlogText}>No Saved Blogs</Text>
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default SaveScreen;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
