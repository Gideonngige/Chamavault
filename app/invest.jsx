import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, FlatList, ImageBackground, StatusBar, Image } from 'react-native';
import { useRouter } from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from "react-native-toast-message";


export default function Invest() {
  const router = useRouter();
  const[userName, setUserName] =  useState("");
  const[userEmail, setUserEmail] = useState("");
  const [investments, setInvestments] = useState([]);
  const [total_investments, setTotalInvestments] = useState(0);
  

// fettch investment data
useEffect(() => {
  const fetchData = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      const name = await AsyncStorage.getItem('name');
      const chama_id = await AsyncStorage.getItem('chama');
      setUserName(name);
      
      const url = `https://backend1-1cc6.onrender.com/getInvestment/${email}/${chama_id}/`;
      const response = await axios.get(url);
      
      if(response.status === 200){
        setInvestments(response.data.investments);
        
      }
      
    } 
    catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  fetchData();
  const interval = setInterval(() => {
    fetchData();
  }, 5000); // 5 seconds

  // Clear interval when component unmounts
  return () => clearInterval(interval);

},[userEmail]);
// end pf fetching investment data 

// get total invstment
useEffect(() => {
  const getTotalInvestment = async () => {
    const member_id = await AsyncStorage.getItem('member_id');
    try{
      const url = `https://backend1-1cc6.onrender.com/calculate_investment/${member_id}/`;
      const response = await axios.get(url);
      if(response.status === 200){
        setTotalInvestments(response.data.total);
      }

    }
    catch(error){
      console.log(error);
    }

  }
  getTotalInvestment();
},[])
// end of get total investment



const InvestmentCard = ({ userName, investment, amount, interest_earned }) => (
  <View className='w-full p-4 m-2 bg-yellow-600 rounded-lg shadow-lg'>
      <View className="flex-row justify-between bg-white p-3 rounded-lg">
          <Text className='font-bold'>{userName}</Text>
          <Text className='font-bold'>Investment</Text>
      </View>
          <Text className='font-bold'>{investment}</Text>
          <Text className='m-3'>Amount: {amount}</Text>
          <Text className='m-3'>Intrest rate: 5%</Text>
          <Text className='m-3'>Intrest earned: {interest_earned}</Text>
  </View>
);


// avalaible investments
const availableInvestments = [
  {
    id: 1,
    name: 'Real Estate Fund',
    description: 'Invest in commercial properties with monthly profit returns.',
    min_amount: 1000,
    interest_rate: '5% per month',
    duration: '6 months',
    image: require('../assets/images2/loan.png'),
  },
  {
    id: 2,
    name: 'Agri-Business Pool',
    description: 'Support local farms and earn seasonal returns.',
    min_amount: 500,
    interest_rate: '4% per month',
    duration: '3 months',
    image: require('../assets/images2/saving.png'),
  },
];

const InvestmentItem = ({ item }) => {
  const router = useRouter();
  return (
    <View className="bg-white p-4 mb-4 rounded-xl shadow-md">
      <View className="flex-row items-center mb-3">
        <Image source={item.image} className="w-16 h-16 mr-4 rounded-md" />
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
          <Text className="text-sm text-gray-600">{item.description}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mt-2 mb-2">
        <Text className="text-sm text-gray-700">Minimum: <Text className="font-semibold">KES {item.min_amount}</Text></Text>
        <Text className="text-sm text-gray-700">Duration: <Text className="font-semibold">{item.duration}</Text></Text>
      </View>

      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-sm text-gray-700">Interest: <Text className="font-semibold text-green-700">{item.interest_rate}</Text></Text>
      </View>

      <TouchableOpacity
        className="bg-yellow-600 py-2 px-4 rounded-xl flex-row items-center justify-center"
        onPress={() => router.push({ pathname: '/investDetails', params: { id: item.id } })}
      >
        <FontAwesome6 name="money-bill-trend-up" size={20} color="#fff" />
        <Text className="text-white font-bold ml-2">Invest Now</Text>
      </TouchableOpacity>
    </View>
  );
};

// end of available invetsment

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-row justify-between items-start mb-6 ">
        <View className="w-full p-4 bg-white">
          {/* welcome part */}
          <Text className="text-3xl font-bold text-gray-800 mb-0">Welcome back, {userName}</Text>
          <Text className='text-lg font-bold text-gray-800 mt-0'>Time to invest your money</Text>
          <View className="p-0">
    {/* investment part */}
    <View className="w-full mt-4 mb-6">
  <Text className="text-xl font-bold text-gray-800 mb-3">💰 Your Investments Breakdown</Text>

  <View className="flex-row flex-wrap justify-between">
    {/* Card 1 */}
    <View className="bg-yellow-600 w-[48%] h-36 rounded-xl mb-4 p-4 shadow-md">
      <Text className="text-white font-bold text-lg mb-1">🏢 Real Estate</Text>
      <Text className="text-white">Invested</Text>
      <Text className="text-2xl font-extrabold text-white mt-2">KES 8,500</Text>
    </View>

    {/* Card 2 */}
    <View className="bg-yellow-600 w-[48%] h-36 rounded-xl mb-4 p-4 shadow-md">
      <Text className="text-white font-bold text-lg mb-1">🌾 Agri-Business</Text>
      <Text className="text-white">Invested</Text>
      <Text className="text-2xl font-extrabold text-white mt-2">KES 3,000</Text>
    </View>

    {/* Card 3 */}
    <View className="bg-yellow-600 w-[48%] h-36 rounded-xl mb-4 p-4 shadow-md">
      <Text className="text-white font-bold text-lg mb-1">💻 Tech Fund</Text>
      <Text className="text-white">Invested</Text>
      <Text className="text-2xl font-extrabold text-white mt-2">KES 5,750</Text>
    </View>

    {/* Card 4 */}
    <View className="bg-yellow-600 w-[48%] h-36 rounded-xl mb-4 p-4 shadow-md">
      <Text className="text-white font-bold text-lg mb-1">🚐 Transport Pool</Text>
      <Text className="text-white">Invested</Text>
      <Text className="text-2xl font-extrabold text-white mt-2">KES 2,250</Text>
    </View>
  </View>
</View>

    {/* end of investment part */}

      

      {/* available investments */}
      <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">📈 Available Investments</Text>

      <FlatList
        data={availableInvestments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <InvestmentItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
      {/* end of available investments */}

       <FlatList
          data={investments} // Array of data
          keyExtractor={(item, index) => index.toString()} // Unique key for each item
          renderItem={({ item }) => <InvestmentCard userName={userName} investment={item.investment_type} amount={item.investment_amount} interest_earned={item.profit_amount} />} // How each item is displayed
          showsVerticalScrollIndicator={false} // Hides the scrollbar
          listMode="SCROLLVIEW"
        />


       {/* activity part */}
       <View className="flex-row justify-between bg-white p-3 rounded-lg">
       <Text className='font-bold'>Activity</Text>
       <Text className='font-bold'><TouchableOpacity onPress={() => router.push('activity/')}><Text>View All</Text></TouchableOpacity></Text>

       </View>
      <View className='w-full px-4 py-6 m-2 bg-white rounded-2xl shadow-md'>
  <Text className='text-lg font-bold text-gray-800 mb-4'>📊 Recent Interest Payments</Text>

  {/* Activity Item 1 */}
  <View className='flex-row justify-between items-center bg-yellow-100 px-4 py-3 rounded-xl mb-3'>
    <View>
      <Text className='text-md font-semibold text-gray-700'>Interest Paid</Text>
      <Text className='text-sm text-gray-500'>12/08/2024</Text>
    </View>
    <Text className='text-md font-bold text-green-700'>+KES 0.55</Text>
  </View>

  {/* Activity Item 2 */}
  <View className='flex-row justify-between items-center bg-yellow-100 px-4 py-3 rounded-xl'>
    <View>
      <Text className='text-md font-semibold text-gray-700'>Interest Paid</Text>
      <Text className='text-sm text-gray-500'>12/08/2024</Text>
    </View>
    <Text className='text-md font-bold text-green-700'>+KES 0.55</Text>
  </View>
</View>

       {/* activity part */}
       <Toast/>
      </View>
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