import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';

export default function Chama() {
  const [chama, setChama] = useState("");
  const [isLoadingContribution, setIsLoadingContribution] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [data, setData] = useState([]);
  const [totalmembers, setTotalmembers] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalLoans, setTotalLoans] = useState(0);
  const [rentExpense, setRentExpense] = useState(0);
  const [travelExpense, setTravelExpense] = useState(0);
  const [businessExpense, setBusinessExpense] = useState(0);
  const router = useRouter();

  // Fetch core chama data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const chama = await AsyncStorage.getItem('selected_chama');
        const chama_id = await AsyncStorage.getItem('chama_id');
        setChama(chama);

        const [membersRes, savingsRes, loansRes, expensesRes] = await Promise.all([
          axios.get(`https://backend1-1cc6.onrender.com/totalchamamembers/${chama}/`),
          axios.get(`https://backend1-1cc6.onrender.com/totalchamasavings/${chama}/`),
          axios.get(`https://backend1-1cc6.onrender.com/totalchamaloans/${chama}/`),
          axios.get(`https://backend1-1cc6.onrender.com/getexpenses/${chama_id}/`)
        ]);

        setTotalmembers(membersRes.data.total_members);
        setTotalSavings(savingsRes.data.total_savings);
        setTotalLoans(loansRes.data.total_loans);
        setRentExpense(expensesRes.data.total_rent);
        setTravelExpense(expensesRes.data.total_travel);
        setBusinessExpense(expensesRes.data.total_business);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchData();
  }, [chama]);

  // Fetch contributions
  useEffect(() => {
    const fetchContributions = async () => {
      setIsLoadingContribution(true);
      try {
        const chama_id = await AsyncStorage.getItem('chama_id');
        const response = await axios.get(`https://backend1-1cc6.onrender.com/getmemberscontribution/${chama_id}/`);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingContribution(false);
      }
    };

    fetchContributions();
  }, []);

  // function to print contributors
  const downloadContributors = async () => {
    const chama_id = await AsyncStorage.getItem('chama_id');
  try {
    const response = await axios.get(`https://backend1-1cc6.onrender.com/contributors/${chama_id}/`);
    const contributors = response.data;

    if (!contributors.length) {
      Toast.show({ type: 'info', text1: 'No contributions found' });
      return;
    }

    let total = 0;
    const formattedList = contributors.map((c, i) => {
      total += parseFloat(c.amount); // assuming c.amount is a number or string
      return `${i + 1}. ${c.name} - ${c.email} - KES ${c.amount}`;
    });

    // Add total at the end
    formattedList.push('\n');
    formattedList.push(`Total Contributed: KES ${total}`);

    const finalText = formattedList.join('\n');

    const fileUri = FileSystem.documentDirectory + 'contributors.txt';
    await FileSystem.writeAsStringAsync(fileUri, finalText, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    await Sharing.shareAsync(fileUri);
    Toast.show({ type: 'success', text1: 'Contributors list downloaded!' });

  } catch (error) {
    console.error("Download error:", error);
    Toast.show({
      type: 'error',
      text1: 'Failed to download',
      text2: error.message,
    });
  }
};
  // end of function print contributors

  const Contribution = ({ name, contribution_date, amount }) => (
    <View className="w-full bg-white p-4 rounded-lg shadow-md mb-20">
      <View className="flex-row justify-between">
        <Text className="font-bold text-base text-gray-800">{name}</Text>
        <Text className="text-sm text-gray-500">{contribution_date}</Text>
      </View>
      <Text className="text-lg font-bold text-yellow-600 mt-2">KES {amount}</Text>
    </View>
  );

  const Alert = () => (
    <View className="w-full bg-yellow-100 p-4 rounded-md items-center">
      <Text className="text-yellow-800 font-semibold">No contributions found.</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView className="p-4 mb-20">
        <View className="space-y-6">

          {/* Header summary cards */}
          <View className="flex-row justify-between">
            <View className="flex-1 bg-white p-4 rounded-lg shadow mr-2">
              <Text className="text-lg font-bold text-yellow-700">
                {isLoadingData ? "Loading..." : `KES ${totalSavings}`}
              </Text>
              <Text className="text-gray-600">Total Savings</Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-lg shadow ml-2">
              <Text className="text-lg font-bold text-yellow-700">
                {isLoadingData ? "Loading..." : `KES ${totalLoans}`}
              </Text>
              <Text className="text-gray-600">Total Loans</Text>
            </View>
          </View>

          {/* Expenses section */}
          <Text className="text-lg font-bold text-gray-800">Expenses</Text>
          <View className="flex-row justify-between">
            <View className="flex-1 bg-white p-4 rounded-lg shadow mr-2">
              <Text className="text-lg font-bold text-yellow-700">{`KES ${rentExpense}`}</Text>
              <Text className="text-gray-600">Rent</Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-lg shadow ml-2">
              <Text className="text-lg font-bold text-yellow-700">{`KES ${travelExpense}`}</Text>
              <Text className="text-gray-600">Travel</Text>
            </View>
          </View>
          <View className="bg-white p-4 mt-5 rounded-lg shadow">
            <Text className="text-lg font-bold text-yellow-700">{`KES ${businessExpense}`}</Text>
            <Text className="text-gray-600">Business</Text>
          </View>

          {/* Members Button */}
          <TouchableOpacity
            className="bg-yellow-600 mt-5 mb-5 w-full h-12 flex-row justify-between items-center px-4 rounded-lg"
            onPress={() => router.push("members/")}
          >
            <Text className="font-bold text-white text-base">Members ({totalmembers})</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
          {/* poll button */}
          <TouchableOpacity
            className="bg-yellow-600 mt-5 mb-5 w-full h-12 flex-row justify-between items-center px-4 rounded-lg"
            onPress={() => router.push("activepolls/")}
          >
            <Text className="font-bold text-white text-base">Active Polls</Text>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>

          {/* Print & Reports */}
          <Text className="text-lg font-bold text-gray-800">Reports</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="flex-1 bg-white p-4 rounded-lg shadow mr-2" onPress={downloadContributors}>
              <View className="flex-row justify-between items-center">
                <Text className="font-semibold">Print Savings</Text>
                <Entypo name="print" size={22} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white p-4 rounded-lg shadow ml-2" onPress={() => alert("Coming soon!")}>
              <View className="flex-row justify-between items-center">
                <Text className="font-semibold">Print Loans</Text>
                <Entypo name="print" size={22} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Defaulters Section */}
          <Text className="text-lg font-bold mt-5 text-gray-800">Defaulters</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity className="flex-1 bg-white p-4 rounded-lg shadow mr-2" onPress={() => router.push("defaulters/")}>
              <Text className="font-semibold text-center text-gray-700">View Defaulters</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white p-4 rounded-lg shadow ml-2" onPress={() => router.push("location/")}>
              <Text className="font-semibold text-center text-gray-700">View Locations</Text>
            </TouchableOpacity>
          </View>
          <Toast/>

          {/* Contributions List */}
          <Text className="text-lg font-bold mt-5 text-gray-800">Recent Contributions</Text>
          {data.length === 0 ? (
            <Alert />
          ) : (
            <FlatList
              keyExtractor={(item) => item.contribution_id.toString()}
              data={data}
              renderItem={({ item }) => (
                <Contribution
                  name={item.member}
                  contribution_date={item.contribution_date.split("T")[0]}
                  amount={item.amount}
                />
              )}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
