import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {AppDispatch} from '../../../redux';
import {addBlog} from '../../../redux/blog/BlogSlice';

const AddScreen = () => {
  const [title, setTitle] = useState<any>('');
  const [description, setDescription] = useState<any>('');

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

  const handleAddBlog = () => {
    const blog = {
      title: title,
      description: description,
    };

    dispatch(addBlog(blog));
    setTitle('');
    setDescription('');
  };

  return (
    <View style={containerStyle}>
      <View style={styles.header}>
        <Text style={[styles.headerText, headerTextColor]}>Add Blog</Text>
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
          style={{color: placeHolderTextColor, fontSize: 18}}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, buttonBackColor]}
        onPress={() => handleAddBlog()}>
        <Text style={[styles.buttonText, buttonTextColor]}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddScreen;

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
