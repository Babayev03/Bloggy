import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux';
import { addBlog } from '../../../redux/blog/BlogSlice';
import { launchImageLibrary } from 'react-native-image-picker';

const AddScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [base64Data, setbase64Data] = useState('');

  const themeMode = useSelector((state: any) => state.theme.themeMode);
  const dispatch = useDispatch<AppDispatch>();

  const containerStyle = {
    flex: 1,
    backgroundColor: themeMode === 'dark' ? '#000' : '#fff',
  };

  const headerTextColor = {
    color: themeMode === 'dark' ? '#fff' : '#000',
  };

  const placeHolderTextColor = themeMode === 'dark' ? '#fff' : '#000';

  const inputColor = {
    borderWidth: 2,
    borderColor: themeMode === 'dark' ? '#fff' : '#000',
  };

  const buttonBackColor = {
    backgroundColor: themeMode === 'dark' ? '#fff' : '#000',
    borderWidth: 2,
    borderColor: themeMode === 'dark' ? '#fff' : '#000',
  };

  const buttonTextColor = {
    color: themeMode === 'dark' ? '#000' : '#fff',
  };

  const handleAddBlog = () => {
    if (title === '' || description === '') {
      Alert.alert('Empty Inputs', 'Please Fill Inputs Then Press Add Again', [
        { text: 'OK' },
      ]);
      return;
    } else if (title.length < 5 || description.length < 5) {
      Alert.alert(
        'Invalid Inputs',
        'Please Fill Inputs With 5 Characters At Least Then Press Add Again',
        [{ text: 'OK' }],
      );
      return;
    } else if (title.length > 50) {
      Alert.alert(
        'Invalid Inputs',
        'Please Fill Title Input With 20 Characters At Most Then Press Add Again',
        [{ text: 'OK' }],
      );
      return;
    }

    const blog = {
      title: title,
      description: description,
    };

    dispatch(addBlog(blog));
    setTitle('');
    setDescription('');
  };

  const handleUpload = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      res => {
        const base = res.assets != undefined ? res.assets[0] : null;
        const imageData = base?.base64;
        setbase64Data(imageData == undefined ? '' : imageData);
      },
    );
  };

  return (
    <View style={containerStyle}>
      <ScrollView style={containerStyle} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.headerText, headerTextColor]}>Add Blog</Text>
        </View>
        <View style={[styles.input, inputColor]}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor={placeHolderTextColor}
            style={{ color: placeHolderTextColor, fontSize: 18 }}
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
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            style={[styles.uploadButton, buttonBackColor]}
            onPress={handleUpload}
          >
            <Text style={[styles.uploadButtonText, buttonTextColor]}>
              Upload Image
            </Text>
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${base64Data}` }}
              style={styles.selectedImage}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, buttonBackColor]}
        onPress={handleAddBlog}
      >
        <Text style={[styles.buttonText, buttonTextColor]}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
    marginTop:10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  uploadButton: {
    marginHorizontal: 16,
    marginVertical: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: 30,
  },
  selectedImage: {
    width: 150,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
});
