import { useState } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StatusBar, ActivityIndicator} from 'react-native';
import { useRouter } from "expo-router";
import axios from 'axios';
import Toast from "react-native-toast-message";
import { useNavigation } from '@react-navigation/native';

export default function Createchama(){
    const navigation = useNavigation();
    const [chama, setChama] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [created_by, setCreated_by] = useState("Chamavault user");

    // Function to handle creating a chama
    const handleCreateChama = async() => {
      if(chama == "" || description == ""){
        Toast.show({
          type: "error", // Can be "success", "error", "info"
          text1: "Chama Creation Error",
          text2: "Please provide all the fields",
        });
        
        return;
      }
      else{
        setIsLoading(true);
      try {

        const url = "https://backend1-1cc6.onrender.com/createchama/";
        const data = {
            chama: chama,
            description: description,
            created_by:created_by,
        };

        const response = await axios.post(url, data, {
            headers: { "Content-Type": "application/json" },
        });
       
        if(response.data.message == "Chama created successfully"){
          navigation.navigate('chamacreated', {
            chama:chama,
      
          });
        }
        else{
          Toast.show({
            type: "error", // Can be "success", "error", "info"
            text1: "Chama Creation Error",
            text2: response.data.message,
          });
          // alert(response.data.message);
        }
      

      } catch (error) {
        // console.error("Error during registration:", error);

        if (error.response) {
            // console.error("Server Error:", error.response.data);
            Toast.show({
              type: "error", // Can be "success", "error", "info"
              text1: "Chama Creation Error",
              text2: error.response.data.message,
            });
            // alert("Server Error: " + JSON.stringify(error.response.data));
        } else {
            // console.error("Network Error:", error.message);
            Toast.show({
              type: "error", // Can be "success", "error", "info"
              text1: "Network Error",
              text2: error.message,
            });
            // alert("Network Error: " + error.message);
        }
    }
    finally{
      setIsLoading(false);
    }

  }

    }
    // end of create chama function
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
              placeholder="chama description..."
              value={description}
              onChangeText={setDescription} 
              multiline
              numberOfLines={4}
              className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg"
              />
              
              <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={handleCreateChama}>
                {isLoading ? <ActivityIndicator size="large" color="#fff"/> : <Text className="text-white text-center font-semibold text-lg">Create Chama</Text>}
              </TouchableOpacity>
              <Toast/>
              <StatusBar/>
            </View>
    );
}