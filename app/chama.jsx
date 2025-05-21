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
import Toast from 'react-native-toast-message';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function Chama() {
  const [chama, setChama] = useState("");
  const [isLoadingContribution, setIsLoadingContribution] = useState(false);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(false);
  const [isGettingContributors, setIsGettingContributors] = useState(false);
  const [isGettingLoanees, setIsGettingLoanees] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [data, setData] = useState([]);
  const [totalmembers, setTotalmembers] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalLoans, setTotalLoans] = useState(0);
  const [rentExpense, setRentExpense] = useState(0);
  const [travelExpense, setTravelExpense] = useState(0);
  const [businessExpense, setBusinessExpense] = useState(0);
  const [othersExpense, setOthersExpense] = useState(0);
  let [name, setName] = useState("Suzzana");
  const [chamaName, setChamaName] = useState("");
  const router = useRouter();

  // Fetch core chama data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        const chama = await AsyncStorage.getItem('selected_chama');
        const chama_id = await AsyncStorage.getItem('chama_id');
        const username = await AsyncStorage.getItem('name');
        const chamaname = await AsyncStorage.getItem('selected_chama');
        setChama(chama);
        setName(username);
        setChamaName(chamaname);

        const [membersRes, savingsRes, loansRes, expensesRes] = await Promise.all([
          axios.get(`https://backend1-1cc6.onrender.com/totalchamamembers/${chama}/`),
          axios.get(`https://backend1-1cc6.onrender.com/totalchamasavings/${chama_id}/`),
          axios.get(`https://backend1-1cc6.onrender.com/totalchamaloans/${chama_id}/`),
        ]);

        setTotalmembers(membersRes.data.total_members);
        setTotalSavings(savingsRes.data.total_savings);
        setTotalLoans(loansRes.data.total_loans);
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

  // function to fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoadingExpenses(true);
      try {
        const chama_id = await AsyncStorage.getItem('chama_id');
        const response = await axios.get(`https://backend1-1cc6.onrender.com/totalexpenses/${chama_id}/`);
        if (response.status === 200) {
          setBusinessExpense(response.data.total_business);
          setRentExpense(response.data.total_rent);
          setTravelExpense(response.data.total_travel);
          setOthersExpense(response.data.total_others);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingExpenses(false);
      }
    };

    fetchExpenses();
  }, []);
  // end of function to fetch expense

  // function to print contributors
const getContributors = async () => {
  setIsGettingContributors(true);
  try {
    const chama_id = await AsyncStorage.getItem('chama_id');
    const url = `https://backend1-1cc6.onrender.com/contributors/${chama_id}/`; // adjust endpoint
    const response = await axios.get(url);
    return response.data; // should include contributors and total_contributed
  } catch (error) {
    alert("Failed to fetch contributors");
    return null;
  }
  finally{
    setIsGettingContributors(false);
  }
};
const generateTableHTML = (contributors) => {
  const rows = contributors.map(
    (contributor, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${contributor.name}</td>
        <td>${contributor.email}</td>
        <td>${contributor.contribution_date.split('T')[0]}</td>
        <td>${contributor.amount}</td>
      </tr>
    `
  ).join("");

  return `
    <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color:#f2f2f2;">
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
};
  const downloadContributors = async () => {
    const data = await getContributors();
  if (!data) return;

  const contributors = data.contributors;
  const total = data.total_contributed;

  const tableHTML = generateTableHTML(contributors);

  const html = `
    <html>
      <body>
        <h1 style="text-align:center; margin-top:20px;">${chamaName}</h1>
        <h2 style="text-align:center; margin-top:10px;">Contribution Report</h2><hr>
        <p style="color:black">Generated by: ${name}</p>
        ${tableHTML}
        <h3>Total Contributed: ${total}</h3>
      </body>
    </html>
  `;
     const file = await printToFileAsync({
      html: html,
      base64: false
     });
     await shareAsync(file.uri);
};
  // end of function print contributors
  
// function to print loanees
const getLoanees = async () => {
  setIsGettingLoanees(true);
  try {
    const chama_id = await AsyncStorage.getItem('chama_id');
    const url = `https://backend1-1cc6.onrender.com/loanees/${chama_id}/`; // adjust endpoint
    const response = await axios.get(url);
    return response.data; // should include contributors and total_contributed
  } catch (error) {
    alert("Failed to fetch contributors");
    return null;
  }
  finally{
    setIsGettingLoanees(false);
  }
};
const generateTableHTML2 = (loanees) => {
  const rows = loanees.map(
    (loanees, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${loanees.name}</td>
        <td>${loanees.email}</td>
        <td>${loanees.loan_status}</td>
        <td>${loanees.loan_type}</td>
        <td>${loanees.loan_date.split('T')[0]}</td>
        <td>${loanees.amount}</td>
      </tr>
    `
  ).join("");

  return `
    <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color:#f2f2f2;">
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Type</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
};
  const downloadLoanees = async () => {
    const data = await getLoanees();
  if (!data) return;

  const loanees = data.loanees;
  const total = data.total_loan;

  const tableHTML = generateTableHTML2(loanees);

  const html = `
    <html>
      <body>
        <h1 style="text-align:center; margin-top:20px;">${chamaName}</h1>
        <h2 style="text-align:center; margin-top:10px;">Loan Report</h2><hr>
        <p style="color:black">Generated by: ${name}</p>
        ${tableHTML}
        <h3>Total Loan: ${total}</h3>
      </body>
    </html>
  `;
     const file = await printToFileAsync({
      html: html,
      base64: false
     });
     await shareAsync(file.uri);
};
  // end of function print contributors

  const Contribution = ({ name, contribution_date, amount }) => (
    <View className="w-full bg-white p-4 rounded-lg shadow-md mb-2">
      <View className="flex-row justify-between">
        <Text className="font-bold text-base text-gray-800">{name}</Text>
        <Text className="text-sm text-gray-500">{contribution_date}</Text>
      </View>
      <Text className="text-lg font-bold text-yellow-600 mt-2">KES {amount}</Text>
    </View>
  );

  const Alert = () => (
    <View className="w-full bg-yellow-100 p-4 rounded-md items-center">
      <Text className="text-yellow-600 font-semibold">No contributions found.</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView className="p-4">
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
          <View className="bg-white p-4 mt-5 rounded-lg shadow">
            <Text className="text-lg font-bold text-yellow-700">{`KES ${othersExpense}`}</Text>
            <Text className="text-gray-600">Others</Text>
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
              {isGettingContributors ? <Text>...</Text> : <Text className="font-semibold">Print Savings</Text>}
                <Entypo name="print" size={22} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white p-4 rounded-lg shadow ml-2" onPress={downloadLoanees}>
              <View className="flex-row justify-between items-center">
                {isGettingLoanees ? <Text>...</Text> : <Text className="font-semibold">Print Loans</Text>}
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
          <View className='mb-40'>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
