import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Image, FlatList, TextInput, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from '@expo/vector-icons/Entypo';

export default function Chama(){
    const [chama, setChama] = useState("");
    const [description, setDescription] = useState("");
    const [data, setData] = useState([]);
    const [totalmembers, setTotalmembers] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);
    const [totalLoans, setTotalLoans] = useState(0);
    const [rentExpense, setRentExpense] = useState(0);
    const [travelExpense, setTravelExpense] = useState(0);
    const [businessExpense, setBusinessExpense] = useState(0);
    const router = useRouter();


 // function to fetch data
 useEffect(() => {
  const fetchData = async () => {
    try{
      const chama = await AsyncStorage.getItem('selected_chama');
      const chama_id = await AsyncStorage.getItem('chama');
      setChama(chama);
      const url = `https://backend1-1cc6.onrender.com/totalchamamembers/${chama}/`;
      const response = await axios.get(url);
      const url2 = `https://backend1-1cc6.onrender.com/totalchamasavings/${chama}/`;
      const response2 = await axios.get(url2);
      const url3 = `https://backend1-1cc6.onrender.com/totalchamaloans/${chama}/`;
      const response3 = await axios.get(url3);
      const url4 = `https://backend1-1cc6.onrender.com/getexpenses/${chama_id}/`;
      const response4 = await axios.get(url4);
      if(response.status === 200 && response2.status === 200 && response3.status === 200 && response4.status === 200){
        setTotalmembers(response.data.total_members);
        setTotalSavings(response2.data.total_savings);
        setTotalLoans(response3.data.total_loans);
        setRentExpense(response4.data.total_rent);
        setTravelExpense(response4.data.total_travel);
        setBusinessExpense(response4.data.total_business);
      }

    }
    catch(error){
      console.error(error);
    }

  }
  
  fetchData();
  
},[chama]);
// end of function to fetch data


// function to fetch members contribution
useEffect(() => {
    const fetchData = async () => {
        try {
          const chama_id = await AsyncStorage.getItem('chama');
            const response = await axios.get(`https://backend1-1cc6.onrender.com/getmemberscontribution/${chama_id}/`);
            if(response.status === 200) {
              setData(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
   
})
// end of functio to fetch data

// contribution component
const Contribution = ({name, contribution_date, amount}) => {
  return(
    <View className='w-full bg-yellow-600 mt-4 mb-4 p-2'>
    <View className='flex-row justify-between'>
        <Text className='font-bold text-lg'>{name}</Text>
        <Text className='font-bold text-lg'>{contribution_date}</Text>
    </View>
    <Text className='font-bold text-lg mt-2'>KES.{amount}</Text>
</View>
  )
}
// end of contribution component

    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
            {/* savings and loan part */}
            <View className="w-full flex flex-row justify-between mb-4">
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-lg font-bold">KES.{totalSavings}</Text>
              <Text className="text-gray-900">Total savings</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-lg font-bold">KES.{totalLoans}</Text>
              <Text className="text-gray-500">Total loans</Text>
            </View>
          </View>
          {/* expenses */}
          <Text className='w-full text-lg font-bold ml-4'>Expenses</Text>
          <View className="w-full flex flex-row justify-between mb-4">
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-lg font-bold">KES.{rentExpense}</Text>
              <Text className="text-gray-900">Rent</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-lg font-bold">KES.{travelExpense}</Text>
              <Text className="text-gray-500">Travel</Text>
            </View>
          </View>
          <View className="w-full bg-white p-4 rounded-lg shadow-lg flex-1 mb-4 mx-2">
              <Text className="text-lg font-bold">KES.{businessExpense}</Text>
              <Text className="text-gray-500">Business</Text>
            </View>
          {/* end of expenses */}
          {/* end of saving and laon */}

              {/* members button */}
              <TouchableOpacity className='bg-yellow-600 w-full h-10 flex-row justify-between items-center px-4 rounded-lg' onPress={() => router.push("members/")}>
                <Text className='font-bold'>Members {totalmembers}</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </TouchableOpacity>
              {/* end of members button */}

              {/* roles part */}
              <View className='w-full mt-5'>
                <Text className='font-bold text-lg'>Members contribution</Text>
              </View>
              {/* end of roles part */}

              {/* part to print transactions */}
              <View className="w-full flex flex-row justify-between mb-4">
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <TouchableOpacity className='bg-yellow-600 w-full h-10 flex-row justify-between items-center px-4 rounded-lg' onPress={() => router.push("members/")}>
                <Text className='font-bold'>Print Saving History</Text>
                <Entypo name="print" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <TouchableOpacity className='bg-yellow-600 w-full h-10 flex-row justify-between items-center px-4 rounded-lg' onPress={() => router.push("members/")}>
                <Text className='font-bold'>Print Loan History</Text>
                <Entypo name="print" size={24} color="black" />
              </TouchableOpacity>
            </View>
            
          </View>
          {/* end of part to print transaction */}

              {/* member and their contribution view */}
               <View className='w-full'>
              <FlatList
                keyExtractor={(item) => item.contribution_id.toString()}
                data={data}
                renderItem={({ item }) => <Contribution name={item.member} contribution_date={item.contribution_date.split("T")[0]} amount={item.amount}/>}
                showsVerticalScrollIndicator={false}
                listMode="SCROLLVIEW"
                />
                </View>
              {/* end */}

              <StatusBar/>
            </View>
            </ScrollView>
            </SafeAreaView>
    );
}