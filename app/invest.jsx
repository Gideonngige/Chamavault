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
  const [isFetching, setIsFetching] = useState(false);
  const [isFetching1, setIsFetching1] = useState(false);
  const [isFetching2, setIsFetching2] = useState(false);
  const [memberInvestments, setMemberInvestments] = useState([]);
  const [memberProfits, setMemberProfits] = useState([]);
  

// fettch investment data
useEffect(() => {
  const fetchInvestments = async () => {
    setIsFetching(true);
    try {
      const chama_id = await AsyncStorage.getItem('chama_id');
      const name = await AsyncStorage.getItem('name');
      setUserName(name);
      
      const url = `https://backend1-1cc6.onrender.com/get_investments/${chama_id}/`;
      const response = await axios.get(url);
      
      if(response.status === 200){
        setInvestments(response.data);
        
      }
      
    } 
    catch (error) {
      console.error("Error:", error);
      return null;
    }
    finally{
      setIsFetching(false);
    }
  }
  fetchInvestments();

},[]);

// function to fetch member investmemnts
useEffect(() => {
  const fetchMemberInvestment = async() => {
    const member_id = await AsyncStorage.getItem('member_id');
    const chama_id = await AsyncStorage.getItem('chama_id');
    setIsFetching1(true);
    try{
      const url = `https://backend1-1cc6.onrender.com/member_investment_summary/${member_id}/${chama_id}/`;
      const response = await axios.get(url);
      if(response.status === 200){
        setMemberInvestments(response.data);
      }

    }
    catch(error){
      alert(error);
    }
    finally{
      setIsFetching1(false);

    }

  }
  fetchMemberInvestment();
},[]);
// end of function to fetch member investment

// function to fetch member investmemnts
useEffect(() => {
  const fetchMemberProfit = async() => {
    const member_id = await AsyncStorage.getItem('member_id');
    const chama_id = await AsyncStorage.getItem('chama_id');
    setIsFetching2(true);
    try{
      const url = `https://backend1-1cc6.onrender.com/individual_profits/${member_id}/${chama_id}/`;
      const response = await axios.get(url);
      if(response.status === 200){
        setMemberProfits(response.data);
      }

    }
    catch(error){
      alert(error);
    }
    finally{
      setIsFetching2(false);

    }

  }
  fetchMemberProfit();
},[]);
// end of function to fetch member investment



const InvestmentItem = ({ item }) => {
  const router = useRouter();
  return (
    <View className="bg-white p-4 mb-4 rounded-xl shadow-md">
      <View className="flex-row items-center mb-3">
        <Image source={{ uri: item.image }} className="w-16 h-16 mr-4 rounded-md" />
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800 font-lato">{item.investment_name}</Text>
          <Text className="text-sm text-gray-600 font-lato">{item.description}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mt-2 mb-2">
        <Text className="text-sm text-gray-700 font-lato">Minimum: <Text className="font-semibold font-lato">KES {item.min_amount}</Text></Text>
        <Text className="text-sm text-gray-700 font-lato">Duration: <Text className="font-semibold font-lato">{item.duration_months} months</Text></Text>
      </View>

      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-sm text-gray-700 font-lato">Interest rate: <Text className="font-semibold text-green-700 font-lato">{parseInt(item.interest_rate)} %</Text></Text>
      </View>

      <TouchableOpacity
        className="bg-yellow-600 py-2 px-4 rounded-xl flex-row items-center justify-center"
        onPress={() => router.push({ pathname: '/topupinvestment', params: { id: item.id, min_amount: item.min_amount } })}
      >
        <FontAwesome6 name="money-bill-trend-up" size={20} color="#fff" />
        <Text className="text-white font-bold ml-2 font-lato">Invest Now</Text>
      </TouchableOpacity>
    </View>
  );
};
// end of available invetsment

// member investments
const MemberInvestments = ({ item }) => {
  return(
    <View className="bg-yellow-600 w-[100%] h-36 rounded-xl mb-4 p-4 shadow-md">
      <Text className="text-white font-bold text-lg mb-1 font-lato">{ item.investment_name }</Text>
      <Text className="text-white font-lato">Invested</Text>
      <Text className="text-2xl font-extrabold text-white mt-2 font-lato">KES {item.total_invested}</Text>
    </View>
  );
}
// end of member investments

// funtion -interest
const Interest = ( { item }) => {
  return(
    <View className='flex-row justify-between items-center bg-yellow-100 px-4 py-3 rounded-xl'>
    <View>
      <Text className='text-md font-semibold text-gray-700 font-lato'>Interest Paid</Text>
      <Text className='text-sm text-gray-500 font-lato'>{item.end_at.split('T')[0]} {new Date(item.end_at).toLocaleTimeString()}</Text>
    </View>
    <Text className='text-md font-bold text-green-700 font-lato'>+KES {item.profit}</Text>
  </View>

  );
}
// end -- interest

const Alert = () => {
    return (
      <View className="flex flex-row items-center justify-center w-full bg-yellow-600 p-3 rounded-lg">
        <Text className="text-white font-bold font-lato">No profits yet</Text>
      </View>
    );
  };

  const AlertInvestment = () => {
    return (
      <View className="flex flex-row items-center justify-center w-full bg-yellow-600 p-3 rounded-lg">
        <Text className="text-white font-bold font-lato">You have not invested yet</Text>
      </View>
    );
  };

  const AlertAvailable = () => {
    return (
      <View className="flex flex-row items-center justify-center w-full bg-yellow-600 p-3 rounded-lg">
        <Text className="text-white font-bold font-lato">No investments currently available</Text>
      </View>
    );
  };


  return (
    <SafeAreaView className="flex-1 bg-white mb-20">
      <ScrollView className="p-4">
        <View className="flex-row justify-between items-start mb-6 ">
        <View className="w-full p-4 bg-white">
          {/* welcome part */}
          <Text className="text-3xl font-bold text-gray-800 mb-0 font-lato">Welcome back, {userName}</Text>
          <Text className='text-lg font-bold text-gray-800 mt-0 font-lato'>Time to invest your money</Text>
          <View className="p-0">
    {/* investment part */}
    <View className="w-full mt-4 mb-6">
  <Text className="text-xl font-bold text-gray-800 mb-3 font-lato">💰 Your Investments Breakdown</Text>


  <View className="flex-row flex-wrap justify-between">
    { isFetching1 ? <Text className='font-serif font-lato'>Fetching your investments...</Text> :
    (memberInvestments.length === 0 ? (<AlertInvestment/>) : (
      <FlatList
        data={memberInvestments}
        keyExtractor={(item) => item.investment_id.toString()}
        renderItem={({ item }) => <MemberInvestments item={item} />}
        showsVerticalScrollIndicator={false}
      />
    )

    )
      

      }
  </View>
</View>

    {/* end of investment part */}
      {/* available investments */}
      <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4 font-lato">📈 Available Investments</Text>
      
      { isFetching ? <Text className='font-serif font-lato'>Fetching investments...</Text> :
      (investments.length === 0 ? (<AlertAvailable/>) : 
      (
        <FlatList
        data={investments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <InvestmentItem item={item} />}
        showsVerticalScrollIndicator={false}
      />

      )
    )
      

      }
      
    </View>
      {/* end of available investments */}

       {/* activity part */}
       <View className="flex-row justify-between bg-white p-3 rounded-lg">
       <Text className='font-bold font-lato'>Activity</Text>
       <Text className='font-bold'><TouchableOpacity onPress={() => router.push('activity/')}><Text className='font-lato'>View All</Text></TouchableOpacity></Text>

       </View>
      <View className='w-full px-4 py-6 m-2 bg-white rounded-2xl shadow-md'>
  <Text className='text-lg font-bold text-gray-800 mb-4 font-lato'>📊 Recent Interest Payments</Text>
  
  { isFetching2 ? <Text className='font-lato'>Loading your profits...</Text> :
  (memberProfits.length === 0 ? (<Alert/>) :(
    <FlatList
        data={memberProfits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Interest item={item} />}
        showsVerticalScrollIndicator={false}
      />
  )
)

  }

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