import {Text, View, StatusBar, TextInput, TouchableOpacity, Image } from "react-native";
import "../global.css";


export default function Index() {
  return (
    <View className="flex-1 bg-white justify-center items-center p-5">
      <Image source={require('../assets/images2/logo.png')} className="w-full h-56 mb-4" style={{ resizeMode:"contain", height:100}}/>
      <Text className="text-3xl font-bold text-gray-800 mb-6">ChamaVault</Text>
      <TextInput 
      placeholder="Enter your email"
      keyboardType="email-address"
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600"
      />
      <TextInput 
      placeholder="Enter your password"
      secureTextEntry 
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-yellow-600"
      />
      
      <TouchableOpacity className="w-full flex-row justify-end m-5" onPress={() => alert("Got to forgot password page")}>
      <Text>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={() => alert("You clicked login button!")}>
        <Text className="text-white text-center font-semibold text-lg">Login</Text>
      </TouchableOpacity>
      <Text>Already have an account? <TouchableOpacity onPress={() => alert("Go to Login")}><Text className="text-yellow-600">Login</Text></TouchableOpacity></Text>
      <StatusBar/>
    </View>
  );
}