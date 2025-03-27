import { SafeAreaView, ScrollView, Text, View, TextInput, ActivityIndicator, TouchableOpacity,Image, ImageBackground, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { push } from 'expo-router/build/global-state/routing';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from "react-native-toast-message";

export default function Schedule() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'stock', value: 'stock' },
      { label: 'real estate', value: 'real estate' },
    ]);
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState(0)

  const handleTopUpInvestment = async () => {
    const chama = await AsyncStorage.getItem('chama');
    const member_id = await AsyncStorage.getItem('member_id');
    if(amount === 0 || duration === 0){
      Toast.show({
        type: "info", // Can be "success", "error", "info"
        text1: "Empty fields",
        text2: "Please enter all fields",
        position: "center",
        });;
      return;
    }
    else{
    setIsLoading(true);
    try{
      const url = "https://backend1-1cc6.onrender.com/investment/";
      const data = {
          member_id: member_id,
          chama: chama,
          contribution_amount:amount,
          investment_type: value,
          investment_duration: duration,
      };
      const response = await axios.post(url, data, {
          headers: { "Content-Type": "application/json" },
      });
      
      if(response.status === 200){
            Toast.show({
            type: "success", // Can be "success", "error", "info"
            text1: "Sent sucessfully",
            text2: response.data.message,
            position: "center",
            });
            setAmount("");
            setDuration("");
            }
      else{
                      
        Toast.show({
        type: "info", // Can be "success", "error", "info"
        text1: "Unsuccessful",
        text2: response.data.message,
        position: "center",
        });
        }
    }
    catch(error){
      console.error(error);
    }
    finally{setIsLoading(false);}
  }
    
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
               <Text className="w-full text-lg font-bold">Area of investment</Text>
               <DropDownPicker
               open={open}
               value={value}
               items={items}
               setOpen={setOpen}
               setValue={setValue}
               setItems={setItems}
               placeholder="Select area of investment"
               style={{borderColor: '#ca8a04',borderWidth: 2,  
               }}
               listMode="SCROLLVIEW"
               />

               <Text className="w-full text-lg mt-4 font-bold">Amount to invest</Text>
               <TextInput 
               placeholder="Amount to invest"
               value={amount}
               onChangeText={setAmount}
               className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
                />
                <Text className="w-full text-lg font-bold">Duration of investment</Text>
               <TextInput 
               placeholder="duration of investment"
               value={duration}
               onChangeText={setDuration}
               className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
                />

                <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={handleTopUpInvestment}>
                {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center mt-4 font-semibold text-lg">Top Up</Text> }
                </TouchableOpacity>
                <Toast/>
            <StatusBar/>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}