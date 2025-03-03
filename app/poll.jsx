import {Text, View, StatusBar, TextInput, TouchableOpacity,SafeAreaView, ScrollView, Image, ActivityIndicator } from "react-native";
import "../global.css";
import { useRouter } from "expo-router";
import axios from 'axios';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";


export default function Poll() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  
    
  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
       <Text className="text-lg w-full font-bold">Enter question</Text>
      <TextInput 
      placeholder="Write your question"
      value=""
      onChangeText=""
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />

    <Text className="text-lg w-full font-bold">Enter choices</Text>
      <TextInput 
      placeholder="Write choice one"
      value=""
      onChangeText=""
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <TextInput 
      placeholder="Write choice two"
      value=""
      onChangeText=""
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <TextInput 
      placeholder="Write choice three"
      value=""
      onChangeText=""
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className="font-bold w-full text-lg">Time</Text>
      <View className="flex-row justify-between bg-white rounded-lg">
      <TextInput 
      placeholder="start time"
      value=""
      onChangeText=""
      className="w-full p-4 bg-white rounded-lg shadow-sm mr-4 mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
       
       <TextInput 
      placeholder="stop time"
      value=""
      onChangeText=""
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      </View>
      <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={() => router.push('activepolls/')}>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Submit Poll</Text> }
      </TouchableOpacity>
      
      <StatusBar/>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}
