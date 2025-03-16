import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity,Image, ImageBackground, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { push } from 'expo-router/build/global-state/routing';
import { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Profile() {
  
   const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const[email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() =>{
    const handleGetDaya = async() =>{
      const email = await AsyncStorage.getItem('email');
      const name = await AsyncStorage.getItem('name');
      setEmail(email);
      setName(name);

    }
    handleGetDaya();
  },[])

  const handleLogOut = () => {
    navigation.navigate('index', {
      
    });
    
  }

  const handleShareApp = () => {
    navigation.navigate('invitation', {
      
    });
   }

   const handleHelp = () => {
    navigation.navigate('help', {
      
    });
   }


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
    <Text className="text-lg font-bold text-gray-800 mb-1">{name}</Text>
    <Text className="text-gray-800 font-bold">{email}</Text>
    </View>
    <View className='w-full flex-row items-center bg-yellow-600 rounded-lg mb-5'>
        <TouchableOpacity className='flex-row items-center justify-between w-full p-1'>
            <MaterialIcons name="account-circle" size={30} color="black" className='mr-4' />
            <Text className="text-base font-bold p-2 text-gray-900">Update Profile </Text>
            <Ionicons name="chevron-forward-outline" size={30} color="black" />
        </TouchableOpacity>
    </View>

    <View className='w-full flex-row items-center bg-yellow-600 rounded-lg mb-5'>
        <TouchableOpacity className='flex-row items-center justify-between w-full p-1' onPress={handleShareApp}>
             <Ionicons name="share-social" size={30} color="black" />
            <Text className="text-base font-bold p-2 text-gray-900">Share App</Text>
            <Ionicons name="chevron-forward-outline" size={30} color="black" />
        </TouchableOpacity>
    </View>

    <View className='w-full flex-row items-center bg-yellow-600 rounded-lg mb-5'>
        <TouchableOpacity className='flex-row items-center justify-between w-full p-1' onPress={handleHelp}>
            <MaterialCommunityIcons name="help-circle" size={30} color="black" />
            <Text className="text-base font-bold p-2 text-gray-900">Help</Text>
            <Ionicons name="chevron-forward-outline" size={30} color="black" />
        </TouchableOpacity>
    </View>

    <View className='w-full flex-row items-center bg-yellow-600 rounded-lg mb-5'>
        <TouchableOpacity className='flex-row items-center justify-between w-full p-1' onPress={handleLogOut}>
        <MaterialIcons name="logout" size={30} color="black" />
            <Text className="text-base font-bold p-2 text-gray-900">Logout</Text>
            <Ionicons name="chevron-forward-outline" size={30} color="black" />
        </TouchableOpacity>
    </View>
               
    <StatusBar/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}