import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, StatusBar, ActivityIndicator,FlatList } from 'react-native';
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
  const [members, setMembers] = useState([]);
  const [chamaName, setChamaName] = useState("")

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoadingData(true);
  //     try {
  //       const name = await AsyncStorage.getItem('name');
  //       const chama = await AsyncStorage.getItem('selected_chama');
  //       const chama_id = await AsyncStorage.getItem('chama_id');
  //       setName(name);
  //       setChama(chama);

  //       const [resMembers, resSavings, resLoans] = await Promise.all([
  //         axios.get(`https://backend1-1cc6.onrender.com/totalchamamembers/${chama}/`),
  //         axios.get(`https://backend1-1cc6.onrender.com/totalchamasavings/${chama_id}/`),
  //         axios.get(`https://backend1-1cc6.onrender.com/totalchamaloans/${chama_id}/`)
  //       ]);

  //       setTotalmembers(resMembers.data.total_members);
  //       setTotalSavings(resSavings.data.total_savings);
  //       setTotalLoans(resLoans.data.total_loans);

  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoadingData(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // functio to get members
   useEffect(() => {
    const getMembers = async () => {
      // const email = await AsyncStorage.getItem('email');
      const chama_id = await AsyncStorage.getItem('chama_id');
      const chamaname = await AsyncStorage.getItem('chamaname');
      setChamaName(chamaname);
      try {
        const url = `https://backend1-1cc6.onrender.com/members/${chama_id}/`;
        const response = await axios.get(url);
        if (response.status === 200) {
          setMembers(response.data);
        }
      } catch (error) {
        console.error("Error fetching chamas:", error);
      }
    };
    getMembers();
  }, []);
  // end of getting members

  const AddSavings=async(member_id)=>{
    await AsyncStorage.setItem('member_id', JSON.stringify(member_id));
    router.push('/addsavings');
    
  }

  const AddLoans=async(member_id)=>{
    await AsyncStorage.setItem('member_id', JSON.stringify(member_id));
    router.push('/addloans');
    
  }
  // end

  const renderItem = ({ item }) => (
    <View className="flex-row justify-between items-center bg-white p-3 rounded-lg shadow-sm mb-2">
      <View className="flex-1">
        <Text className="text-gray-800 font-lato font-semibold">{item.name}</Text>
        <Text className="text-gray-500 text-sm">ID: {item.member_id}</Text>
      </View>

      <View className="flex-row space-x-2">
        <TouchableOpacity onPress={()=>AddSavings(item.member_id)} className='mr-8'>
          <Text className="text-blue-600 font-lato font-bold">Add Savings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => AddLoans(item.member_id)}>
          <Text className="text-green-600 font-lato font-bold">Add Loans</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} className="p-4">
        <Text className='mb-4 font-lato font-bold text-lg'>{chamaName}</Text>
        <View className="flex-row flex-wrap justify-between gap-2 mb-4">
  <TouchableOpacity className="bg-yellow-600 p-4 rounded-xl w-[48%] mb-2 shadow-sm" onPress={() => router.push("/register")}>
    <Text className="text-white font-lato text-center font-semibold">➕ Add Member</Text>
  </TouchableOpacity>

  <TouchableOpacity className="bg-yellow-600 p-4 rounded-xl w-[48%] mb-2 shadow-sm" onPress={() =>router.push("/manageroles")}>
    <Text className="text-white font-lato text-center font-semibold">Manage Roles</Text>
  </TouchableOpacity>
</View>

        

        <Text className='font-lato font-bold text-lg mt-4 mb-4'>Members</Text>
           <FlatList
      data={members}
      keyExtractor={(item) => item.member_id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 40 }}
    />


      </ScrollView>
    </SafeAreaView>
  );
}
