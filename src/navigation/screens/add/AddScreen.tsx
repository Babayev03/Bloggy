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
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {AppDispatch} from '../../../redux';
import {addBlog} from '../../../redux/blog/BlogSlice';
import {launchImageLibrary} from 'react-native-image-picker';

const AddScreen = () => {
  const [title, setTitle] = useState<any>('');
  const [description, setDescription] = useState<any>('');
  const [base64Data, setbase64Data] = useState<string>('');

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

    const blog = {
      title: title,
      description: description,
    };

    dispatch(addBlog(blog));
    setTitle('');
    setDescription('');
  };

  const handleUplad = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      res => {
        let base = res.assets != undefined ? res.assets[0] : null;

        let imageData = base?.base64;
        setbase64Data(imageData == undefined ? '' : imageData);
      },
    );
    console.log(base64Data);
  };

  return (
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
        onPress={() => handleAddBlog()}>
        <Text style={[styles.buttonText, buttonTextColor]}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, buttonBackColor]}
        onPress={() => handleUplad()}>
        <Text style={[styles.buttonText, buttonTextColor]}>Add</Text>
      </TouchableOpacity>
      <Image source={{uri: `data:image/jpeg;base64,${base64Data}`}} style={{width:100,height:100}} />
    </ScrollView>
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
