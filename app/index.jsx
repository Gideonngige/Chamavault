import {Text, View, StatusBar, TextInput, TouchableOpacity, Image } from "react-native";
import "../global.css";
import { useRouter } from "expo-router";


export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
      <Image source={require('../assets/images2/logo.png')} className="w-full h-56 mb-4" style={{ resizeMode:"contain", height:100}}/>
      <Text className="text-3xl font-bold text-gray-800 mb-6">ChamaVault</Text>
      <Text className="text-lg font-bold">Enter your email</Text>
      <TextInput 
      placeholder="Enter your email"
      keyboardType="email-address"
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className="text-lg font-bold">Enter your password</Text>
      <TextInput 
      placeholder="Enter your password"
      secureTextEntry 
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg"
      />
      
      <TouchableOpacity className="w-full flex-row justify-end m-5" onPress={() => alert("Got to forgot password page")}>
      <Text className="text-lg">Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={() => router.push("/verify")}>
        <Text className="text-white text-center font-semibold text-lg">Login</Text>
      </TouchableOpacity>
      <Text className="text-lg">Do not have an account? <TouchableOpacity onPress={() => alert("Go to Register page")}><Text className="text-yellow-600">Register</Text></TouchableOpacity></Text>
      <StatusBar/>
    </View>
  );
}