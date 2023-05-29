import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux';
import {useEffect} from 'react';
import {getBlogById} from '../../../redux/blog/BlogSlice';

const DetailScreen = (route: any) => {
  const id = route.route.params.id;

  const themeMode = useSelector<RootState, any>(state => state.theme.themeMode);

  const containerStyle: any = {
    flex: 1,
    backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getBlogById(id));
  }, []);

  const data = useSelector<RootState, any>((state) => state.blog);

  return (
    <View style={containerStyle}>
      {data.loading === 'pending' ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <Text style={{color: 'red'}}>{data.data.title}</Text>
      )}
    </View>
  );
};

export default DetailScreen;
