import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addSave, removeSave} from '../../../redux/save/SaveSlice';
import {getBlogById} from '../../../redux/blog/BlogSlice';
import SvgArrow from '../../../assets/images/Arrow';
import SvgHeartIcon from '../../../assets/images/SaveIcon';
import {AppDispatch, RootState} from '../../../redux';
import {Dimensions} from 'react-native';
import {getLoggedIn} from '../../../redux/login/LoginSlice';

const WIDTH = Dimensions.get('window').width;

const DetailScreen = ({route, navigation}: any) => {
  const [isSaved, setIsSaved] = useState(false);
  const {id} = route.params;

  const themeMode = useSelector<RootState, any>(
    (state: RootState) => state.theme.themeMode,
  );
  const save = useSelector<RootState, any>(
    (state: RootState) => state.save.save,
  );
  const savedItemIds = save.map((item: any) => item._id);

  const containerStyle = {
    flex: 1,
    backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBlogById(id));
    getLoggedIn();
  }, [dispatch, id]);

  useEffect(() => {
    setIsSaved(savedItemIds.includes(id));
  }, [savedItemIds, id]);

  const handleSave = (item: any) => {
    if (isSaved) {
      dispatch(removeSave(item));
    } else {
      dispatch(addSave(item));
    }
  };

  const data = useSelector<RootState, any>((state: RootState) => state.blog);
  const result = useSelector<RootState, any>((state: any) => state.login);

  const titleText: any = {
    color: themeMode === 'dark' ? '#fff' : '#000',
  };

  const buttonBackColor: any = {
    backgroundColor: themeMode === 'dark' ? '#fff' : '#000',
  };

  const buttonTextColor: any = {
    color: themeMode === 'dark' ? '#000' : '#fff',
  };

  return (
    <View style={containerStyle}>
      {data.loading === 'pending' ? null : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.arrow}
              onPress={() => navigation.goBack()}>
              <SvgArrow stroke={themeMode === 'dark' ? '#fff' : '#000'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.arrow}
              onPress={() => handleSave(data.data)}>
              <SvgHeartIcon stroke={'red'} fill={isSaved ? 'red' : 'none'} />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            {data.data.avatar ? (
              <Image source={{uri: data.data.avatar}} style={styles.image} />
            ) : null}
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, titleText]}>{data.data.title}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{data.data.description}</Text>
          </View>
        </ScrollView>
      )}
      {data.data.user === result.userID ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('Edit', {item: data.data})}
          style={[styles.editButton, buttonBackColor]}>
          <Text style={[styles.editText, buttonTextColor]}>Edit</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  arrow: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 25,
  },
  image: {
    width: WIDTH - 35,
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
  editButton: {
    width: 200,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  editText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
