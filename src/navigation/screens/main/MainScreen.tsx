import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import moment from 'moment';
import {getAllblog, deleteBlog} from '../../../redux/blog/BlogSlice';
import {getTheme} from '../../../redux/theme/ThemeSlice';
import {RootState, AppDispatch} from '../../../redux';
import SvgDelete from '../../../assets/images/Delete';

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
  const themeMode = useSelector<RootState>(state => state.theme.themeMode);

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
    console.log(id);
    
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

  const renderItem = ({item}: any, rowMap: any) => {
    return (
      <Pressable
        style={[
          styles.cardItem,
          {backgroundColor: themeMode === 'dark' ? '#000' : '#fff'},
        ]}
        onPress={() => navigation.navigate('Detail', {id: item._id})}
        >
        <View>
          <Image source={{uri: item.avatar}} style={styles.image} />
            <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
        </View>
        <View style={styles.cardText}>
          <Text style={[styles.cardItemText, cardItemTextColor]}>
            {item.title}
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderHiddenItem = ({item}: any, rowMap: any) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleRemove(item._id)}>
          <SvgDelete />
        </TouchableOpacity>
      </View>
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
          <SwipeListView
            refreshing={false}
            onRefresh={() => getBlog()}
            data={filteredData}
            style={styles.card}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-75}
            disableRightSwipe={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id}
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
    marginHorizontal: 10,
    flex: 1,
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
  cardText: {
    marginLeft: 15,
    marginTop:15,
    width: WIDTH - 275,
  },
  cardItemText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  date: {
    position: 'absolute',
    left: 5,
    bottom: 5,
    backgroundColor: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 5,
    color: '#000',
    borderRadius: 10,
    fontWeight: 'bold',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingLeft: 32,
    paddingRight: 16,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
