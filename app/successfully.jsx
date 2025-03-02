import { useState } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { router, useRouter } from "expo-router";


export default function Successfully(){
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleContribution = async () => {
        router.push("home/");
        
    }
    
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
            <Image
                source={require('../assets/images2/payment.png')}
                className="w-full h-48 rounded-lg overflow-hidden justify-center"
                style={{ resizeMode: 'contain', width: '100%', height: 200 }}
                ></Image>
            <Text className='text-2xl mt-10 font-bold'>Payment successfully</Text>
            <Text className='font-bold'>Hurray!, your payment process has been completed successfully</Text>
            <TouchableOpacity className="w-full bg-yellow-600 mt-10 p-4 rounded-lg" onPress={handleContribution}>
            {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Back to home</Text> }
            </TouchableOpacity>
       
        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}