import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Loans() {
  const navigation = useNavigation();
  const router = useRouter();
  const route = useRoute();

  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [loan, setLoan] = useState(0);
  const [loanInterest, setLoanInterest] = useState(0);
  const [loanDate, setLoanDate] = useState("N/A");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(false);
  const [totalSTL, setTotalSTL] = useState(0);
  const [totalLTL, setTotalLTL] = useState(0);
  const [totalSTLRepayment, setTotalSTLRepayment] = useState(0);
  const [totalLTLRepayment, setTotalLTLRepayment] = useState(0);
  const [stlDate, setStlDate] = useState("N/A");
  const [ltlDate, setLtlDate] = useState("N/A");
  const [stlDueDate, setStlDueDate] = useState("N/A");
  const [ltlDueDate, setLtlDueDate] = useState("N/A");
  const [stlId, setStlId] = useState(0);
  const [ltlId, setLtlId] = useState(0);

  useEffect(() => {
    const getLoans = async () => {
      const email = await AsyncStorage.getItem('email');
      const name = await AsyncStorage.getItem('name');
      const chama = await AsyncStorage.getItem('chama_id');
      const member_id = await AsyncStorage.getItem('member_id');
      const selected_chama = await AsyncStorage.getItem('selected_chama');

      setName(name);
      setEmail(email);
      // setIsLoadingData(true);
      // setIsDisabled(true);
      // setIsDisabled2(true);

      try {
        const response = await axios.get(`https://backend1-1cc6.onrender.com/getLoans/${chama}/${email}/`);
        const response2 = await axios.get(`https://backend1-1cc6.onrender.com/getloanrepayment/${selected_chama}/${member_id}/`);

        if (response.status === 200 && response2.status === 200) {
          const total_stl_new = response.data.total_stl_loan;
          const total_ltl_new = response.data.total_ltl_loan;

          if (total_stl_new > 0 || total_ltl_new > 0 ) {setIsDisabled(true)} else{setIsDisabled(false)};
          // if (total_ltl_new > 0) {setIsDisabled2(true)} else(setIsDisabled2(false));

          setLoan(response.data.total_loan);
          setTotalSTL(total_stl_new);
          setTotalLTL(total_ltl_new);
          setTotalSTLRepayment(response.data.total_stl_repayment - response2.data.STL.repaid_amount);
          setTotalLTLRepayment(response.data.total_ltl_repayment -response2.data.LTL.repaid_amount );
          setStlDate(response.data.stl_loan_date[0]?.loan_date || "N/A");
          setLtlDate(response.data.ltl_loan_date[0]?.loan_date || "N/A");
          setStlDueDate(response.data.stl_loan_deadline[0]?.loan_deadline || "N/A");
          setLtlDueDate(response.data.ltl_loan_deadline[0]?.loan_deadline || "N/A");
          setStlId(response.data.stl_id);
          setLtlId(response.data.ltl_id);
        }
      } catch (error) {
        // console.error("Error fetching loan data:", error);
      } finally {
        // setIsLoadingData(false);
      }
    };

    getLoans();
    setInterval(() => {
      getLoans();
    }, 3000); // Refresh every 3 seconds
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      // setIsLoadingTransactions(true);
      const email = await AsyncStorage.getItem('email');
      const chama_id = await AsyncStorage.getItem('chama_id');

      axios.get(`https://backend1-1cc6.onrender.com/transactions/Loan/${email}/${chama_id}/`)
        .then((response) => setTransactions(response.data))
        .catch((error) => console.error("Error fetching transactions:", error))
        // .finally(() => setIsLoadingTransactions(false));
    };

    fetchTransactions();
    setInterval(() => {
      fetchTransactions();
    }, 3000); // Refresh every 3 seconds
  }, []);

  const handleTerms = async (loan_type) => {
    await AsyncStorage.setItem('loan_type', loan_type);
    router.push('terms');
  };

  const handlePayLoan = async (repayment_amount, loan_type, loan_id) => {
    if(repayment_amount == 0){
      alert("You have not taken any loan");
    }
    else{
      await AsyncStorage.setItem('repayment_amount', JSON.stringify(repayment_amount));
      await AsyncStorage.setItem('loan_type', loan_type);
      await AsyncStorage.setItem('loan_id', JSON.stringify(loan_id));
      router.push('payloan');
    }
    
  };

  const Activity = ({ transactionType, amount, transactionTime }) => (
    <View className="bg-yellow-100 p-4 rounded-xl mb-5">
      <Text className="text-lg font-bold text-gray-800 font-lato">{transactionType}</Text>
      <Text className="text-gray-700 font-lato">Amount: KES.{amount}</Text>
      <Text className="text-sm text-gray-600 font-lato">Date: {transactionTime}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white mb-20">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView className="p-4">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-800 font-lato">Welcome back, {name}</Text>
          <Text className="text-lg font-semibold text-gray-600 font-lato mt-1">Time to borrow money</Text>
        </View>

        {/* Loan Summary Card */}
        <ImageBackground
          source={require('../assets/images2/loan.png')}
          className="w-full h-48 rounded-xl overflow-hidden mb-6"
          style={{ resizeMode: 'cover' }}
        >
          <View className="p-6 bg-black/30 h-full justify-center">
            <Text className="text-white text-xl font-bold font-lato">Your Loans</Text>
            <Text className="text-white text-3xl font-bold font-lato">
              {isLoadingData ? 'Loading...' : `KES.${loan}`}
            </Text>
          </View>
        </ImageBackground>

       {[{
  title: "Short-Term Loan",
  total: totalSTL,
  interest: "10%",
  payable: totalSTLRepayment,
  date: stlDate,
  due: stlDueDate,
  loanType: "STL",
  status: isDisabled,
  id:stlId,
}, {
  title: "Long-Term Loan",
  total: totalLTL,
  interest: "1%",
  payable: totalLTLRepayment,
  date: ltlDate,
  due: ltlDueDate,
  loanType: "LTL",
  status: isDisabled,
  id: ltlId,
}].map((loanItem, index) => (
  <View key={index} className="bg-yellow-600 p-5 rounded-2xl mb-6 shadow-lg">
    <Text className="text-xl font-bold text-white mb-4 font-lato">{loanItem.title}</Text>
    
    <View className="space-y-3 mb-6">
      <View className="flex-row justify-between">
        <Text className="text-white font-lato">Outstanding Loan:</Text>
        <Text className="text-white font-bold font-lato">KES.{loanItem.total}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-white font-lato">Interest:</Text>
        <Text className="text-white font-bold font-lato">{loanItem.interest}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-white font-lato">Total Payable:</Text>
        <Text className="text-white font-bold font-lato">KES.{loanItem.payable}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-white font-lato">Date Taken:</Text>
        <Text className="text-white font-bold font-lato">{loanItem.date.split("T")[0]}</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-white font-lato">Due Date:</Text>
        <Text className="text-white font-bold font-lato">{loanItem.due.split("T")[0]}</Text>
      </View>
    </View>

    {/* Full-width buttons stacked vertically */}
    <View className="space-y-3">
      <TouchableOpacity
        className="bg-white py-3 w-full rounded-xl items-center mb-4"
        onPress={() => handleTerms(loanItem.loanType)}
        disabled={loanItem.status}
      >
        <FontAwesome6 name="plus" size={20} color="black" />
        <Text className="text-black font-medium mt-1 font-lato">Take Loan</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        className="bg-white py-3 w-full rounded-xl items-center"
        onPress={() => handlePayLoan(loanItem.payable, loanItem.loanType, loanItem.id)}
      >
        <FontAwesome6 name="money-bills" size={20} color="black" />
        <Text className="text-black font-medium mt-1 font-lato">Pay Loan</Text>
      </TouchableOpacity>
    </View>
  </View>
))}

        {/* Activity Section */}
        <View className="mt-4 mb-10">
          <Text className="text-xl font-bold mb-2 font-lato">My Activities</Text>
          {isLoadingTransactions ? (
            <ActivityIndicator size="large" color="#facc15" />
          ) : (
            <FlatList
              data={transactions}
              keyExtractor={(item) => item.transaction_id.toString()}
              renderItem={({ item }) => (
                <Activity
                  transactionType={item.transaction_type}
                  amount={item.amount}
                  transactionTime={item.transaction_date.split("T")[0]}
                />
              )}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
