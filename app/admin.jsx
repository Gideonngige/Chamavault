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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const name = await AsyncStorage.getItem('name');
        const chama = await AsyncStorage.getItem('selected_chama');
        const chama_id = await AsyncStorage.getItem('chama_id');
        setName(name);
        setChama(chama);

        const [resMembers, resSavings, resLoans] = await Promise.all([
          axios.get(`https://backend1-1cc6.onrender.com/totalchamamembers/${chama}/`),
          axios.get(`https://backend1-1cc6.onrender.com/totalchamasavings/${chama_id}/`),
          axios.get(`https://backend1-1cc6.onrender.com/totalchamaloans/${chama_id}/`)
        ]);

        setTotalmembers(resMembers.data.total_members);
        setTotalSavings(resSavings.data.total_savings);
        setTotalLoans(resLoans.data.total_loans);

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, []);

  // functions to handle admin
  const manageRoles=async()=>{
    if(chama == "No Chama"){
      alert("You must join a chama first\nClick Go to Home");
    }
    else{
      router.push('manageroles/')
    }
  }

  const manageMembers=async()=>{
    if(chama == "No Chama"){
      alert("You must join a chama first\nClick Go to Home");
    }
    else{
      router.push('managemembers/')
    }
  }

  const chat=async()=>{
    if(chama == "No Chama"){
      alert("You must join a chama first\nClick Go to Home");
    }
    else{
      router.push('chat/')
    }
  }

  const scheduleMeeting=async()=>{
    if(chama == "No Chama"){
      alert("You must join a chama first\nClick Go to Home");
    }
    else{
      router.push('schedule/')
    }
  }

  const poll=async()=>{
    if(chama == "No Chama"){
      alert("You must join a chama first\nClick Go to Home");
    }
    else{
      router.push('poll/')
    }
  }

  const contributionDate=async()=>{
    if(chama == "No Chama"){
      alert("You must join a chama first\nClick Go to Home");
    }
    else{
      router.push('contributiondate/')
    }
  }

  const Investment=async()=>{
    if(chama == "No Chama"){
      alert("You must join a chama first\nClick Go to Home");
    }
    else{
      router.push('investment/')
    }
  }

  const Expenses=async()=>{
    if(chama == "No Chama"){
      alert("You must join a chama first\nClick Go to Home");
    }
    else{
      router.push('chamaexpenses/')
    }
  }
  // end

  const actions = [
    { title: 'Manage Roles', onPress: manageRoles},
    { title: 'Manage Members', onPress: manageMembers },
    { title: 'Chat Message', onPress: chat },
    { title: 'Schedule Meeting', onPress: scheduleMeeting },
    { title: 'Poll', onPress: poll },
    { title: 'Go To Home', onPress: () => router.push('home/') },
    { title: 'Contribution Date', onPress: contributionDate },
    { title: 'Investment', onPress: Investment },
    { title: 'Expenses', onPress: Expenses },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4 font-lato">👋 Hi, {name}</Text>

        {/* Overview Cards */}
        <View className="mb-6">
          <View className="flex flex-row justify-between mb-3">
            <View className="bg-white p-4 rounded-2xl shadow-md flex-1 mx-1">
              <Text className="text-gray-600 text-sm font-lato">Chama</Text>
              <Text className="text-xl font-bold text-blue-600 font-lato">{chama}</Text>
            </View>
            <View className="bg-white p-4 rounded-2xl shadow-md flex-1 mx-1">
              <Text className="text-gray-600 text-sm font-lato">Members</Text>
              <Text className="text-xl font-bold text-green-600">
                {isLoadingData ? "..." : totalmembers}
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between">
            <View className="bg-white p-4 rounded-2xl shadow-md flex-1 mx-1">
              <Text className="text-gray-600 text-sm font-lato">Total Savings</Text>
              <Text className="text-xl font-bold text-indigo-600 font-lato">
                {isLoadingData ? "..." : `KES ${totalSavings}`}
              </Text>
            </View>
            <View className="bg-white p-4 rounded-2xl shadow-md flex-1 mx-1">
              <Text className="text-gray-600 text-sm font-lato">Total Loans</Text>
              <Text className="text-xl font-bold font-lato text-red-600">
                {isLoadingData ? "..." : `KES ${totalLoans}`}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <Text className="text-xl font-semibold text-gray-800 mb-3 font-lato">⚙️ Admin Controls</Text>
        <View className="flex flex-row flex-wrap justify-between">
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              className="bg-yellow-500 p-4 rounded-xl w-[48%] mb-3 shadow-sm"
              onPress={action.onPress}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white text-center font-semibold font-lato">{action.title}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
