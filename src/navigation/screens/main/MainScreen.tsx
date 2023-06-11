import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteBlog, getAllblog} from '../../../redux/blog/BlogSlice';
import {AppDispatch, RootState} from '../../../redux';
import {Dimensions} from 'react-native';
import SvgDelete from '../../../assets/images/Delete';
import moment from 'moment';
import {useEffect} from 'react';
import {getTheme} from '../../../redux/theme/ThemeSlice';
import {ListItem} from '@rneui/themed';
const WIDTH = Dimensions.get('window').width;

const MainScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const getBlog = () => {
    dispatch(getAllblog());
  };

  useEffect(() => {
    getBlog();
    dispatch(getTheme());
  }, []);
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

  const handleRemove = (id: string) => {
    dispatch(deleteBlog(id));
  };

  const formatDate = (date: string) => {
    return moment(date).format('D MMMM');
  };

  const inputStyle: any = {
    backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
    color: themeMode === 'dark' ? '#fff' : '#000',
    borderColor: themeMode === 'dark' ? '#fff' : '#000',
  };

  const filteredData = data.datas.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const noBlogTextColor: any = {
    color: themeMode === 'dark' ? '#fff' : '#000',
  };

  const renderItem = ({item}: any) => {
    return (
      // <TouchableOpacity
      //   onPress={() => navigation.navigate('Detail', {id: item.id})}>
        <ListItem.Swipeable
          leftContent={reset => <Button title="Info" onPress={() => reset()} />}
          rightContent={reset => (
            <Button title="Delete" onPress={() => reset()} />
          )}>
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      // </TouchableOpacity>
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
      <View style={styles.inputView}>
        <TextInput
          placeholder="🔍  Search"
          placeholderTextColor={themeMode === 'dark' ? '#fff' : '#000'}
          style={[styles.input, inputStyle]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.card}>
        {filteredData.length === 0 ? (
          <Text style={[styles.noBlog, noBlogTextColor]}>No blogs found</Text>
        ) : (
          <FlatList
            refreshing={false}
            onRefresh={getBlog}
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  dateImage: {
    position: 'absolute',
    bottom: 3,
    left: 5,
    backgroundColor: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  input: {
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    borderWidth: 2,
    fontWeight: '500',
  },
  noBlog: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputView: {
    marginBottom: 10,
  },
});
