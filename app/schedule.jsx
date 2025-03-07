import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity,Image, ImageBackground, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { push } from 'expo-router/build/global-state/routing';
import { useState } from 'react';


export default function Schedule() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSchedule = async () => {
    router.push('topupinvestment/');
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
               <Text className="w-full text-lg font-bold">Meeting date</Text>
                <TextInput 
                placeholder="meeting date"
                value=""
                onChangeText=""
                className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
                />
                <Text className="w-full text-lg font-bold">Message</Text>
                <TextInput 
                placeholder="Type message here..."
                value=""
                onChangeText=""
                className="w-full p-4 h-80 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
                />
                <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={handleSchedule}>
                {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Schedule</Text> }
                        
                </TouchableOpacity>
            <StatusBar/>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}