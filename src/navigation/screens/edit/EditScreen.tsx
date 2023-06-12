import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {AppDispatch} from '../../../redux';
import {updateBlog} from '../../../redux/blog/BlogSlice';

const EditScreen = ({route, navigation}: any) => {
  const {item} = route.params;

  const [title, setTitle] = useState<any>(item.title);
  const [description, setDescription] = useState<any>(item.description);

  const themeMode = useSelector((state: any) => state.theme.themeMode);
  const dispatch = useDispatch<AppDispatch>();

  const containerStyle: any = {
    flex: 1,
    backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
  };

  const headerTextColor: any = {
    color: themeMode === 'dark' ? '#fff' : '#000',
  };

  const placeHolderTextColor: any = themeMode === 'dark' ? '#fff' : '#000';

  const inputColor: any = {
    borderWidth: 2,
    borderColor: themeMode === 'dark' ? '#fff' : '#000',
  };

  const buttonBackColor: any = {
    backgroundColor: themeMode === 'dark' ? '#fff' : '#000',
    borderWidth: 2,
    borderColor: themeMode === 'dark' ? '#fff' : '#000',
  };

  const buttonTextColor: any = {
    color: themeMode === 'dark' ? '#000' : '#fff',
  };

  const handleEditBlog = () => {
    if (title === '' || description === '') {
      Alert.alert('Empty Inputs', 'Please Fill Inputs Then Press Add Again', [
        {text: 'OK'},
      ]);
      return;
    } else if (title.length < 5 || description.length < 5) {
      Alert.alert(
        'Invalid Inputs',
        'Please Fill Inputs With 5 Characters At Least Then Press Add Again',
        [{text: 'OK'}],
      );
      return;
    } else if (title.length > 50) {
      Alert.alert(
        'Invalid Inputs',
        'Please Fill Title Input With 20 Characters At Most Then Press Add Again',
        [{text: 'OK'}],
      );
      return;
    }
    const data = {
      id: item._id,
      title: title,
      description: description,
    };
    dispatch(updateBlog(data));
    navigation.goBack();
  };

  return (
    <ScrollView style={containerStyle} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={[styles.headerText, headerTextColor]}>Edit Blog</Text>
      </View>
      <View style={[styles.input, inputColor]}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          placeholderTextColor={placeHolderTextColor}
          style={{color: placeHolderTextColor, fontSize: 18}}
        />
      </View>
      <View style={[styles.input, inputColor]}>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          placeholderTextColor={placeHolderTextColor}
          style={{
            color: placeHolderTextColor,
            fontSize: 18,
            textAlignVertical: 'top',
            width: '100%',
          }}
          multiline={true}
          numberOfLines={3}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, buttonBackColor]}
        onPress={() => handleEditBlog()}>
        <Text style={[styles.buttonText, buttonTextColor]}>Edit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
