import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Icons
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Saving() {
  const router = useRouter();
  const route = useRoute();
  const navigation = useNavigation();

  const [transactions, setTransactions] = useState([]);
  const [chama, setChama] = useState('0');
  const [saving, setSaving] = useState(0);
  const [educationSavings, setEducationSavings] = useState(0);
  const [ordinarySavings, setOrdinarySavings] = useState(0);
  const [interest, setInterest] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [savingDate, setSavingDate] = useState('N/A');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [checkingDate, setCheckingDate] = useState(false);

  // Fetch savings data
  useEffect(() => {
    const getSavings = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedName = await AsyncStorage.getItem('name');
      const storedChama = await AsyncStorage.getItem('chama_id');
      const member_id = await AsyncStorage.getItem('member_id');

      setName(storedName);
      setEmail(storedEmail);
      setChama(storedChama);
      setIsLoadingData(true);

      try {
        const url = `https://backend1-1cc6.onrender.com/getContributions/${storedChama}/${member_id}/`;
        const response = await axios.get(url);

        if (response.status === 200) {
          setEducationSavings(response.data.total_edu_contributions)
          setOrdinarySavings(response.data.total_ord_contributions)
        }
      } catch (error) {
        console.error('Error fetching savings:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    getSavings();
    setInterval(() => {
      getSavings();
    }, 3000);
  }, [email]);

  // Check if user is a defaulter
  useEffect(() => {
    const checkDefaulter = async () => {
      const member_id = await AsyncStorage.getItem('member_id');
      const chama_id = await AsyncStorage.getItem('chama_id');

      try {
        const url = `https://backend1-1cc6.onrender.com/defaulters/${member_id}/${chama_id}/`;
        const response = await axios.get(url);

        if (response.status === 200) {
          console.log('You are a defaulter, please pay your penalty');
        }
      } catch (error) {
        console.error('Error checking defaulter:', error);
      }
    };

    checkDefaulter();
  }, [email]);

  // Fetch transaction history
  useEffect(() => {
    const fetchTransactions = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedChama = await AsyncStorage.getItem('chama_id');

      setIsLoadingTransactions(true);

      try {
        const response = await axios.get(
          `https://backend1-1cc6.onrender.com/transactions/Contribution/${storedEmail}/${storedChama}/`
        );

        if (response.status === 200) {
          setTransactions(response.data);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoadingTransactions(false);
      }
    };

    fetchTransactions();
  }, []);

  // Navigate to top-up screen
  const handleTopUp = async(saving_type) => {
    await AsyncStorage.setItem('saving_type', saving_type);
    router.push('/contribution');
  };

  // Activity card component
  const Activity = ({ transactionType, chama, amount, transactionTime }) => (
    <View className="bg-yellow-600 p-2 mt-0 mb-2 flex flex-row justify-around rounded-lg">
      <View>
        <Text className="font-lato">{transactionType}</Text>
        <Text className='font-lato'>{chama}</Text>
      </View>
      <View>
        <Text className="font-bold font-lato">KES. {amount}</Text>
        <Text className="font-bold font-lato">{transactionTime}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="w-full p-4 bg-white mb-40">
          {/* Header */}
          <Text className="text-3xl font-bold text-gray-800 font-lato">
            Welcome back, {name}
          </Text>
          <Text className="text-lg font-bold text-gray-800 mt-1 font-lato">
            Time to save your money
          </Text>


          {/* Top-up & Withdraw Buttons */}
  <View className="space-y-5 mt-5">
  {[
    { title: 'Ordinary Savings', amount: ordinarySavings, saving_type:"ordinary" },
    { title: 'Education Booster Funds', amount: educationSavings, saving_type:"education" },
  ].map((item, index) => (
    <View
      key={index}
      className="bg-yellow-500 p-5 rounded-2xl shadow-md mb-5"
    >
      <Text className="text-white text-lg font-semibold mb-1">
        {item.title}
      </Text>
      <Text className="text-white text-base mb-4">
        Amount: <Text className="font-bold">KES.{item.amount}</Text>
      </Text>

      <TouchableOpacity
        onPress={()=>handleTopUp(item.saving_type)}
        className="flex-row items-center w-full bg-white px-4 py-3 rounded-xl self-start"
      >
        <FontAwesome6 name="plus" size={18} color="black" />
        <Text className="ml-2 text-black font-semibold text-base font-lato">
          Top Up
        </Text>
      </TouchableOpacity>
    </View>
  ))}
</View>


          {/* Activity Section */}
          <Text className="ml-1 font-bold mt-6 text-lg font-lato">My activities</Text>

          {isLoadingTransactions ? (
            <Text className="text-lg font-bold font-lato mt-3">Loading...</Text>
          ) : (
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.transaction_id.toString()}
              renderItem={({ item }) => (
                <Activity
                  transactionType={item.transaction_type}
                  chama={item.transactionRef}
                  amount={item.amount}
                  transactionTime={item.transaction_date.split('T')[0]}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Status Bar */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
    </SafeAreaView>
  );
}
