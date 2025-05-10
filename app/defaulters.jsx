import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity,Image, ActivityIndicator, StatusBar, Linking } from 'react-native';
import { useRouter } from "expo-router";
import { push } from 'expo-router/build/global-state/routing';
import { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



export default function Defaulters() {
   const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

//   function to handle call
    const handleCall = async() =>{
        const phoneNumber = await AsyncStorage.getItem('phone_number');
        // alert(phoneNumber);
        // const url = `tel:${phoneNumber}`;
        const url = `tel:+254797655727`;
        Linking.openURL(url).catch(err => console.error("Error:", err));
    }
// end of function to handle call


  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans mb-40">
            {/* name and call icon */}
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">Gideon Ushindi</Text>
                <TouchableOpacity onPress={handleCall} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">Gideon Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">Gideon Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">John Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">John Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">John Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">John Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">John Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">John Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">John Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">John Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">John Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">John Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">John Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center w-full mb-3">
                <Text className="text-2xl font-serif text-gray-950">John Ushindi</Text>
                <TouchableOpacity onPress={() => navigation.navigate('chama')} className="bg-yellow-600 p-3 rounded-full">
                    <MaterialIcons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>

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