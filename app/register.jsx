import {Text, View, StatusBar, TextInput, TouchableOpacity, Image,SafeAreaView, ScrollView } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from "react";
import "../global.css";
import { useRouter } from "expo-router";
import axios from "axios";

export default function Register(){
    const router = useRouter();
    const [fullname,setFullname] = useState("");
    const [phonenumber,setPhonenumber] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Chama1', value: 'Chama1' },
      { label: 'Chama2', value: 'Chama2' },
      { label: 'Chama3', value: 'Chama3' },
    ]);
    const handleRegister = async() => {
      if(password == confirmPassword){
        // alert("passwords match");
        try {
          const url = "https://backend1-1cc6.onrender.com/postsignUp/";
          const data = {
              chama: value,
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
          alert(response.data.message || "Registration successful!");
          if(response.data.message == "Successfully registered"){
            router.push("/");
          }
          else{
            alert(response.data.message);
          }
  
      } catch (error) {
          console.error("Error during registration:", error);
  
          if (error.response) {
              console.error("Server Error:", error.response.data);
              alert("Server Error: " + JSON.stringify(error.response.data));
          } else {
              console.error("Network Error:", error.message);
              alert("Network Error: " + error.message);
          }
      }
        
      
    }
  }


    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
    <Image 
        source={require('../assets/images2/logo.png')}
        style={{width: 150, height: 150, borderRadius: 75, borderWidth: 3,borderColor: '#fff',resizeMode: 'cover',
        }}
      />
      <Text className="text-xl font-bold">ChamaVault</Text>
    <View className="w-full">
    <Text className="text-lg font-bold">Select Chama</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select a chama"
        style={{borderColor: '#ca8a04',borderWidth: 2,  
        }}
      />
    </View>
        
      <Text className="w-full text-lg font-bold">Enter your fullname</Text>
      <TextInput 
      placeholder="Enter your fullname"
      value={fullname}
      onChangeText={setFullname}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className="w-full text-lg font-bold">Enter your phonenumber</Text>
      <TextInput 
      placeholder="Enter your phonenumber"
      value={phonenumber}
      onChangeText={setPhonenumber}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className="w-full text-lg font-bold">Enter your email</Text>
      <TextInput 
      placeholder="Enter your email"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className="w-full text-lg font-bold">Enter your password</Text>
      <TextInput 
      placeholder="Enter your password"
      secureTextEntry 
      value={password}
      onChangeText={setPassword}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className="w-full text-lg font-bold">Confirm your password</Text>
      <TextInput 
      placeholder="Confirm your password"
      secureTextEntry 
      value={confirmPassword}
      onChangeText={setConfirmPassword}
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg"
      />
      
      <TouchableOpacity className="w-full flex-row justify-end m-5" onPress={() => alert("Got to forgot password page")}>
      </TouchableOpacity>
      <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={handleRegister}>
        <Text className="text-white text-center font-semibold text-lg">Register</Text>
      </TouchableOpacity>
      <Text className="text-lg">Already have an account? <TouchableOpacity onPress={() => router.push("/")}><Text className="text-yellow-600">Login</Text></TouchableOpacity></Text>
      <StatusBar/>
      </View>
      </ScrollView>
      </SafeAreaView>
    
    );
}