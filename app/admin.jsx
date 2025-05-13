import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("");
  const [chama, setChama] = useState("");
  const [totalmembers, setTotalmembers] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalLoans, setTotalLoans] = useState(0);

  // function to fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try{
        const name = await AsyncStorage.getItem('name');
        const chama = await AsyncStorage.getItem('selected_chama');
        setName(name);
        setChama(chama);
        const url = `https://backend1-1cc6.onrender.com/totalchamamembers/${chama}/`;
        const response = await axios.get(url);
        const url2 = `https://backend1-1cc6.onrender.com/totalchamasavings/${chama}/`;
        const response2 = await axios.get(url2);
        const url3 = `https://backend1-1cc6.onrender.com/totalchamaloans/${chama}/`;
        const response3 = await axios.get(url3);
        if(response.status === 200 && response2.status === 200 && response3.status === 200){
          setTotalmembers(response.data.total_members);
          setTotalSavings(response2.data.total_savings);
          setTotalLoans(response3.data.total_loans);
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
    // const interval = setInterval(() => {
    //   fetchData();
    // }, 10000); // 10 seconds
  
    // // Clear interval when component unmounts
    // return () => clearInterval(interval);
  },[name, chama]);
  // end of function to fetch data

  const handleSchedule = async () => {
    router.push('schedule/');
  };

  const handleProfile = async () => {
    router.push('home/');
  };

  const handlePoll = async () => {
    router.push('poll/');
  };

  const handleChat = async () => {
    router.push('chat/');
  };

  const handleManageroles = async () => {
    router.push('manageroles/');
  };
  const handleManagemembers = async () => {
    router.push('managemembers/');
  };
  const handleContributionDate = async () => {
    router.push('contributiondate/');
  };
  const handleInvestment = async () => {
    router.push('investment/');
  };
  

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 justify-center items-center p-5">
          
          {/* Welcome Message */}
          <Text className="w-full text-xl font-bold mb-3 font-serif">Hi, {name}</Text>

          {/* Statistics Section */}
          <View className="w-full flex flex-row justify-between mb-4">
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-gray-900 text-lg font-bold font-serif">{chama}</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-gray-500 font-serif">Total Members</Text>
              <Text className="text-lg font-bold font-serif">{isLoadingData ? "Loading..." : `${totalmembers}`}</Text>
            </View>
          </View>

          <View className="w-full flex flex-row justify-between mb-6">
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-gray-500 font-serif">Total Savings</Text>
              <Text className="text-lg font-bold font-serif">{isLoadingData ? "Loading..." : `KES.${totalSavings}`}</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-gray-500 font-serif">Total Loans</Text>
              <Text className="text-lg font-bold font-serif">{isLoadingData ? "Loading..." : `KES.${totalLoans}`}</Text>
            </View>
          </View>

          {/* Manage Roles Section */}
          <Text className="w-full text-lg font-bold mb-3 font-serif">Manage Roles</Text>

          {/* Button Grid */}
          <View className="w-full flex-row flex-wrap justify-between">
            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2" onPress={handleManageroles}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg font-serif">Manage Roles</Text>}
            </TouchableOpacity>

            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2 font-serif" onPress={handleManagemembers}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg font-serif">Manage Members</Text>}
            </TouchableOpacity>

            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2" onPress={handleChat}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg font-serif">Chat Message</Text>}
            </TouchableOpacity>

            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2" onPress={handleSchedule}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg font-serif">Schedule Meeting</Text>}
            </TouchableOpacity>

            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2" onPress={handlePoll}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg font-serif">Poll</Text>}
            </TouchableOpacity>

            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2" onPress={handleProfile}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg font-serif">Go To Profile</Text>}
            </TouchableOpacity>
            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2" onPress={handleContributionDate}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg font-serif">Contribution Date</Text>}
            </TouchableOpacity>
            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2" onPress={handleInvestment}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg font-serif">Investment</Text>}
            </TouchableOpacity>
          </View>
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
