import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, StatusBar, SafeAreaView,Alert, ScrollView} from 'react-native';
import { router, useRouter } from "expo-router";
import axios from 'axios';
import Toast from "react-native-toast-message";

export default function Invitation(){ 
    const [isLoading, setIsLoading] = useState(false); 
    const [email, setEmail] = useState("");
    const [applink, setAppLink] = useState('www.google.com'); 
    
    const handleInvite = async(email, applink) => {
        if(email == ""){
            Toast.show({
                type: "info", // Can be "success", "error", "info"
                text1: "Empty email",
                text2: "Please enter recepient email",
                position:"center",
                });
            return;
        }
        else{
        setIsLoading(true);
       try{
        
        const url = `https://backend1-1cc6.onrender.com/sendEmail/${email}/${applink}/`;
        const response = await axios.get(url);
        if(response.data.message === "ok"){
            Toast.show({
                type: "success", // Can be "success", "error", "info"
                text1: "Success",
                text2: "Email sent successfully",
                position:"center",
                });
        }
        else{
            Toast.show({
                type: "error", // Can be "success", "error", "info"
                text1: "Error",
                text2: "Email not sent",
                position:"center",
                });
        }

       }
       catch(error){
         Toast.show({
            type: "error", // Can be "success", "error", "info"
            text1: "Error",
            text2: error.message,
            position:"center",
            });
       }
       finally{
        setIsLoading(false);
       }
    }
    }
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
            <Image
                    source={require('../assets/images2/share.png')}
                    className="w-full h-48 rounded-lg overflow-hidden justify-center"
                    style={{ resizeMode: 'contain', width: '100%', height: 200 }}
            ></Image>
            <Text className='text-gray-950 w-full font-bold'>Enter recepient email</Text>
            <TextInput 
            placeholder="Enter email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg"
            />
            <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={() => handleInvite(email, applink)}>
            {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Send Link</Text> }
            </TouchableOpacity>
            <Toast/>
       
        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}