import {Text, View, StatusBar, TextInput, TouchableOpacity, Image,SafeAreaView, ScrollView } from "react-native";
import "../global.css";
import { useRouter } from "expo-router";

export default function Register(){
    const router = useRouter();
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
        
      <Text className="text-lg font-bold">Enter your fullname</Text>
      <TextInput 
      placeholder="Enter your fullname"
      keyboardType="email-address"
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className="text-lg font-bold">Enter your phonenumber</Text>
      <TextInput 
      placeholder="Enter your phonenumber"
      keyboardType="email-address"
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
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
      <Text className="text-lg font-bold">Confirm your password</Text>
      <TextInput 
      placeholder="Confirm your password"
      secureTextEntry 
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg"
      />
      
      <TouchableOpacity className="w-full flex-row justify-end m-5" onPress={() => alert("Got to forgot password page")}>
      </TouchableOpacity>
      <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={() => router.push("/home")}>
        <Text className="text-white text-center font-semibold text-lg">Register</Text>
      </TouchableOpacity>
      <Text className="text-lg">Already have an account? <TouchableOpacity onPress={() => alert("Go to Login")}><Text className="text-yellow-600">Login</Text></TouchableOpacity></Text>
      <StatusBar/>
      </View>
      </ScrollView>
      </SafeAreaView>
    
    );
}