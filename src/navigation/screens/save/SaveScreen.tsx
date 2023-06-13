import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import SvgDelete from '../../../assets/images/Delete';
import { removeSave } from '../../../redux/save/SaveSlice';
import { Dimensions } from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const WIDTH = Dimensions.get('window').width;

const SaveScreen = ({ navigation }: any) => {
  const themeMode = useSelector((state: RootState) => state.theme.themeMode);

  const containerStyle: any = {
    flex: 1,
    backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
  };

  const textStyle: any = {
    color: themeMode === 'dark' ? '#fff' : '#000',
  };

  const save = useSelector((state: RootState) => state.save.save);

  const noBlogText: any = {
    color: themeMode === 'dark' ? '#fff' : '#000',
    fontSize: 20,
    fontWeight: 'bold',
  };

  const formatDate = (date: string) => {
    return moment(date).format('D MMMM');
  };

  const cardItemTextColor: any = {
    color: themeMode === 'dark' ? '#fff' : '#000',
  };

  const dispatch = useDispatch();

  const handleDelete = (item: any) => {
    dispatch(removeSave(item));
  };

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', { id: item._id })}
        style={styles.cardItem}
      >
        <View style={styles.image}>
          <Image source={{ uri: item.avatar }} style={styles.image} />
          <View style={styles.dateImage}>
            <Text style={{ color: '#000', fontWeight: '500' }}>{formatDate(item.createdAt)}</Text>
          </View>
        </View>
        <View style={styles.cardText}>
          <Text style={[styles.cardItemText, cardItemTextColor]}>{item.title}</Text>
        </View>
        <TouchableOpacity style={styles.delete} onPress={() => handleDelete(item)}>
          <SvgDelete />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={containerStyle}>
      {save.length > 0 ? (
        <>
          <Text style={[styles.headerText, textStyle]}>Saved Blogs</Text>
          <View style={styles.scroll}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={save}
              renderItem={renderItem}
              keyExtractor={item => item._id}
            />
          </View>
        </>
      ) : (
        <View style={styles.noBlogContainer}>
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
  cardItem: {
    flexDirection: 'row',
    marginVertical: 5,
    width: WIDTH - 40,
    padding: 10,
    borderRadius: 25,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  dateImage: {
    position: 'absolute',
    bottom: 3,
    left: 5,
    backgroundColor: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  cardItemText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  cardText: {
    width: WIDTH - 225,
    marginLeft: 5,
  },
  delete: {
    position: 'absolute',
    right: 5,
    bottom: 10,
    width: 40,
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  scroll: {
    marginTop: 20,
    flex: 1,
  },
  noBlogContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
