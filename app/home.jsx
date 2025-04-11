import { View, Text, TextInput, Image, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import "../global.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import NavBar from './NavBar';
import BottomTabs from './BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
const InfoCard = ({ title, kes, interest, date, dateLabel }) => (
  <View className="bg-yellow-600 p-4 rounded-lg mb-4">
    <Text className="text-lg font-bold mb-2">{title}</Text>
    <View className="flex-row justify-between mb-1">
      <Text className="text-gray-950">Amount</Text>
      <Text className="text-gray-950">{kes}</Text>
    </View>
    <View className="flex-row justify-between mb-1">
      <Text className="text-gray-950">Interest</Text>
      <Text className="text-gray-950">{interest}%</Text>
    </View>
    <View className="flex-row justify-between">
      <Text className="text-gray-950">{dateLabel}</Text>
      <Text className="text-gray-950">{date}</Text>
    </View>
  </View>
);

export default function App() {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [numberOfChama, setnumberOfChama] = useState(0);
  const [chama, setChama] = useState("0");
  const [saving, setSaving] = useState(0);
  const [interest, setInterest] = useState(0);
  const [loan, setLoan] = useState(0);
  const [loanInterest, setLoanInterest] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [name, setName]  = useState("");
  const [phonenumber, setPhonenumber] = useState("0797655727");
  const [email, setEmail] =  useState("");
  const [savingDate, setSavingDate] = useState("N/A");
  const [loanDate, setLoanDate] = useState("N/A");
  const [chamaName, setChamaName] = useState("Chama Name");
  const route = useRoute();
  const router = useRouter();

   // fetch member chamas
   useEffect(() => {
    const fetchMemberChamas = async () => {
      try{
        const email = await AsyncStorage.getItem('email');
        const url = `https://backend1-1cc6.onrender.com/getChama/${email}`;
        const response = await axios.get(url);
        if(response.status === 200){
          const formattedItems = response.data.chamas.map(chama => ({
            label: chama,  // Display Name
            value: chama   // Value to store
          }));
          setItems(formattedItems);
        }
        

      }
      catch(error){
        console.error("Error fetching chamas:", error);
      }

    }
    fetchMemberChamas();
  },[]);
  // end of fetch member chamas

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const selected_chama = await AsyncStorage.getItem('selected_chama');
        setChamaName(selected_chama);
        
        const url = `https://backend1-1cc6.onrender.com/getMember/${email}/${selected_chama}/`;
        const response = await axios.get(url);
        await AsyncStorage.setItem('email',email);
        
        if(response.status === 200){
          Toast.show({
            type: "success", // Can be "success", "error", "info"
            text1: "Successfully Login",
            text2: "You have successfully logged in",
          });
          setName(response.data.name);
          // setItems([response.data.chama]);
          setnumberOfChama(items.length);
          setPhonenumber(response.data.phone_number);
          setChama(response.data.chama)
          setEmail(email);
          await AsyncStorage.setItem('name', response.data.name);
          await AsyncStorage.setItem('phonenumber', response.data.phone_number);
          await AsyncStorage.setItem('chama', JSON.stringify(response.data.chama));
          await AsyncStorage.setItem('member_id', JSON.stringify(response.data.member_id));
          
        }
        
      } 
      catch (error) {
        console.error("Error:", error);
        return null;
      }
    }
    fetchData();

  },[email]);

//  start get savings function
useEffect(() => {
  const getSavings = async () => {
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


//  start get savings function
useEffect(() => {
  const getLoans = async () => {
    const member_id = await AsyncStorage.getItem('member_id');
    const selected_chama = await AsyncStorage.getItem('selected_chama');
    try {
      const url = `https://backend1-1cc6.onrender.com/getLoans/${chama}/${email}/`;
      
      const response = await axios.get(url);
      const url2 = `https://backend1-1cc6.onrender.com/getloanrepayment/${selected_chama}/${member_id}/`;
      const response2 = await axios.get(url2);
      
      if(response.status === 200 && response2.status === 200){
        const loan = response.data.total_loan - response2.data.total_repayment;
        // alert(response.data.total_loan)
        setLoan(loan);
        setLoanInterest(response.data.interest);
        if(response.data.loan_date.length == 0){ setLoanDate("N/A"); }
        else{setLoanDate(response.data.loan_date[0].loan_date);}
        
      }
    } 
    catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  const interval = setInterval(() => {
    getLoans();
  }, 5000); // 5 seconds

  // Clear interval when component unmounts
  return () => clearInterval(interval);

},[email]);
// end of get savings function

//go to saviings
const goToSavings = () =>{
  navigation.navigate('saving', {
    username: name,
    email: email,
    savingAmount: saving,
    interest: interest,
    penalty: penalty,
    chama: chama,
    phonenumber: phonenumber,
  });
}
//end of goto savings

//go to loans
const goToLoans = () =>{
  navigation.navigate('loan', {
    username: name,
    email: email,
    loan: String(loan),
    loanInterest: interest,
    chama: chama,
    phonenumber: phonenumber,
  });
}
//end of goto loans

// got to invest 
const handleProfile = () =>{
  navigation.navigate('profile', {
    
  });
}
// end of go to invest

  return (
    
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView nestedScrollEnabled={true} className="p-4 mb-20">
    <View className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="items-center mb-8">
      <Image 
        source={require('../assets/images2/profile3.png')}
        style={{width: 150, height: 150, borderRadius: 75, borderWidth: 3,borderColor: '#fff',resizeMode: 'cover',
        }}
      />
        <Text className="text-lg font-bold text-gray-800 mb-1">{name}</Text>
        <Text className="text-gray-800">{email}</Text>
        <TouchableOpacity className="bg-yellow-600 rounded-lg w-full h-10 flex items-center justify-center" onPress={handleProfile}>
        <Text className="text-white font-bold">Update Profile</Text>
        </TouchableOpacity>


        <Toast/>
      </View>
      <Text className="text-lg align-middle font-bold">{chamaName}</Text>
      {/* Main Content */}
      <View className="space-y-4">
        <TouchableOpacity
        onPress={goToSavings}
        >
        <InfoCard
          title="Savings"
          kes={saving}
          interest={interest}
          date={savingDate.split("T")[0]}
          dateLabel="Last saving"
        />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={goToLoans}
        >
        <InfoCard
          title="Loans"
          kes={loan}
          interest={loanInterest}
          date={loanDate.split("T")[0]}
          dateLabel="Last loan"
        />
        </TouchableOpacity>
      </View>
      {/* Chamas Section */}
      <View className="items-center mb-2">
        <TouchableOpacity className='bg-yellow-600 w-full h-10 flex-row justify-between items-center px-4 rounded-lg' onPress={() => router.push("chama/")}>
        <Text className='font-bold'>Go To {chamaName} Profile</Text>
        <Ionicons name="chevron-forward" size={24} color="black" />
        </TouchableOpacity>

  <View className="w-full bg-yellow-600 p-4 rounded-lg mt-5 flex flex-row justify-between">
  {/* Create Chama Button */}
  <TouchableOpacity 
    className="bg-yellow-600 py-3 rounded-lg items-center w-1/3"
    onPress={() => router.push('createchama/')}
  >
    <Ionicons name="create" size={24} color="black" />
    <Text className="text-white font-medium">Create Chama</Text>
  </TouchableOpacity>

  {/* Join Chama Button */}
  <TouchableOpacity 
    className="bg-yellow-600 py-3 rounded-lg items-center w-1/3"
    onPress={() => router.push('joinchama/')}
  >
    <Ionicons name="enter" size={24} color="black" />
    <Text className="text-white font-medium">Join Chama</Text>
  </TouchableOpacity>

  {/* Invite Button */}
  <TouchableOpacity 
    className="bg-yellow-600 py-3 rounded-lg items-center w-1/3"
    onPress={() => router.push('invitation/')}
  >
    <Entypo name="add-user" size={24} color="black" />
    <Text className="text-white font-medium">Invite</Text>
  </TouchableOpacity>
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