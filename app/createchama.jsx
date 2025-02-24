import { useState } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StatusBar} from 'react-native';
import { useRouter } from "expo-router";

export default function Createchama(){
    const [chama, setChama] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handleCreateChama = async() => {
        // alert("Createchama clicked");
        router.push("chamacreated/");
    }
    return(
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
              <Image source={require('../assets/images2/logo.png')} className="w-full h-56 mb-4" style={{ resizeMode:"contain", height:100}}/>
              <Text className="text-3xl font-bold text-gray-800 mb-6">ChamaVault</Text>
              <Text className="text-lg font-bold">Enter name of chama</Text>
              <TextInput 
              placeholder="Enter name of chama"
              value={chama}
              onChangeText={setChama}
              className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
              />
              <Text className="text-lg font-bold">Enter chama description</Text>
              <TextInput 
              placeholder="chama description"
              value={description}
              onChangeText={setDescription} 
              className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg"
              />
              
              <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={handleCreateChama}>
                <Text className="text-white text-center font-semibold text-lg">Create Chama</Text>
              </TouchableOpacity>
              <StatusBar/>
            </View>
    );
}