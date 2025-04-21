import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity,Image, ActivityIndicator, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { push } from 'expo-router/build/global-state/routing';
import { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



export default function UpdateProfile() {
   const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [fullname,setFullname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [memberId, setMemberId] = useState(0);

  // function to fetch all items
  useEffect(() => {
    const fetchData = async() =>{
      const member_id = await AsyncStorage.getItem('member_id');
      const email = await AsyncStorage.getItem('email');
      const name = await AsyncStorage.getItem('name');
      const phone_number = await AsyncStorage.getItem('phonenumber');
      setEmail(email);
      setFullname(name);
      setPhonenumber(phone_number);
      setMemberId(member_id);
    }
    fetchData();
  }, []);
  // end of function to fetch all items

  // function to handel update profile
  const handleUpdate = async() =>{
    if(fullname == "" || phonenumber == ""){
      alert("Please fill all fields");
    }
    else{
      setIsLoading(true);
      try{
        const url = "https://backend1-1cc6.onrender.com/updateprofile/";
        const data = {
              member_id: memberId,
              name: fullname,
              phone_number: phonenumber,
          };
        const response = await axios.post(url, data, {
            headers: { "Content-Type": "application/json" },
        });
        
        if(response.status == 200){
          if(response.data.message == "ok"){
            alert("Updated successfully");
          }

        }
        else{
          alert("An error occurred");
        }

      }
      catch(error){
        alert(error);
      }
      finally{
        setIsLoading(false);
      }

    }
    
    
  }
  // end of function to handle update profile


  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
        <View className="items-center mb-8">
        <Image 
        source={require('../assets/images2/profile3.png')}
        style={{width: 150, height: 150, borderRadius: 75, borderWidth: 3,borderColor: '#fff',resizeMode: 'cover',
        }}
      />
      <Text className='font-bold text-lg'>{email}</Text>
    </View>
    <Text className="w-full text-lg font-bold">Your fullname</Text>
      <TextInput 
      placeholder="e.g John Doe"
      value={fullname}
      onChangeText={setFullname}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className="w-full text-lg font-bold">Your phonenumber</Text>
      <TextInput 
      placeholder="e.g 0712345678"
      value={phonenumber}
      onChangeText={setPhonenumber}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={handleUpdate}>
      {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Update</Text>}
      </TouchableOpacity>

        </View>
      </ScrollView>
      <StatusBar
            barStyle="dark-content" // or "light-content" depending on your background
            backgroundColor="transparent"
            translucent={true}
          />
    </SafeAreaView>
  );
}