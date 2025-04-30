import {Text, View, StatusBar, TextInput, TouchableOpacity, Image,SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useState } from "react";
import "../global.css";
import { useRouter } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function Register(){
    const router = useRouter();
    const [fullname,setFullname] = useState("");
    const [phonenumber,setPhonenumber] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    //start function to handle registration
    const handleRegister = async() => {
      if(fullname == "" || phonenumber == "" || email == "" || password == "" || confirmPassword == ""){
        Toast.show({
              type: "error", // Can be "success", "error", "info"
              text1: "Empty fields",
              text2: "Please fill in all fields",
              position:"center",
            });
        return;
      }
      else{
      if(password == confirmPassword){
        setIsLoading(true);
        try {
          const url = "https://backend1-1cc6.onrender.com/postsignUp/";
          const data = {
              name: fullname,
              email: email,
              phone_number: phonenumber,
              password: password,
          };
  
          console.log("Sending data:", data);  // Log request data
  
          const response = await axios.post(url, data, {
              headers: { "Content-Type": "application/json" },
          });
  
          console.log("Response received:", response.data);  // Log response
          Toast.show({
            type: "success", // Can be "success", "error", "info"
            text1: "Successfully",
            text2: "Registration successful!",
            position:"center",
          });
          if(response.data.message == "Successfully registered"){
            router.push("/");
          }
          else{
            Toast.show({
              type: "error", // Can be "success", "error", "info"
              text1: "Failed registration",
              text2: response.data.message,
              position:"center",
            });
            // alert(response.data.message);
          }
  
      } 
      catch (error) {
          // console.error("Error during registration:", error);
  
          if (error.response) {
              // console.error("Server Error:", error.response.data);
              Toast.show({
                type: "error", // Can be "success", "error", "info"
                text1: "Error",
                text2: error.response.data.message,
                position:"center",
              });
              // alert("Server Error: " + JSON.stringify(error.response.data));
          } else {
              console.error("Network Error:", error.message);
              Toast.show({
                type: "error", // Can be "success", "error", "info"
                text1: "Network Error",
                text2: error.message,
                position:"center",
              });
              // alert("Network Error: " + error.message);
          }
      }
      finally{
        setIsLoading(false);
      }
    }
    else{
      Toast.show({
        type: "error", // Can be "success", "error", "info"
        text1: "Password mismatch",
        text2: "Password do not match",
        position:"center",
      });
      // alert("Passwords do not match");
    }
  }
  }
  // end of function to handle registration


    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
    <Image 
        source={require('../assets/images2/logo.png')}
        style={{width: 150, height: 150, borderRadius: 75, borderWidth: 3,borderColor: '#fff',resizeMode: 'cover',
        }}
      />
      <Text className="text-xl font-serif font-bold">ChamaVault</Text>
        
      <Text className="w-full text-lg font-bold font-serif mt-5">Enter your fullname</Text>
      <TextInput 
      placeholder="e.g John Doe"
      value={fullname}
      onChangeText={setFullname}
      className="w-full p-4 bg-white rounded-sm shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg font-serif"
      />
      <Text className="w-full text-lg font-bold font-serif">Enter your phonenumber</Text>
      <TextInput 
      placeholder="e.g 0712345678"
      value={phonenumber}
      onChangeText={setPhonenumber}
      className="w-full p-4 bg-white rounded-sm shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg font-serif"
      />
      <Text className="w-full text-lg font-bold font-serif">Enter your email</Text>
      <TextInput 
      placeholder="e.g johndoe@example.com"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      className="w-full p-4 bg-white rounded-sm shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg font-serif"
      />
      <Text className="w-full text-lg font-bold font-serif">Enter your password</Text>
      <TextInput 
      placeholder="Enter your password"
      secureTextEntry 
      value={password}
      onChangeText={setPassword}
      className="w-full p-4 bg-white rounded-sm shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg font-serif"
      />
      <Text className="w-full text-lg font-bold font-serif">Confirm your password</Text>
      <TextInput 
      placeholder="Confirm your password"
      secureTextEntry 
      value={confirmPassword}
      onChangeText={setConfirmPassword}
      className="w-full p-4 bg-white rounded-sm shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg font-serif"
      />
      <TouchableOpacity className="w-full bg-green-600 p-4 rounded-lg" onPress={handleRegister}>
        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-serif font-semibold text-lg">Register</Text>}
      </TouchableOpacity> 
      <View className="flex-row justify-center mt-4 mb-6">
      <Text className="text-lg font-serif">Already have an account? </Text>
      <TouchableOpacity onPress={() => router.push("/login")}>
      <Text className="text-lg text-yellow-600 font-serif">Login</Text>
      </TouchableOpacity>
      </View>
      <Toast/>
      <StatusBar/>
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