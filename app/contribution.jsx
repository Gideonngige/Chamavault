import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, TextInput, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { router, useRouter } from "expo-router";
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Contributions(){
    const route = useRoute();
    const phonenumber = route.params?.phonenumber || "0797655727";

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState("");
    const [display, setDisplay] = useState(0);
    const router = useRouter();
    const handleContribution = async () => {
        const email = await AsyncStorage.getItem('email');
        const phonenumber = await AsyncStorage.getItem('phonenumber');
        const chama = JSON.parse(await AsyncStorage.getItem('chama'));
        if(amount === ""){
            Toast.show({
                type: "error", // Can be "success", "error", "info"
                text1: "Empty fields",
                text2: "Please fill amount field",
                });
        }
        else{
         setIsLoading(true);
        try{
            const url = "https://backend1-1cc6.onrender.com/contributions/";
            const data = {
                email: email,
                amount: amount,
                phonenumber:phonenumber,
                chama: chama,
            };
            const response = await axios.post(url, data, {
                headers: { "Content-Type": "application/json" },
            });

            if(response.data.status === 200){
                Toast.show({
                    type: "success", // Can be "success", "error", "info"
                    text1: "Sent sucessfully",
                    text2: response.data.message,
                    });
                    setAmount("");
            }
            else{
                
                Toast.show({
                    type: "info", // Can be "success", "error", "info"
                    text1: "Unsuccessful",
                    text2: response.data.message,
                    });
            }
        }
        catch(error){
            Toast.show({
                type: "error", // Can be "success", "error", "info"
                text1: "Error occurred",
                text2: error.message,
                });
        }
        finally{
        setIsLoading(false);
        }
    }
}

    useEffect(() => {
        setDisplay(amount)
    },[amount]);
    
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
            <Text className='text-gray-950'>Contribution amount</Text>
            <Text className='text-yellow-600  font-bold font-xl'>KES.{display}</Text>
            <Text className="text-lg font-bold">Contribution amount</Text>
            <TextInput 
            placeholder="Enter contribution amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType='numeric'
            className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg"
            />
            <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={handleContribution}>
            {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Proceed Payment</Text> }
            </TouchableOpacity>
            <Toast/>
       
        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}