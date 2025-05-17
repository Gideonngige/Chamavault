import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator, StatusBar, Alert } from 'react-native';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export default function UpdateProfile() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [memberId, setMemberId] = useState(0);
  const [profileImg, setProfileImg] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const member_id = await AsyncStorage.getItem('member_id');
      const email = await AsyncStorage.getItem('email');
      const name = await AsyncStorage.getItem('name');
      const phone_number = await AsyncStorage.getItem('phonenumber');
      const profile_image = await AsyncStorage.getItem('profile_image');
      setEmail(email);
      setFullname(name);
      setPhonenumber(phone_number);
      setMemberId(member_id);
      setProfileImg(profile_image);
    }
    fetchData();
  }, []);

  // Pick an image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      setProfileImg(uri); // update preview
    }
  };

  const handleUpdate = async () => {
    if (fullname === "" || phonenumber === "") {
      Alert.alert("Empty field", "Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("member_id", memberId);
      formData.append("name", fullname);
      formData.append("phone_number", phonenumber);

      if (selectedImage) {
        const filename = selectedImage.split('/').pop();
        const match = /\.(\w+)$/.exec(filename ?? '');
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("profile_image", {
          uri: selectedImage,
          name: filename,
          type,
        });
      }

      const response = await axios.post(
        "https://backend1-1cc6.onrender.com/updateprofile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 && response.data.message === "ok") {
        Alert.alert("Success", "Updated successfully");
      } else {
        Alert.alert("Error", "An error occurred");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
          <TouchableOpacity onPress={pickImage} className="items-center mb-4">
            <Image
              source={{ uri: profileImg }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                borderWidth: 3,
                borderColor: '#fff',
                resizeMode: 'cover',
              }}
            />
            <Text className="text-blue-500 mt-2 underline font-lato">Change Photo</Text>
          </TouchableOpacity>

          <Text className="w-full text-lg font-bold font-lato">Your full name</Text>
          <TextInput
            placeholder="e.g John Doe"
            value={fullname}
            onChangeText={setFullname}
            className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg font-lato"
          />

          <Text className="w-full text-lg font-bold font-lato">Your phone number</Text>
          <TextInput
            placeholder="e.g 0712345678"
            value={phonenumber}
            onChangeText={setPhonenumber}
            keyboardType="phone-pad"
            className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg font-lato"
          />

          <TouchableOpacity className="w-full bg-green-600 p-4 rounded-lg" onPress={handleUpdate}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg font-lato">Update</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    </SafeAreaView>
  );
}
