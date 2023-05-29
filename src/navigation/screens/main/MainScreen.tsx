import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {deleteBlog, getAllblog} from '../../../redux/blog/BlogSlice';
import {AppDispatch, RootState} from '../../../redux';
import {Dimensions} from 'react-native';
import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import SvgDelete from '../../../assets/images/Delete';

const WIDTH = Dimensions.get('window').width;

const MainScreen = ({navigation}: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const getAllBlog = useCallback(() => {
    dispatch(getAllblog());
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAllBlog();
    }, [getAllBlog]),
  );
  const data = useSelector((state: RootState) => state.blog);

  const themeMode = useSelector<RootState, any>(state => state.theme.themeMode);

  const containerStyle: any = {
    flex: 1,
    backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
  };

  const cardItemTextColor: any = {
    color: themeMode === 'dark' ? '#fff' : '#000',
  };

  const headerTextColor: any = {
    color: themeMode === 'dark' ? '#fff' : '#000',
  };

  const handleRemove = (id:string) => {
    dispatch(deleteBlog(id));
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {id: item.id})}
        style={styles.cardItem}>
        <View style={styles.image}>
          <Image source={{uri: item.avatar}} style={styles.image} />
        </View>
        <View style={styles.cardText}>
          <Text style={[styles.cardItemText, cardItemTextColor]}>
            {item.title}
          </Text>
        </View>
        <TouchableOpacity style={styles.delete} onPress={() => handleRemove(item.id)}>
          <SvgDelete />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (data.loading === 'pending') {
    return (
      <View style={[containerStyle, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <View style={styles.header}>
        <Text style={[styles.headerText, headerTextColor]}>Blogs</Text>
      </View>
      <View style={styles.card}>
        <FlatList
          data={data.data}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 35,
  },
  header: {
    marginHorizontal: 20,
    marginVertical: 25,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
  },
  cardItem: {
    flexDirection: 'row',
    marginVertical: 10,
    width: WIDTH - 40,
    padding: 10,
    borderRadius: 25,
  },
  image: {
    width: 120,
    height: 100,
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
  date: {
    position: 'absolute',
    left: 5,
    bottom: 5,
    backgroundColor: 'red',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
