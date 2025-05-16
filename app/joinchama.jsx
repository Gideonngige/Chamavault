import {Text, View, StatusBar,TouchableOpacity, Image,SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useState } from "react";
import "../global.css";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register(){
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    // fetch chamas
    useEffect(() => {
      const fetchChamas = async () => {
        try{
          const url = `https://backend1-1cc6.onrender.com/allchamas/`;
          const response = await axios.get(url);
          if(response.status === 200){
            const formattedItems = response.data.Chamas.map((chama) => ({
              label: chama.name,
              value: chama.name, // Use an ID if available
            }));
            setItems(formattedItems);
          }

        }
        catch(error){
          console.error("Error fetching chamas:", error);
        }

      }
      fetchChamas();
    },[]);
    // end of fetch chamas
    
    // start of function to join chama
    const handleJoinChama = async() => {
      const member_id = await AsyncStorage.getItem('member_id');
      // alert(member_id);
      // alert(value)
      setIsLoading(true);
      try{
        if(value == null){
          Toast.show({
            type: "info", // Can be "success", "error", "info"
            text1: "Fill in all the fiels",
            text2: "please fill in all the fields",
            });
        }
        const url = `https://backend1-1cc6.onrender.com/joinchama/${member_id}/${value}/`;
        const response = await axios.get(url);
        if(response.status === 200){
          Toast.show({
            type: "success", // Can be "success", "error", "info"
            text1: "Succesfully joined chama",
            text2: response.data.message,
            });
        }
        else{
          Toast.show({
            type: "info", // Can be "success", "error", "info"
            text1: "Failed to join",
            text2: response.data.message,
            });
        }


      }
      catch(error){
        Toast.show({
          type: "error", // Can be "success", "error", "info"
          text1: "An error occurred",
          text2: error.message,
          });
      }
      finally{
        setIsLoading(false);
      }
      
  }
  // end of function to join chama


    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
    <Image 
        source={require('../assets/images2/logo.png')}
        style={{width: 150, height: 150, borderRadius: 75, borderWidth: 3,borderColor: '#fff',resizeMode: 'cover',
        }}
      />
      <Text className="text-xl font-bold font-serif">ChamaVault</Text>
      <View className="w-full z-10">
  <Text className="text-lg font-bold font-serif">Select Chama</Text>
  <DropDownPicker
    open={open}
    value={value}
    items={items}
    setOpen={setOpen}
    setValue={setValue}
    setItems={setItems}
    placeholder="Select a chama"
    searchable={true}
    searchPlaceholder="Search for a chama..."
    searchTextInputProps={{
      autoCorrect: false,
      autoCapitalize: "none",
    }}
    style={{
      borderColor: '#ca8a04',
      borderWidth: 1,
      borderRadius:1
    }}
    zIndex={3000}
    zIndexInverse={1000}
    listMode="SCROLLVIEW"
  />
</View>

<View className="w-full z-0">
  <TouchableOpacity
    className="w-full bg-green-600 p-4 mb-6 rounded-lg mt-6"
    onPress={handleJoinChama}
  >
    {isLoading ? (
      <ActivityIndicator size="large" color="#fff" />
    ) : (
      <Text className="text-white text-center font-semibold text-lg font-serif">
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