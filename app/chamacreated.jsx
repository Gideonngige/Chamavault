import { useState } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StatusBar} from 'react-native';
import { useRouter } from "expo-router";
export default function Createchama(){
    const [chama, setChama] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handleInviteMembers = async() => {
        // alert("Invite members clicked");
        router.push("chama/");
    }
    return(
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
              <Image source={require('../assets/images2/logo.png')} className="w-full h-56 mb-4" style={{ resizeMode:"contain", height:100}}/>
              <Text className="text-3xl font-bold text-gray-800 mb-6">ChamaVault</Text>
              <Text className="text-lg font-bold">Chama1 created Successfully</Text>
              
              <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={handleInviteMembers}>
                <Text className="text-white text-center font-semibold text-lg">Invite members</Text>
              </TouchableOpacity>
              <StatusBar/>
            </View>
    );
}