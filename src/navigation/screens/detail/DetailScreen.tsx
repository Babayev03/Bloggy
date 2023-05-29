import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux';
import {useEffect} from 'react';
import {getBlogById} from '../../../redux/blog/BlogSlice';
import SvgArrow from '../../../assets/images/Arrow';

const DetailScreen = ({route, navigation}: any) => {
  const {id} = route.params;

  const themeMode = useSelector<RootState, any>(state => state.theme.themeMode);

  const containerStyle = {
    flex: 1,
    backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBlogById(id));
  }, []);

  const data = useSelector<RootState, any>(state => state.blog);

  const titleText: any = {
    color: themeMode === 'dark' ? '#fff' : '#000',
  };

  return (
    <View style={containerStyle}>
      {data.loading === 'pending' ? null : (
        <>
          <TouchableOpacity
            style={styles.arrow}
            onPress={() => navigation.goBack()}>
            <SvgArrow stroke={themeMode === 'dark' ? '#fff' : '#000'} />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image source={{uri: data.data.avatar}} style={styles.image} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, titleText]}>{data.data.title}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{data.data.description}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  arrow: {
    marginVertical: 15,
    marginLeft: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 25,
  },
  image: {
    width: 315,
    height: 250,
    borderRadius: 15,
  },
  titleContainer: {
    marginVertical: 25,
    marginHorizontal: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginHorizontal: 25,
  },
  description: {
    color: 'gray',
    fontSize: 20,
  },
});
