import { useState } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function Chamainvestment(){
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
                <Text>Total rental</Text>
               </View>
               <View className='p-5 m-5 bg-white shadow-lg'>
               <Text className='font-bold'>KES.100000</Text>
               <Text>Total travel</Text>
               </View>
              </View>
              {/* end of saving and laon */}

              {/* graph part */}
              <View className='w-80 h-100 mt-5'>
                <Text className='font-bold'>Rental expenses</Text>
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

              <View className='w-80 h-100 mt-5'>
                <Text className='font-bold'>Travel expenses</Text>
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