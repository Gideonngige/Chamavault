import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, TextInput, StatusBar, SafeAreaView, ScrollView, Platform} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaystackButton } from 'react-paystack';

export default function Contributions() {
    
    const route = useRoute();
    const phonenumber1 = route.params?.phonenumber || "0797655727";
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState("");
    const [display, setDisplay] = useState(0);

    const publicKey = "pk_test_6633ec1991d6ba92490835f6cbc1b7934876a55f";
    const [email, setEmail] = useState("gideonushindi94@gmail.com");
    const [name, setName] = useState("Gideon Ushindi");
    const [phonenumber, setPhonenumber] = useState();
    const amountValue = parseInt(amount) ? parseInt(amount) * 100 : 0;

    useEffect(() => {
        const fetchData = async() =>{
            const email = await AsyncStorage.getItem('email');
            setName(email);
            const name = await AsyncStorage.getItem('name');
            setName(name);
            const phonenumber = await AsyncStorage.getItem('phonenumber');
            setPhonenumber(phonenumber);
        }
        fetchData();
    },[]);

    const componentProps = {
        email, 
        amount: amountValue, // Ensure amount is valid
        currency: "KES",
        metadata: {
            name,
            phonenumber: phonenumber
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () => {
            console.log("Success!");
            alert("Thanks for doing business with us! Come back soon!!");
        },
        onClose: () => alert("Wait! Don't leave :(")
    };

    useEffect(() => {
        setDisplay(amount);
    }, [amount]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="p-4">
                <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
                    <Text className='text-gray-950'>Contribution amount</Text>
                    <Text className='text-yellow-600 font-bold font-xl'>KES.{display}</Text>

                    <TextInput 
                        placeholder="Enter contribution amount"
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType='numeric'
                        className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg"
                    />

                <PaystackButton {...componentProps} />
                       

                    <StatusBar />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
