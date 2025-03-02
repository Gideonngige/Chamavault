import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { router, useRouter } from "expo-router";
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Contributions(){
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState("");
    const [display, setDisplay] = useState(200);
    const router = useRouter();
    const handleContribution = async () => {
        try{
            const url = "https://backend1-1cc6.onrender.com/contributions/";
            const data = {
                phonenumber:"0797655727",
                email:"gtechcompany01@gmail.com",
                amount: amount,
            };
            const response = await axios.post(url, data, {
                headers: { "Content-Type": "application/json" },
            });
            alert("Hello")
            if(response.data.status == 200){
                router.push("successfully/");
            }
            else{
                alert("Failed to make contribution");
            }
        }
        catch(error){
            alert("Error:" + error.message);
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
       
        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}