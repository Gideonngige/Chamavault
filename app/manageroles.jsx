import {Text, View, StatusBar, TextInput, TouchableOpacity,SafeAreaView, ScrollView, Image, ActivityIndicator } from "react-native";
import "../global.css";
import { useRouter } from "expo-router";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Manageroles() {
    const [isLoading, setIsLoading] = useState(false);
    const [isChanging, setIsChanging] = useState(false);
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([]);

    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState(null);
    const [items3, setItems3] = useState([]);

    const handleSchedule = async () => {
        router.push('schedule/');
      };
  
  // fetch members
  useEffect(() => {
    const fetchMembers = async () => {
      const chama_id = await AsyncStorage.getItem('chama_id');
      const email = await AsyncStorage.getItem('email');
      try{
        const url = `https://backend1-1cc6.onrender.com/members/${email}/${chama_id}/`;
        const response = await axios.get(url);
        if(response.status === 200){
          const formattedItems = response.data.map((member) => ({
            label: member.name,
            value: member.member_id, // Use an ID if available
          }));
          setItems(formattedItems);
          setItems2(formattedItems);
          setItems3(formattedItems);
          // await AsyncStorage.setItem('chama', chama);
        }

      }
      catch(error){
        console.error("Error fetching chamas:", error);
      }

    }
    fetchMembers();
  },[]);
  // end of fetch members

  // start of function to send changes
  const handleChangeRoles = async() => {
    const chama_id = await AsyncStorage.getItem('chama_id');
    if(!value && !value2 && !value3){
      alert("Empty");
      Toast.show({
          type: "error",
          text1: "Empty fields",
          text2: "Select atleast one role",
      });
    }
    else{
      if(!value){value = 0;}
      if(!value2){value2 = 0;}
      if(!value3){value3 = 0;}
      setIsChanging(true);
      try{
        const url = `https://backend1-1cc6.onrender.com/changeroles/${chama_id}/${value}/${value2}/${value3}/`;
        const response = await axios.get(url);
        if(response.status === 200){
          Toast.show({
            type: "success",
            text1: "Updated successfully",
            text2: response.data.message,
            position:"center",
          });
          
        }

      }
      catch(error){
        console.log(error);
      }
      finally{
        setIsChanging(false);
      }
      
    }

  }
  // end of function to send changes
  
    
  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
    <Text className='w-full text-lg font-bold font-lato'>Manage roles</Text>
            {/* Chairperson */}
<View style={{ zIndex: 3000 }}>
  <Text className="text-lg font-bold mt-4 font-lato">Chairperson</Text>
  <DropDownPicker
    open={open}
    value={value}
    items={items}
    setOpen={setOpen}
    setValue={setValue}
    setItems={setItems}
    placeholder="Select member"
    style={{
      borderColor: '#ca8a04',
      borderWidth: 1,
      borderRadius: 5,
      height: 50,
      fontFamily: 'sans-serif',
    }}
    listMode="SCROLLVIEW"
    dropDownContainerStyle={{ zIndex: 3000 }}
  />
</View>

{/* Treasurer */}
<View style={{ zIndex: 2000 }}>
  <Text className="text-lg font-bold mt-4 font-lato">Treasurer</Text>
  <DropDownPicker
    open={open2}
    value={value2}
    items={items2}
    setOpen={setOpen2}
    setValue={setValue2}
    setItems={setItems2}
    placeholder="Select member"
    style={{
      borderColor: '#ca8a04',
      borderWidth: 1,
      borderRadius: 5,
      height: 50,
      fontFamily: 'sans-serif',
    }}
    listMode="SCROLLVIEW"
    dropDownContainerStyle={{ zIndex: 2000 }}
  />
</View>

{/* Secretary */}
<View style={{ zIndex: 1000 }}>
  <Text className="text-lg font-bold mt-4 font-lato">Secretary</Text>
  <DropDownPicker
    open={open3}
    value={value3}
    items={items3}
    setOpen={setOpen3}
    setValue={setValue3}
    setItems={setItems3}
    placeholder="Select member"
    style={{
      borderColor: '#ca8a04',
      borderWidth: 1,
      borderRadius: 5,
      height: 50,
      fontFamily: 'sans-serif',
    }}
    listMode="SCROLLVIEW"
    dropDownContainerStyle={{ zIndex: 1000 }}
  />
</View>

            <TouchableOpacity className="w-full bg-green-600 mt-4 p-4 rounded-md" onPress={handleChangeRoles}>
            {isChanging ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg font-lato">Change roles</Text> }
            </TouchableOpacity>
    </View>
    <Toast/>
    </ScrollView>
    <StatusBar
            barStyle="dark-content" // or "light-content" depending on your background
            backgroundColor="transparent"
            translucent={true}
          />
    </SafeAreaView>
  );
}
