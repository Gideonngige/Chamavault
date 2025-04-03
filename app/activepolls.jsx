import {Text, View, StatusBar, TextInput, TouchableOpacity,SafeAreaView, ScrollView, Image, ActivityIndicator } from "react-native";
import "../global.css";
import { useRouter } from "expo-router";
import axios from 'axios';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";


export default function Activepolls() {
    const [isLoading, setIsLoading] = useState(false);
  
    
  return (
    <SafeAreaView className="flex-1 bg-white">
   
    <View className="flex-1 bg-white r p-5 font-sans">
    <View className="flex-row justify-between bg-white rounded-lg">
      <View className="bg-yellow-600 w-40 justify-center rounded-lg">
        <Text className="text-white p-4 text-lg align-middle">When do you want us to have the meeting?</Text>
      </View>
       
      <View className=" flex-col bg-white w-40">
      <TouchableOpacity className="bg-gray-400 p-2 rounded-xl m-2"><Text className="font-bold">Monday 2:00 pm</Text></TouchableOpacity>
        <TouchableOpacity className="bg-gray-400 p-2 rounded-xl m-2"><Text className="font-bold">Tuesday 4:00 pm</Text></TouchableOpacity>
        <TouchableOpacity className="bg-gray-400 p-2 rounded-xl m-2"><Text className="font-bold">Thursday 10:00 am</Text></TouchableOpacity>
        <TouchableOpacity className="bg-gray-400 p-2 rounded-xl m-2"><Text className="font-bold">Friday 09:00 am</Text></TouchableOpacity>
      </View>

      </View>
      <ScrollView className="p-4">
      {/* polls voted */}
      <Text className="font-bold mt-5">Results</Text>
      <View className="flex-row w-full justify-between bg-white rounded-lg">
        <Text className="m-2">John Doe</Text>
        <Text className="m-2">voted: <Text className="text-yellow-600">Monday 2:00pm</Text></Text>
      </View>
      <View className="flex-row justify-between bg-white rounded-lg">
        <Text className="m-2">John Doe</Text>
        <Text className="m-2">voted: <Text className="text-yellow-600">Monday 2:00pm</Text></Text>
      </View>
      <View className="flex-row justify-between bg-white rounded-lg">
        <Text className="m-2">John Doe</Text>
        <Text className="m-2">voted: <Text className="text-yellow-600">Monday 2:00pm</Text></Text>
      </View>
      <View className="flex-row justify-between bg-white rounded-lg">
        <Text className="m-2">John Doe</Text>
        <Text className="m-2">voted: <Text className="text-yellow-600">Monday 2:00pm</Text></Text>
      </View>
      <View className="flex-row justify-between bg-white rounded-lg">
        <Text className="m-2">John Doe</Text>
        <Text className="m-2">voted: <Text className="text-yellow-600">Monday 2:00pm</Text></Text>
      </View>
      <View className="flex-row justify-between bg-white rounded-lg">
        <Text className="m-2">John Doe</Text>
        <Text className="m-2">voted: <Text className="text-yellow-600">Monday 2:00pm</Text></Text>
      </View>
      <View className="flex-row justify-between bg-white rounded-lg">
        <Text className="m-2">John Doe</Text>
        <Text className="m-2">voted: <Text className="text-yellow-600">Monday 2:00pm</Text></Text>
      </View>
      <View className="flex-row justify-between bg-white rounded-lg">
        <Text className="m-2">John Doe</Text>
        <Text className="m-2">voted: <Text className="text-yellow-600">Monday 2:00pm</Text></Text>
      </View>
      <View className="flex-row justify-between bg-white rounded-lg">
        <Text className="m-2">John Doe</Text>
        <Text className="m-2">voted: <Text className="text-yellow-600">Monday 2:00pm</Text></Text>
      </View>
      <View className="flex-row justify-between bg-white rounded-lg">
        <Text className="m-2">John Doe</Text>
        <Text className="m-2">voted: <Text className="text-yellow-600">Monday 2:00pm</Text></Text>
      </View>
      <View className="flex-row justify-between bg-white rounded-lg">
        <Text className="m-2">John Doe</Text>
        <Text className="m-2">voted: <Text className="text-yellow-600">Monday 2:00pm</Text></Text>
      </View>
      <View className="flex-row justify-between bg-white rounded-lg">
        <Text className="m-2">John Doe</Text>
        <Text className="m-2">voted: <Text className="text-yellow-600">Monday 2:00pm</Text></Text>
      </View>
      <View className="flex-row justify-between bg-white rounded-lg">
        <Text className="m-2">John Doe</Text>
        <Text className="m-2">voted: <Text className="text-yellow-600">Monday 2:00pm</Text></Text>
      </View>
      
      {/* end of polls voted */}

      <StatusBar/>
      </ScrollView>
    </View>
   
    </SafeAreaView>
  );
}
