import {Text, View, StatusBar, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView, SafeAreaView } from "react-native";
import "../global.css";
import { useRouter } from "expo-router";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';


export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Hello message");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const navigation = useNavigation();
  const handleLogin = async () => {
    if(email == "" || password == ""){
      Toast.show({
        type: "error", // Can be "success", "error", "info"
        text1: "Empty fields",
        text2: "Please fill in all fields",
      });
      return;
    }
    else{
    setIsLoading(true);
    try {
      const url = `https://backend1-1cc6.onrender.com/postsignIn/${email}/${password}/${value}/`;
      const response = await axios.get(url);
      const url2 = `https://backend1-1cc6.onrender.com/getMember/${email}/${value}/`;
      const response2 = await axios.get(url2);
      
      if (response.status === 200 && response2.status === 200) {
        if(response2.data.role == "chairperson" || response2.data.role == "treasurer" || response2.data.role == "secretary" || response2.data.role == "member" ){
          
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('selected_chama', value ? value : "No Chama");
          await AsyncStorage.setItem('role', response2.data.role);
          await AsyncStorage.setItem('name', response2.data.name);
          await AsyncStorage.setItem('member_id', JSON.stringify(response2.data.member_id));
          await AsyncStorage.setItem('chama_id', JSON.stringify(response2.data.chama));
          // alert(response2.data.member_id);
          router.push('/admin');

        }
      else{
        const message = response.data.message; 
        if(message == "Successfully logged in"){
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('selected_chama', value ? value : "No Chama");
          await AsyncStorage.setItem('member_id', JSON.stringify(response2.data.member_id));
          // alert(response2.data.member_id);
          // router.push("/home");
          navigation.navigate('home', {
            email,
          });
      
        }
        else{
          Toast.show({
            type: "error",
            text1: "Login Failed",
            text2: message,
          });
          // alert(message);
        }
      }
        return message;
      } else {
        Toast.show({
          type: "error", // Can be "success", "error", "info"
          text1: "Login failed",
          text2: response.data,
        });
        // alert("Login Failed:", response.data);
        return null;
      }
    } catch (error) {
      console.log(error?.message)
      Toast.show({
        type: "error", // Can be "success", "error", "info"
        text1: "Login failed catched",
        text2: error?.message || "Unknown error",
      });
      return null;
    }
    finally{
      setIsLoading(false);
    }
  }
  };

  // fetch chamas
  useEffect(() => {
    const fetchChamas = async () => {
      try{
        const url = `https://backend1-1cc6.onrender.com/allchamas/`;
        const response = await axios.get(url);
        if(response.status === 200){
          const formattedItems = response.data.Chamas.map((chama) => ({
            label: chama.name,
            value: chama.name, // Use an ID if available
          }));
          setItems(formattedItems);
          // await AsyncStorage.setItem('chama', chama);
        }

      }
      catch(error){
        console.error("Error fetching chamas:", error);
      }

    }
    const interval = setInterval(() => {
      fetchChamas();
    }, 5000); // 5 seconds
  
    // Clear interval when component unmounts
    return () => clearInterval(interval);
    
  },[]);
  // end of fetch chamas
    
  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
      <Image source={require('../assets/images2/logo.png')} className="w-full h-56 mb-4" style={{ resizeMode:"contain", height:100}}/>
      <Text className="text-3xl font-bold text-gray-800 mb-6">ChamaVault</Text>
      <Text className="w-full text-lg font-bold">Enter your email</Text>
      <TextInput 
      placeholder="Enter your email"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className="w-full text-lg font-bold">Enter your password</Text>
      <TextInput 
      placeholder="Enter your password"
      secureTextEntry
      value={password}
      onChangeText={setPassword} 
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-2 border border-yellow-600 text-gray-400 text-lg"
      />

     <View className="w-full">
        <Text className="text-lg font-bold">Select Chama</Text>
          <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select a chama(optional)"
          searchable={true} // Enable searching
          searchPlaceholder="Search for a chama..."
          searchTextInputProps={{
          autoCorrect: false,
          autoCapitalize: "none",
          }}
          style={{borderColor: '#ca8a04',borderWidth: 2}}
          listMode="SCROLLVIEW"
         />
      </View>

      <TouchableOpacity className="w-full flex-row justify-end m-4" onPress={() => router.push("/forgotpassword")}>
      <Text className="text-lg">Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={handleLogin}>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Login</Text> }
        
      </TouchableOpacity>
      <View className="flex-row justify-center mt-4">
      <Text className="text-lg">Do not have an account? </Text>
      <TouchableOpacity onPress={() => router.push("/register")}>
      <Text className="text-lg text-yellow-600">Register</Text>
      </TouchableOpacity>
      </View>
      <Toast/>
      
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
