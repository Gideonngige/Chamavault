import {Text, View, StatusBar, TextInput, TouchableOpacity,SafeAreaView, ScrollView, Image, ActivityIndicator } from "react-native";
import "../global.css";
import { useRouter } from "expo-router";
import axios from 'axios';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";


export default function Chat() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  
    
  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
      
      <StatusBar/>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}
