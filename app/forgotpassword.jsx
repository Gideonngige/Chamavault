import {Text, View, StatusBar, TextInput, TouchableOpacity, Image,SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import {useState } from "react";
import "../global.css";
import { useRouter } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function ForgotPassword(){
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    
    // start of function to handle forgot password
    const handleForgotPassword = async() => {
        setIsLoading(true);
        try {
          if(email === ""){
            Toast.show({
              type: "error", // Can be "success", "error", "info"
              text1: "Empty field",
              text2: "Please provide an email",
            });
          }
          else{
          const url = `https://backend1-1cc6.onrender.com/postReset/${email}/`;
          const response = await axios.get(url);
          Toast.show({
            type: "success", // Can be "success", "error", "info"
            text1: "Password reset",
            text2: response.data.message,
          });
          }
          
          // alert(response.data.message);
        } catch (error) {
          Toast.show({
            type: "error", // Can be "success", "error", "info"
            text1: "Error logging in",
            text2: error,
          });
          // console.error("Error logging in:", error);
          return null;
        }
        finally{
            setIsLoading(false);
        }
    
      }
    // end handle forgot password password function


    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
    <Image 
        source={require('../assets/images2/logo.png')}
        style={{width: 150, height: 150, borderRadius: 75, borderWidth: 3,borderColor: '#fff',resizeMode: 'cover',
        }}
      />
      <Text className="text-xl font-bold">ChamaVault</Text>
      <Text className="w-full text-lg font-bold">Enter your email</Text>
      <TextInput 
      placeholder="Enter your email"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />

<View className="w-full z-0">
  <TouchableOpacity
    className="w-full bg-yellow-600 p-4 mb-6 rounded-lg mt-6"
    onPress={handleForgotPassword}
  >
    {isLoading ? (
      <ActivityIndicator size="large" color="#fff" />
    ) : (
      <Text className="text-white text-center font-semibold text-lg">
        Join Chama
      </Text>
    )}
  </TouchableOpacity>
</View>

      <Toast/>
      </View>
      </ScrollView>
      <StatusBar
            barStyle="dark-content" // or "light-content" depending on your background
            backgroundColor="transparent"
            translucent={true}
          />
      </SafeAreaView>
    
    );
}