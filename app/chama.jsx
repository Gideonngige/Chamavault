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
    const [isLoadingContribution, setIsLoadingContribution] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
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
    setIsLoadingData(true);
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
        // alert("Total", response.data.total_members);
      }

    }
    catch(error){
      console.error(error);
    }
    finally{
      setIsLoadingData(false);
    }


  }
  
  fetchData();
  
},[chama]);
// end of function to fetch data


// function to fetch members contribution
useEffect(() => {
    const fetchData = async () => {
        setIsLoadingContribution(true);
        try {
          const chama_id = await AsyncStorage.getItem('chama');
            const response = await axios.get(`https://backend1-1cc6.onrender.com/getmemberscontribution/${chama_id}/`);
            if(response.status === 200) {
              setData(response.data);
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoadingContribution(false);
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
        <Text className='font-bold text-lg font-serif'>{name}</Text>
        <Text className='font-bold text-lg font-serif'>{contribution_date}</Text>
    </View>
    <Text className='font-bold text-lg mt-2 font-serif'>KES.{amount}</Text>
</View>
  )
}
// end of contribution component

// Alert component
const Alert = () => {
  return (
    <View className="flex flex-row items-center justify-center w-full bg-yellow-600 p-3 rounded-lg">
      <Text className="text-white font-bold font-serif">No contributions</Text>
    </View>
  );
};
// end

    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
            {/* savings and loan part */}
            <View className="w-full flex flex-row justify-between mb-4">
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-lg font-bold font-serif">{isLoadingData ? "Loading..." : `KES.${totalSavings}`}</Text>
              <Text className="text-gray-900 font-serif">Total savings</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-lg font-bold font-serif">{isLoadingData ? "Loading..." : `KES.${totalLoans}`}</Text>
              <Text className="text-gray-500 font-serif">Total loans</Text>
            </View>
          </View>
          {/* expenses */}
          <Text className='w-full text-lg font-bold ml-4 font-serif'>Expenses</Text>
          <View className="w-full flex flex-row justify-between mb-4">
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-lg font-bold font-serif">{isLoadingData ? "Loading..." : `KES.${rentExpense}`}</Text>
              <Text className="text-gray-900 font-serif">Rent</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-lg font-bold font-serif">{isLoadingData ? "Loading..." : `KES.${travelExpense}`}</Text>
              <Text className="text-gray-500 font-serif">Travel</Text>
            </View>
          </View>
          <View className="w-full bg-white p-4 rounded-lg shadow-lg flex-1 mb-4 mx-2">
              <Text className="text-lg font-bold font-serif">{isLoadingData ? "Loading..." : `KES.${businessExpense}`}</Text>
              <Text className="text-gray-500 font-serif">Business</Text>
            </View>
          {/* end of expenses */}
          {/* end of saving and laon */}

              {/* members button */}
              <TouchableOpacity className='bg-yellow-600 w-full h-10 flex-row justify-between items-center px-4 rounded-lg' onPress={() => router.push("members/")}>
                <Text className='font-bold font-serif'>Members {totalmembers}</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </TouchableOpacity>
              {/* end of members button */}

              {/* roles part */}
              <View className='w-full mt-5'>
                <Text className='font-bold text-lg font-serif'>Members contribution</Text>
              </View>
              {/* end of roles part */}

              {/* part to print transactions */}
              <View className="w-full flex flex-row justify-between mb-4">
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <TouchableOpacity className='bg-yellow-600 w-full h-10 flex-row justify-between items-center px-4 rounded-lg' onPress={() => alert("Coming soon!")}>
                <Text className='font-bold font-serif'>Print Saving History</Text>
                <Entypo name="print" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <TouchableOpacity className='bg-yellow-600 w-full h-10 flex-row justify-between items-center px-4 rounded-lg' onPress={() => alert("Coming soon!")}>
                <Text className='font-bold font-serif'>Print Loan History</Text>
                <Entypo name="print" size={24} color="black" />
              </TouchableOpacity>
            </View>
            
          </View>
          {/* end of part to print transaction */}

          {/* defaulter */}
          <View className="w-full flex flex-row justify-between mb-4">
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <TouchableOpacity className='bg-yellow-600 w-full h-10 flex-row justify-between items-center px-4 rounded-lg' onPress={() => alert("Coming soon!")}>
                <Text className='font-bold font-serif'>Defaulters</Text>
              </TouchableOpacity>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <TouchableOpacity className='bg-yellow-600 w-full h-10 flex-row justify-between items-center px-4 rounded-lg' onPress={() => router.push("location/")}>
                <Text className='font-bold font-serif'>Defaulters Location</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          {/* defaulters */}

              {/* member and their contribution view */}
               <View className='w-full'>
               {data.length === 0 ? (
            <Alert />
          ) : (
              <FlatList
                keyExtractor={(item) => item.contribution_id.toString()}
                data={data}
                renderItem={({ item }) => <Contribution name={item.member} contribution_date={item.contribution_date.split("T")[0]} amount={item.amount}/>}
                showsVerticalScrollIndicator={false}
                listMode="SCROLLVIEW"
                />
          )}
                </View>
              {/* end */}

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