import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, FlatList, ImageBackground, StatusBar } from 'react-native';
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
// show investment component 

// end 

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-row justify-between items-start mb-6 ">
        <View className="w-full p-4 bg-white">
          {/* welcome part */}
          <Text className="text-3xl font-bold text-gray-800 mb-0">Welcome back, {userName}</Text>
          <Text className='text-lg font-bold text-gray-800 mt-0'>Time to invest your money</Text>
          <View className="p-0">
            {/* loan image part */}
      <ImageBackground
        source={require('../assets/images2/invest.png')}
        className="w-full h-48 rounded-lg overflow-hidden justify-center"
        style={{ resizeMode: 'contain', width: '100%', height: 200 }}
      >
        <View className="p-5">
          <Text className="text-xl font-bold text-gray-900">Your Investment</Text>
          <Text className="text-2xl font-bold text-gray-800">KES. {total_investments}</Text>
        </View>
      </ImageBackground>

      {/* top up part */}
      <View className="bg-yellow-600 p-4 m-2 w-full rounded-lg mt-5 flex flex-row justify-around">
        <TouchableOpacity
          className="bg-white py-3 px-5 rounded-xl items-center"
          onPress={() => router.push("topupinvestment/")}
        >
          <FontAwesome6 name="add" size={24} color="black" />
          <Text className="text-gray-900 font-medium mt-1">Top up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white py-3 px-5 rounded-xl items-center"
          onPress={() => router.push('/chama')}
        >
          <FontAwesome6 name="money-bills" size={24} color="black" />
          <Text className="text-gray-900 font-medium mt-1">Withdraw</Text>
        </TouchableOpacity>
      </View>

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
      <View className='w-full p-4 m-2 bg-yellow-600 rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold'>Interest paid</Text>
                    <Text className='font-bold'>+0.55</Text>
                </View>
                <Text className='font-bold mb-5'>12/08/2024</Text>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold'>Interest paid</Text>
                    <Text className='font-bold'>+0.55</Text>
                </View>
                <Text className='font-bold mb-5'>12/08/2024</Text>
  
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