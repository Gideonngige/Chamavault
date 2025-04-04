import { SafeAreaView, ScrollView, Text, View,FlatList, ActivityIndicator, TouchableOpacity,Image, ImageBackground } from 'react-native';
import { useRouter } from "expo-router";
import { useRoute } from '@react-navigation/native';
import NavBar from "./NavBar";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Loans() {
  const navigation = useNavigation();
  const router = useRouter();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const { username, email, loan, loanInterest} = route.params;
  const data = [
    { id: "1", name: "John Doe", age: 28, city: "New York" },
    { id: "2", name: "Jane Smith", age: 32, city: "Los Angeles" },
    { id: "3", name: "Michael Johnson", age: 24, city: "Chicago" },
  ];
  const [transactions, setTransactions] = useState([]);


    // fetch loan transactions data
    useEffect(() => {
      setIsLoading(true); 
      const fetchTransactions = async() => {
        const email = await AsyncStorage.getItem('email');
        const chama_id = await AsyncStorage.getItem('chama');
        axios.get(`https://backend1-1cc6.onrender.com/transactions/Loan/${email}/${chama_id}/`)
            .then((response) => {
              setTransactions(response.data);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error(error);
            }).finally(() => {setIsLoading(false);});
  
      }
      fetchTransactions();
      const interval = setInterval(() => {
        fetchTransactions();
      }, 10000); // 10 seconds
    
      // Clear interval when component unmounts
      return () => clearInterval(interval);
    }, []);
    // end of fetch loan transactions

  const handleApplyLoan =()=>{
    navigation.navigate('applyloan', {
      email:email,
    });
  }

   // start of activity
   const Activity = ({transactionType, chama, amount, transactionTime}) => {
    return(
      <View className='bg-yellow-600 p-2 mt-0 mb-2 flex flex-row justify-around'>
          <View>
            <Text>{transactionType}</Text>
            <Text>Chama{chama}</Text>
          </View>
          <View>
            <Text className='font-bold'>KES.{amount}</Text>
            <Text className='font-bold'>{transactionTime}</Text>
          </View>
        </View>
    );
  }
  // end of activity

   if (isLoading) {
            return <ActivityIndicator size="large" color="#FFA500" />;
    }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-row justify-between items-start mb-6 ">
        <View className="w-full p-4 bg-white">
          {/* welcome part */}
          <Text className="text-3xl font-bold text-gray-800 mb-0">Welcome back,{username}</Text>
          <Text className='text-lg font-bold text-gray-800 mt-0'>Time to borrow money</Text>
          <View className="p-4">
            {/* loan image part */}
      <ImageBackground
        source={require('../assets/images2/loan.png')}
        className="w-full h-48 rounded-lg overflow-hidden justify-center"
        style={{ resizeMode: 'contain', width: '100%', height: 200 }}
      >
        <View className="p-5">
          <Text className="text-xl font-bold text-gray-900">Your Loans</Text>
          <Text className="text-2xl font-bold text-gray-800">KES. {loan}</Text>
        </View>
      </ImageBackground>

      {/* top up part */}
      <View className="bg-yellow-600 p-4 rounded-lg mt-5 flex flex-row justify-around">
        <TouchableOpacity
          className="bg-white py-3 px-5 rounded-xl items-center"
          onPress={handleApplyLoan}
        >
          <FontAwesome6 name="add" size={24} color="black" />
          <Text className="text-gray-900 font-medium mt-1">Take Loan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white py-3 px-5 rounded-xl items-center"
          onPress={() => router.push("appliedloans/")}
        >
          <FontAwesome6 name="money-bills" size={24} color="black" />
          <Text className="text-gray-900 font-medium mt-1">Pay Loan</Text>
        </TouchableOpacity>
      </View>

      {/* saving part */}
      <View>
        <Text className='font-bold mt-5'>My Loans</Text>
        <View className='bg-yellow-600 rounded-lg'>
        <View className='bg-yellow-600 p-4 rounded-lg mt-5 flex flex-row justify-around'>
          <View>
            <Image source={require('../assets/images2/logo.png')} style={{width:40, height:40}} className='rounded-full'/>
          </View>
          <View>
            <Text className='text-2xl font-bold'>Chamavault</Text>
            <Text>borrowing to grow</Text>
          </View>
        </View>
        <Text className='ml-5 font-bold'>{username}</Text>
        <View className='p-2 mt-0 flex flex-row justify-around'>
          <View>
            <Text>Your loans</Text>
          </View>
          <View>
            <Text className='font-bold'>KES.{loan}</Text>
          </View>
        </View>
        <View className='p-2 mt-0 flex flex-row justify-around'>
          <View>
            <Text>Annual rate</Text>
          </View>
          <View>
            <Text className='font-bold'>{loanInterest}%</Text>
          </View>
        </View>
        <View className='p-2 mt-0 flex flex-row justify-around'>
          <View>
            <Text>Penality</Text>
          </View>
          <View>
            <Text className='font-bold'>KES.0.00</Text>
          </View>
        </View>
        </View>

        {/* your activity part  */}
        <Text className='ml-1 font-bold mt-5'>Your activity</Text>

        <FlatList
            data={transactions} // Array of data
            keyExtractor={(item) => item.transaction_id.toString()} // Unique key for each item
            renderItem={({ item }) => <Activity transactionType={item.transaction_type} chama={item.chama} amount={item.amount} transactionTime={item.transaction_date.split("T")[0]} />} // How each item is displayed
            showsVerticalScrollIndicator={false} // Hides the scrollbar
            listMode="SCROLLVIEW"
            />
        
      </View>
      </View>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}