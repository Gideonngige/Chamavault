import { SafeAreaView, ScrollView, Text, View, ActivityIndicator, TouchableOpacity,Image, ImageBackground, FlatList } from 'react-native';
import { useRouter } from "expo-router";
// import { DataTable } from "react-native-paper";
import NavBar from "./NavBar";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Saving() {
  const router = useRouter();
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { username, email, chama, savingAmount, interest, penalty, phonenumber} = route.params;
  const [transactions, setTransactions] = useState([]);

  // fetch transactions data
  useEffect(() => {
   
    const fetchTransactions = async() => {
       const email = await AsyncStorage.getItem('email');
      axios.get(`https://backend1-1cc6.onrender.com/transactions/Contribution/${email}/`)
          .then((response) => {
            setTransactions(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });

    }
    fetchTransactions();
  }, []);
  // end of fetch transactions

  // handle top up 
  const handleTopUp = () => {
    navigation.navigate('contribution', {
      phonenumber: phonenumber,
    });
  };
  //end of handle top up

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
    <SafeAreaView  className="flex-1 bg-white">
      <ScrollView  className="p-4">
        <View className="flex-row justify-between items-start mb-6 ">
        <View className="w-full p-4 bg-white">
          {/* welcome part */}
          <Text className="text-3xl font-bold text-gray-800 mb-0">Welcome back,{username}</Text>
          <Text className='text-lg font-bold text-gray-800 mt-0'>Time to save your money</Text>
          <View className="p-4">
            {/* loan image part */}
      <ImageBackground
        source={require('../assets/images2/invest.png')}
        className="w-full h-48 rounded-lg overflow-hidden justify-center"
        style={{ resizeMode: 'contain', width: '100%', height: 200 }}
      >
        <View className="p-5">
          <Text className="text-xl font-bold text-gray-900">Your Savings</Text>
          <Text className="text-2xl font-bold text-gray-800">KES. {savingAmount}</Text>
        </View>
      </ImageBackground>

      {/* top up part */}
      <View className="bg-yellow-600 p-4 rounded-lg mt-5 flex flex-row justify-around">
        <TouchableOpacity
          className="bg-white py-3 px-5 rounded-xl items-center"
          onPress={handleTopUp}
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

      {/* saving part */}

      {/* go to invest */}
      <TouchableOpacity className="bg-yellow-600 rounded-lg w-full mt-5 h-10 flex items-center justify-center" onPress={() => router.push('invest/')}>
      <Text className="text-white font-bold">Invest</Text>
      </TouchableOpacity>
      {/* end of go to invest */}
      <View>
        <Text className='font-bold mt-5'>My savings</Text>
        <View className='bg-yellow-600 rounded-lg'>
        <View className='bg-yellow-600 p-4 rounded-lg mt-5 flex flex-row justify-around'>
          <View>
            <Image source={require('../assets/images2/logo.png')} style={{width:40, height:40}} className='rounded-full'/>
          </View>
          <View>
            <Text className='text-2xl font-bold'>Chamavault</Text>
            <Text>saving for future</Text>
          </View>
        </View>
        <Text className='ml-5 font-bold'>{username}</Text>
        <View className='p-2 mt-0 flex flex-row justify-around'>
          <View>
            <Text>Your savings</Text>
          </View>
          <View>
            <Text className='font-bold'>KES.{savingAmount}</Text>
          </View>
        </View>
        <View className='p-2 mt-0 flex flex-row justify-around'>
          <View>
            <Text>Annual rate</Text>
          </View>
          <View>
            <Text className='font-bold'>{interest}%</Text>
          </View>
        </View>
        <View className='p-2 mt-0 flex flex-row justify-around'>
          <View>
            <Text>Penality</Text>
          </View>
          <View>
            <Text className='font-bold'>KES.{penalty}</Text>
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