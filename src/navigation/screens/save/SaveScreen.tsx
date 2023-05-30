import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import moment from 'moment';
import SvgDelete from '../../../assets/images/Delete';
import {Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;

const SaveScreen = ({navigation}: any) => {
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

  const formatDate = (date: string) => {
    return moment(date).format('D MMMM');
  };

  const cardItemTextColor: any = {
    color: themeMode === 'dark' ? '#fff' : '#000',
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {id: item.id})}
        style={styles.cardItem}>
        <View style={styles.image}>
          <Image source={{uri: item.avatar}} style={styles.image} />
          <View style={styles.dateImage}>
            <Text style={{color: '#000', fontWeight: '500'}}>
              {formatDate(item.createdAt)}
            </Text>
          </View>
        </View>
        <View style={styles.cardText}>
          <Text style={[styles.cardItemText, cardItemTextColor]}>
            {item.title}
          </Text>
        </View>
        <TouchableOpacity style={styles.delete}>
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
          <FlatList
            data={save}
            renderItem={renderItem}
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
  cardItem: {
    flexDirection: 'row',
    marginVertical: 5,
    width: WIDTH - 40,
    padding: 10,
    borderRadius: 25,
  },
  image: {
    width: 120,
    height: 100,
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
    width: WIDTH - 155,
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
});
