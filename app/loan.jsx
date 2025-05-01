import { SafeAreaView, ScrollView, Text, View,FlatList, ActivityIndicator, TouchableOpacity,Image, ImageBackground, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { useRoute } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from './NavBar';

export default function Loans() {
  const navigation = useNavigation();
  const router = useRouter();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  // const { username, email, loan, loanInterest} = route.params;
  const [transactions, setTransactions] = useState([]);
  const [loan, setLoan] = useState(0);
  const [loanInterest, setLoanInterest] = useState(0);
  const [loanDate, setLoanDate] = useState("N/A");
  const [email, setEmail] =  useState("");
  const [name, setName]  = useState("");
  const [isDisabled, setIsDisabled] = useState(false);// Initialize isDisabled to false
  const [totalSTL, setTotalSTL] = useState(0);
  const [totalLTL, setTotalLTL] = useState(0);
  const [totalSTLRepayment, setTotalSTLRepayment] = useState(0);
  const [totalLTLRepayment, setTotalLTLRepayment] = useState(0);
  const [stlDate, setStlDate] = useState("N/A");
  const [ltlDate, setLtlDate] = useState("N/A");
  const [stlDueDate, setStlDueDate] = useState("N/A");
  const [ltlDueDate, setLtlDueDate] = useState("N/A");



  //  start get loans function
useEffect(() => {
  const getLoans = async () => {
    const email = await AsyncStorage.getItem('email');
    const name = await AsyncStorage.getItem('name');
    const chama = await AsyncStorage.getItem('chama');
    setName(name);
    const member_id = await AsyncStorage.getItem('member_id');
    const selected_chama = await AsyncStorage.getItem('selected_chama');
    
    
    try {
      const url = `https://backend1-1cc6.onrender.com/getLoans/${chama}/${email}/`;
      const response = await axios.get(url);

      const url2 = `https://backend1-1cc6.onrender.com/getloanrepayment/${selected_chama}/${member_id}/`;
      const response2 = await axios.get(url2);
      
      if(response.status === 200 && response2.status === 200){
        const total_stl_new = response.data.total_stl_loan - response2.data.total_stl_repayment;
        // alert("Alert" + total_stl_new);
        const total_ltl_new = response.data.total_ltl_loan - response2.data.total_ltl_repayment;
        if(total_stl_new > 0){
          setIsDisabled(true); // Disable the button if loan_new is greater than 0
        }
        setLoan(response.data.total_loan);
        setLoanInterest(response.data.interest);
        setTotalSTL(total_stl_new);
        setTotalLTL(total_ltl_new );
        setTotalSTLRepayment(response.data.total_stl_repayment);
        setTotalLTLRepayment(response.data.total_ltl_repayment);
        setStlDate(response.data.stl_loan_date[0].loan_date);
        setLtlDate(response.data.ltl_loan_date[0].loan_date);
        setStlDueDate(response.data.stl_loan_deadline[0].loan_deadline);
        setLtlDueDate(response.data.ltl_loan_deadline[0].loan_deadline);
        
      }
    } 
    catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  getLoans();
  const interval = setInterval(() => {
    getLoans();
  }, 5000); // 5 seconds

  // Clear interval when component unmounts
  return () => clearInterval(interval);

},[email]);
// end of get loans function


    // fetch loan transactions data
    useEffect(() => {
      setIsLoading(true); 
      const fetchTransactions = async() => {
        const email = await AsyncStorage.getItem('email');
        const chama_id = await AsyncStorage.getItem('chama');
        // await AsyncStorage.setItem('loan', loan.toString());
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
      }, 8000); // 5 seconds
    
      // Clear interval when component unmounts
      return () => clearInterval(interval);
    }, []);
    // end of fetch loan transactions

  const handleApplyLoan =()=>{
    navigation.navigate('applyloan', {
      email:email,
    });
  }


  const handleTerms = async(loan_type) => {
    await AsyncStorage.setItem('loan_type', loan_type);
    router.push('terms');
  }

  const handlePayLoan = async(repayment_amount, loan_type) => {
    await AsyncStorage.setItem('repayment_amount', JSON.stringify(repayment_amount));
    await AsyncStorage.setItem('loan_type', loan_type);
    router.push('payloan');
  }

   // start of activity
   const Activity = ({transactionType, chama, amount, transactionTime}) => {
    return(
      <View className='bg-yellow-600 p-2 mt-0 mb-2 flex flex-row justify-around'>
          <View>
            <Text className='font-serif'>{transactionType}</Text>
            <Text className='font-serif'>Chama{chama}</Text>
          </View>
          <View>
            <Text className='font-bold font-serif'>KES.{amount}</Text>
            <Text className='font-bold font-serif'>{transactionTime}</Text>
          </View>
        </View>
    );
  }
  // end of activity

   if (isLoading2) {
            return <ActivityIndicator size="large" color="#FFA500" />;
    }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4 mb-20" nestedScrollEnabled={true}>
        <View className="flex-row justify-between items-start mb-6 ">
        <View className="w-full p-4 bg-white">
          {/* welcome part */}
          <Text className="text-3xl font-bold text-gray-800 mb-0 font-serif">Welcome back,{name}</Text>
          <Text className='text-lg font-bold text-gray-800 mt-0 font-serif'>Time to borrow money</Text>
          <View className="p-4">
            {/* loan image part */}
      <ImageBackground
        source={require('../assets/images2/loan.png')}
        className="w-full h-48 rounded-lg overflow-hidden justify-center"
        style={{ resizeMode: 'contain', width: '100%', height: 200 }}
      >
        <View className="p-5">
          <Text className="text-xl font-bold text-gray-900 font-serif">Your Loans</Text>
          <Text className="text-2xl font-bold text-gray-800 font-serif">KES. {loan}</Text>
        </View>
      </ImageBackground>

<View className="space-y-6 mt-5">

  {/* Short-Term Loan Section */}
  <View className="bg-yellow-600 p-4 mb-5 rounded-sm">
    <Text className="text-xl font-bold text-white mb-2 font-serif">Short-Term Loan</Text>
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-white font-serif">Outstanding Loan</Text>
      <Text className="text-white font-bold font-serif">KES. {totalSTL}</Text>
    </View>
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-white font-serif">Interest</Text>
      <Text className="text-white font-bold font-serif">30%</Text>
    </View>
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-white font-serif">Total Payable</Text>
      <Text className="text-white font-bold font-serif">KES.{totalSTLRepayment}</Text>
    </View>
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-white font-serif">Date taken</Text>
      <Text className="text-white font-bold font-serif">{stlDate.split("T")[0]}</Text>
    </View>
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-white font-serif">Due date</Text>
      <Text className="text-white font-bold font-serif">{stlDueDate.split("T")[0]}</Text>
    </View>

    <View className="flex-row justify-around">
      <TouchableOpacity
        className="bg-white py-3 px-5 rounded-xl items-center"
        onPress={()=>handleTerms("STL")}
        disabled={isDisabled}
      >
        <FontAwesome6 name="plus" size={24} color="black" />
        <Text className="text-gray-900 font-medium mt-1 font-serif">Take Loan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white py-3 px-5 rounded-xl items-center"
        onPress={() => handlePayLoan(totalSTLRepayment,"STL")}
      >
        <FontAwesome6 name="money-bills" size={24} color="black" />
        <Text className="text-gray-900 font-medium mt-1 font-serif">Pay Loan</Text>
      </TouchableOpacity>
    </View>
  </View>

  {/* Long-Term Loan Section */}
  <View className="bg-yellow-600 p-4 rounded-sm">
    <Text className="text-xl font-bold text-white mb-2 font-serif">Long-Term Loan</Text>
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-white font-serif">Outstanding Loan</Text>
      <Text className="text-white font-bold font-serif">KES. {totalLTL}</Text>
    </View>
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-white font-serif">Interest</Text>
      <Text className="text-white font-bold font-serif">10%</Text>
    </View>
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-white font-serif">Total Payable</Text>
      <Text className="text-white font-bold font-serif">KES.{totalLTLRepayment}</Text>
    </View>
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-white font-serif">Date taken</Text>
      <Text className="text-white font-bold font-serif">{ltlDate.split("T")[0]}</Text>
    </View>
    <View className="flex-row justify-between items-center mb-4">
      <Text className="text-white font-serif">Due date</Text>
      <Text className="text-white font-bold font-serif">{ltlDueDate.split("T")[0]}</Text>
    </View>

    <View className="flex-row justify-around">
      <TouchableOpacity
        className="bg-white py-3 px-5 rounded-xl items-center"
        onPress={()=>handleTerms("LTL")}
        disabled={isDisabled} // Disable the button
      >
        <FontAwesome6 name="plus" size={24} color="black" />
        <Text className="text-gray-900 font-medium mt-1 font-serif">Take Loan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white py-3 px-5 rounded-xl items-center"
        onPress={() => handlePayLoan(totalLTLRepayment,"LTL")}
      >
        <FontAwesome6 name="money-bills" size={24} color="black" />
        <Text className="text-gray-900 font-medium mt-1 font-serif">Pay Loan</Text>
      </TouchableOpacity>
    </View>
  </View>

</View>
      <View>

        {/* your activity part  */}
        <Text className='ml-1 font-bold mt-5 font-serif'>My activities</Text>

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
      <NavBar/>
      <StatusBar
            barStyle="dark-content" // or "light-content" depending on your background
            backgroundColor="transparent"
            translucent={true}
          />
    </SafeAreaView>
  );
}