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
  const [interest, setInterest] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [savingDate, setSavingDate] = useState('N/A');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);

  // Fetch savings data
  useEffect(() => {
    const getSavings = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedName = await AsyncStorage.getItem('name');
      const storedChama = await AsyncStorage.getItem('chama_id');

      setName(storedName);
      setEmail(storedEmail);
      setChama(storedChama);
      setIsLoadingData(true);

      try {
        const url = `https://backend1-1cc6.onrender.com/getContributions/${storedChama}/${storedEmail}/`;
        const response = await axios.get(url);

        if (response.status === 200) {
          setSaving(response.data.total_contributions);
          setInterest(response.data.interest);
          setPenalty(response.data.penalty);

          if (response.data.saving_date.length === 0) {
            setSavingDate('N/A');
          } else {
            setSavingDate(response.data.saving_date[0].contribution_date);
          }
        }
      } catch (error) {
        console.error('Error fetching savings:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    getSavings();
  }, [email]);

  // Check if user is a defaulter
  useEffect(() => {
    const checkDefaulter = async () => {
      const member_id = await AsyncStorage.getItem('member_id');
      const chama_id = await AsyncStorage.getItem('chama_id');
      alert(chama_id);

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
  const handleTopUp = () => {
    router.push('/contribution');
  };

  // Activity card component
  const Activity = ({ transactionType, chama, amount, transactionTime }) => (
    <View className="bg-yellow-600 p-2 mt-0 mb-2 flex flex-row justify-around rounded-lg">
      <View>
        <Text className="font-serif">{transactionType}</Text>
        <Text>Chama {chama}</Text>
      </View>
      <View>
        <Text className="font-bold font-serif">KES. {amount}</Text>
        <Text className="font-bold font-serif">{transactionTime}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white mb-40">
      <ScrollView className="p-4">
        <View className="w-full p-4 bg-white">
          {/* Header */}
          <Text className="text-3xl font-bold text-gray-800 font-serif">
            Welcome back, {name}
          </Text>
          <Text className="text-lg font-bold text-gray-800 mt-1 font-serif">
            Time to save your money
          </Text>

          {/* Balance Display */}
          <ImageBackground
            source={require('../assets/images2/invest.png')}
            className="w-full h-48 rounded-lg overflow-hidden mt-4"
            style={{ resizeMode: 'contain' }}
          >
            <View className="p-5">
              <Text className="text-xl font-bold text-gray-900 font-serif">
                Total Balance
              </Text>
              <Text className="text-2xl font-bold text-gray-800 font-serif">
                {isLoadingData ? 'Loading...' : `KES. ${saving}`}
              </Text>
            </View>
          </ImageBackground>

          {/* Top-up & Withdraw Buttons */}
          <View className="bg-yellow-600 p-4 rounded-lg mt-5 flex flex-row justify-around">
            <TouchableOpacity
              className="bg-white py-3 px-5 rounded-xl items-center"
              onPress={handleTopUp}
            >
              <FontAwesome6 name="add" size={24} color="black" />
              <Text className="text-gray-900 font-medium mt-1 font-serif">Top up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white py-3 px-5 rounded-xl items-center"
              onPress={() => alert('Coming soon!')}
            >
              <FontAwesome6 name="money-bills" size={24} color="black" />
              <Text className="text-gray-900 font-medium mt-1 font-serif">Withdraw</Text>
            </TouchableOpacity>
          </View>

          {/* Savings Summary */}
          <Text className="font-bold mt-5 text-lg font-serif">My savings</Text>
          <View className="bg-yellow-600 rounded-lg p-3 mt-2">
            <View className="flex flex-row justify-between mb-2">
              <Text className="font-serif">Your savings</Text>
              <Text className="font-bold font-serif">
                {isLoadingData ? 'Loading...' : `KES. ${saving}`}
              </Text>
            </View>
            <View className="flex flex-row justify-between mb-2">
              <Text className="font-serif">Annual rate</Text>
              <Text className="font-bold font-serif">
                {isLoadingData ? 'Loading...' : `${interest}%`}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="font-serif">Penalty</Text>
              <Text className="font-bold font-serif">
                {isLoadingData ? 'Loading...' : `KES. ${penalty}`}
              </Text>
            </View>
          </View>

          {/* Activity Section */}
          <Text className="ml-1 font-bold mt-6 text-lg font-serif">My activities</Text>

          {isLoadingTransactions ? (
            <Text className="text-lg font-bold font-serif mt-3">Loading...</Text>
          ) : (
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.transaction_id.toString()}
              renderItem={({ item }) => (
                <Activity
                  transactionType={item.transaction_type}
                  chama={item.chama}
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
