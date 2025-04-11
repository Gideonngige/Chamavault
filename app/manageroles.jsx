import {Text, View, StatusBar, TextInput, TouchableOpacity,SafeAreaView, ScrollView, Image, ActivityIndicator } from "react-native";
import "../global.css";
import { useRouter } from "expo-router";
import axios from 'axios';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import DropDownPicker from 'react-native-dropdown-picker';


export default function Manageroles() {
    const [isLoading, setIsLoading] = useState(false);
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
  
    
  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
    <Text className='w-full text-lg font-bold'>Manage roles</Text>
            <View className='w-full'>
            <Text className="text-lg font-bold mt-4">Chairperson</Text>
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
            listMode="SCROLLVIEW"
            />

            <Text className="text-lg font-bold mt-4">Treasurer</Text>
            <DropDownPicker
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            placeholder="Select a chama"
            style={{borderColor: '#ca8a04',borderWidth: 2,  
            }}
            listMode="SCROLLVIEW"
            />

            <Text className="text-lg font-bold mt-4">Secretary</Text>
            <DropDownPicker
            open={open3}
            value={value3}
            items={items3}
            setOpen={setOpen3}
            setValue={setValue3}
            setItems={setItems3}
            placeholder="Select a chama"
            style={{borderColor: '#ca8a04',borderWidth: 2,  
            }}
            listMode="SCROLLVIEW"
            />
            </View>
            <TouchableOpacity className="w-full bg-yellow-600 mt-4 p-4 rounded-lg" onPress={handleSchedule}>
            {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Change roles</Text> }
            </TouchableOpacity>
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
