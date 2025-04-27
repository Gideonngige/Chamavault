import { SafeAreaView, ScrollView, Text, View, ActivityIndicator, TouchableOpacity,Image, ImageBackground, FlatList, StatusBar } from 'react-native';
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
  // const { username, email, chama, savingAmount, interest, penalty, phonenumber} = route.params;
  const [transactions, setTransactions] = useState([]);
  const [chama, setChama] = useState("0");
  const [saving, setSaving] = useState(0);
  const [interest, setInterest] = useState(0);
  const [savingDate, setSavingDate] = useState("N/A");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [penalty, setPenalty] = useState(0);



  //  start get savings function
useEffect(() => {
  const getSavings = async () => {
    const email = await AsyncStorage.getItem('email');
    const name = await AsyncStorage.getItem('name');
    const chama = await AsyncStorage.getItem('chama');
    setName(name);
    setEmail(email);
    try {
      const url = `https://backend1-1cc6.onrender.com/getContributions/${chama}/${email}/`;
      const response = await axios.get(url);
      
      if(response.status === 200){
        setSaving(response.data.total_contributions);
        setInterest(response.data.interest);
        setPenalty(response.data.penalty);
        if(response.data.saving_date.length == 0){ setSavingDate("N/A"); }
        else{setSavingDate(response.data.saving_date[0].contribution_date);}
      }
    } 
    catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  
  const interval = setInterval(() => {
    getSavings();
  }, 5000); // 5 seconds

  // Clear interval when component unmounts
  return () => clearInterval(interval);

},[email]);
// end of get savings function

  // fetch transactions data
  useEffect(() => {
   
    const fetchTransactions = async() => {
       const email = await AsyncStorage.getItem('email');
       const chama_id = await AsyncStorage.getItem('chama');
      axios.get(`https://backend1-1cc6.onrender.com/transactions/Contribution/${email}/${chama_id}/`)
          .then((response) => {
            setTransactions(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });

    }
    const interval = setInterval(() => {
      fetchTransactions();
    }, 5000); // 5 seconds
  
    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);
  // end of fetch transactions

  // handle top up 
  const handleTopUp = () => {
   router.push("/contribution");
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
          <Text className="text-3xl font-bold text-gray-800 mb-0">Welcome back,{name}</Text>
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
          <Text className="text-2xl font-bold text-gray-800">KES. {saving}</Text>
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
          onPress={() => alert("Coming soon!")}
        >
          <FontAwesome6 name="money-bills" size={24} color="black" />
          <Text className="text-gray-900 font-medium mt-1">Withdraw</Text>
        </TouchableOpacity>
      </View>

      {/* saving part */}
      <View>
        <Text className='font-bold mt-5'>My savings</Text>
        <View className='bg-yellow-600'>
        <View className='p-2 mt-0 flex flex-row justify-around'>
          <View>
            <Text>Your savings</Text>
          </View>
          <View>
            <Text className='font-bold'>KES.{saving}</Text>
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
      <StatusBar
            barStyle="dark-content" // or "light-content" depending on your background
            backgroundColor="transparent"
            translucent={true}
          />
    </SafeAreaView>
  );
}