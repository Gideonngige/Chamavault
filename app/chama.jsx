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
    { label: 'John Doe', value: 'John Doe' },
    { label: 'Jane Doe', value: 'Jane Doe' },
    { label: 'Hassan Wakamoni', value: 'Hassan Wakamoni' },
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
              <View className='bg-yellow-600 p-0 w-full rounded-lg mt-5 flex flex-row justify-around'>
               <View className='p-5 m-5 bg-white shadow-lg'>
               <Text className='font-bold'>KES.50000</Text>
                <Text>Total savings</Text>
               </View>
               <View className='p-5 m-5 bg-white shadow-lg'>
               <Text className='font-bold'>KES.100000</Text>
               <Text>Total savings</Text>
               </View>
              </View>
              {/* end of saving and laon */}

              {/* graph part */}
              <View className='w-80 h-100 mt-5'>
                <Text className='font-bold'>Chama expenses</Text>
                <LineChart
                data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
                }}
                className='w-80'
                width={screenWidth - 55}
                height={220}
                yAxisLabel="$"
                chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                style={{ marginVertical: 8, borderRadius: 16 }}
                />
              </View>
              {/* end of graph part */}

              {/* members button */}
              <TouchableOpacity className='bg-yellow-600 w-full h-10 flex-row justify-between items-center px-4 rounded-lg' onPress={() => router.push("members/")}>
                <Text className='font-bold'>363 members</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </TouchableOpacity>
              {/* end of members button */}

              {/* roles part */}
              <View className='w-full mt-5'>
                <Text className='font-bold text-lg'>Roles</Text>
                <Text className="text-lg">Chairperson</Text>
                <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select a chairperson"
                style={{borderColor: '#ca8a04',borderWidth: 2,  
                }}
                listMode="SCROLLVIEW"
                />
                <Text className="text-lg">Treasurer</Text>
                <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select a chairperson"
                style={{borderColor: '#ca8a04',borderWidth: 2,  
                }}
                listMode="SCROLLVIEW"
                />
                <TouchableOpacity className='bg-gray-950 w-full mt-5 h-10 justify-center items-center px-4 rounded-lg' onPress={() => router.push('/schedule')}>
                <Text className='font-bold text-white'>Change roles</Text>
              </TouchableOpacity>
              </View>
              {/* end of roles part */}

              <StatusBar/>
            </View>
            </ScrollView>
            </SafeAreaView>
    );
}