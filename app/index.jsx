import {Text, View, StatusBar, TextInput, TouchableOpacity, Image } from "react-native";
import "../global.css";
import { useRouter } from "expo-router";
import axios from 'axios';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';


export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Hello message");
  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      const url = `https://backend1-1cc6.onrender.com/postsignIn/${email}/${password}/`;
      const response = await axios.get(url);
      
      if (response.status === 200) {
        const message = response.data.message; 
        if(message == "Successfully logged in"){
          // router.push("/home");
          navigation.navigate('home', {
            email,
          });
      
        }
        else{
          alert(message);
        }
        return message;
      } else {
        console.error("Login Failed:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return null;
    }
  };

  const handleForgotPassword = async() => {
    try {
      const url = `https://backend1-1cc6.onrender.com/postReset/${email}/`;
      const response = await axios.get(url);
      alert(response.data.message);
    } catch (error) {
      console.error("Error logging in:", error);
      return null;
    }

  }
    
  return (
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
      <Image source={require('../assets/images2/logo.png')} className="w-full h-56 mb-4" style={{ resizeMode:"contain", height:100}}/>
      <Text className="text-3xl font-bold text-gray-800 mb-6">ChamaVault</Text>
      <Text className="text-lg font-bold">Enter your email</Text>
      <TextInput 
      placeholder="Enter your email"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className="text-lg font-bold">Enter your password</Text>
      <TextInput 
      placeholder="Enter your password"
      secureTextEntry
      value={password}
      onChangeText={setPassword} 
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg"
      />
      
      <TouchableOpacity className="w-full flex-row justify-end m-5" onPress={handleForgotPassword}>
      <Text className="text-lg">Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={handleLogin}>
        <Text className="text-white text-center font-semibold text-lg">Login</Text>
      </TouchableOpacity>
      <Text className="text-lg">Do not have an account? <TouchableOpacity onPress={() => router.push("/register")}><Text className="text-yellow-600">Register</Text></TouchableOpacity></Text>
      <StatusBar/>
    </View>
  );
}
