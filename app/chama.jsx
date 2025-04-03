import { useState } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function Chama(){
    const [chama, setChama] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '31/03/2024', value: '31/03/2024' },
    { label: '31/12/2025', value: '31/12/2025' },
    { label: '30/03/2025', value: '30/03/2025' },
  ]);
    const router = useRouter();
    const screenWidth = Dimensions.get("window").width;

    const handleCreateChama = async() => {
        // alert("Createchama clicked");
        router.push("chamacreated/");
    }
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
            {/* savings and loan part */}
            <View className="w-full flex flex-row justify-between mb-4">
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-lg font-bold">KES.200,000</Text>
              <Text className="text-gray-900">Total savings</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-lg font-bold">KES.20,000</Text>
              <Text className="text-gray-500">Total loans</Text>
            </View>
          </View>
          {/* expenses */}
          <Text className='w-full text-lg font-bold ml-4'>Expenses</Text>
          <View className="w-full flex flex-row justify-between mb-4">
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-lg font-bold">KES.200,000</Text>
              <Text className="text-gray-900">Rent</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-lg font-bold">KES.20,000</Text>
              <Text className="text-gray-500">Travel</Text>
            </View>
          </View>
          <View className="w-full bg-white p-4 rounded-lg shadow-lg flex-1 mb-4 mx-2">
              <Text className="text-lg font-bold">KES.20,000</Text>
              <Text className="text-gray-500">Business</Text>
            </View>
          {/* end of expenses */}
          {/* end of saving and laon */}
              {/* members button */}
              <TouchableOpacity className='bg-yellow-600 w-full h-10 flex-row justify-between items-center px-4 rounded-lg' onPress={() => router.push("members/")}>
                <Text className='font-bold'>Members</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </TouchableOpacity>
              {/* end of members button */}

              {/* roles part */}
              <View className='w-full mt-5'>
                <Text className='font-bold text-lg'>Members contribution</Text>
                <Text className="text-lg">Select date</Text>
                <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select date"
                style={{borderColor: '#ca8a04',borderWidth: 2,  
                }}
                listMode="SCROLLVIEW"
                />
              </View>
              {/* end of roles part */}

              {/* member and their contribution view */}
              <View className='w-full bg-yellow-600 mt-4 mb-4'>
                <Text className='p-2 font-bold text-lg'>John Doe</Text>
                <Text className='p-2 font-bold'>KES.8000</Text>
              </View>

              <View className='w-full bg-yellow-600 mt-4 mb-4'>
                <Text className='p-2 font-bold text-lg'>John Doe</Text>
                <Text className='p-2 font-bold'>KES.8000</Text>
              </View>

              <View className='w-full bg-yellow-600 mt-4 mb-4'>
                <Text className='p-2 font-bold text-lg'>John Doe</Text>
                <Text className='p-2 font-bold'>KES.8000</Text>
              </View>
              {/* end */}

              <StatusBar/>
            </View>
            </ScrollView>
            </SafeAreaView>
    );
}