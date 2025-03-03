import { useState } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { router, useRouter } from "expo-router";


export default function Creditscore(){
    const [isLoading, setIsLoading] = useState(false);
    
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
            <Text className='text-lg font-bold m-5 align-middle'>My Credit Score</Text>
            <View className='bg-yellow-600 w-80 h-80 rounded-full justify-center items-center shadow-lg'>
                <View className='bg-gray-950 w-60 h-60 rounded-full m-2 justify-center items-center inset-shadow-sm'>
                <View className='bg-white w-40 h-40 rounded-full m-2 justify-center items-center inset-shadow-sm'>
                    <Text className='text-xl font-bold'>+90</Text>

                </View>
                </View>

            </View>
            
       
        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}