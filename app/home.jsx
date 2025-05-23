import { View, Text, TextInput, Image, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, Dimensions, StyleSheet } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-reanimated-carousel';
import * as Location from 'expo-location';
const InfoCard = ({ title, icon, onPress }) => (
  <TouchableOpacity 
    onPress={onPress} 
    style={{
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{title}</Text>
      <Text style={{ fontSize: 14, color: '#777' }}>Interest rate: 1-10%</Text>
    </View>
    <Ionicons name={icon} size={24} color="#fbbf24" />
  </TouchableOpacity>
);

const InfoCard2 = ({ title, icon, onPress }) => (
  <TouchableOpacity 
    onPress={onPress} 
    style={{
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{title}</Text>
      <Text style={{ fontSize: 14, color: '#777' }}>Cover your risks</Text>
    </View>
    <Ionicons name={icon} size={24} color="#fbbf24" />
  </TouchableOpacity>
);

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.8;

const data = [
  { title: 'Welcome to chamavault', image: require('../assets/images2/payment.png') },
  { title: 'Invest Smartly', image: require('../assets/images2/invest.png') },
  { title: 'Borrow Easily', image: require('../assets/images2/loan.png') },
];

export default function Home() {
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
  const [chamaName, setChamaName] = useState("Chama Name");
  const [profileImg, setProfileImg] = useState("");
  const route = useRoute();
  const router = useRouter();




  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const profile_image = await AsyncStorage.getItem('profile_image');
        const selected_chama = await AsyncStorage.getItem('selected_chama');
        const chama_id = await AsyncStorage.getItem('chama_id');
        const name = await AsyncStorage.getItem('name');
        setChamaName(selected_chama);
        setProfileImg(profile_image);
        setName(name);
        setEmail(email);
        
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
          
          
        }
        
      } 
      catch (error) {
        console.error("Error:", error);
        return null;
      }
    }
    fetchData();

  },[email]);



// got to invest 
const handleProfile = () =>{
  navigation.navigate('profile', {
    
  });
}
// end of go to invest

// function to go to saving
const goToSavings =()=>{
  if(chamaName == "No Chama"){
    alert("You must join a chama first");
  }
  else{
    router.push('/saving')

  }
}
// end

// function to go to loans
const goToLoans =()=>{
  if(chamaName == "No Chama"){
    alert("You must join a chama first");
  }
  else{
    router.push('/loan')

  }
}
// end

// function to go to investment
const goToInsurance =()=>{
  if(chamaName == "No Chama"){
    alert("You must join a chama first");
  }
  else{
    router.push('/insurance')

  }
}
// end
// function to go to chama
const goToChama =()=>{
  if(chamaName == "No Chama"){
    alert("You must join a chama first");
  }
  else{
    router.push('/chama')

  }
}
// end


const renderItem = ({ item }) => (
  <View style={[styles.itemContainer, { width: ITEM_WIDTH }]}>
    <Image source={item.image} style={styles.image} />
    <Text style={styles.title}>{item.title}</Text>
  </View>
);
  return (
    
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView nestedScrollEnabled={true} className="p-4 mb-20">
    <View className="flex-1 bg-white p-4">
      {/* Header */}
    <View className="mb-2 w-full">
  <TouchableOpacity
    className="bg-yellow-600 p-2 rounded-lg flex-row items-center mb-2"
    onPress={handleProfile}
  >
    <Image 
      source={{ uri: profileImg }}
      style={{
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
        resizeMode: 'cover',
      }}
    />
    <View className="ml-2">
      <Text className="text-xl font-bold text-white font-lato">{name}</Text>
      <Text className="text-white mt-1 font-lato">{email}</Text>
    </View>
  </TouchableOpacity>

  <Toast />
</View>
      <Text className="text-lg align-middle font-bold text-yellow-600 font-lato">{chamaName}</Text>

      <Carousel
        data={data}
        renderItem={renderItem}
        width={SLIDER_WIDTH}
        height={250}  // Adjust height as needed
        loop={true}
        autoPlay={true}
        autoPlayInterval={3000}
      />

      {/* Main Content */}
      
      {/* Info Cards */}
      <View className="mt-6">
        <Text className="text-lg font-semibold text-gray-800 mb-2 font-lato">Quick Actions</Text>
        <InfoCard title="Savings" icon="wallet" onPress={goToSavings} />
        <InfoCard title="Loans" icon="cash" onPress={goToLoans} />
        <InfoCard2 title="Insurance" icon="life-buoy" onPress={goToInsurance} />
      </View>
    {/* end of info cards */}

      {/* Chamas Section */}
      <View className="items-center mt-4 mb-2">
        <TouchableOpacity className='bg-yellow-600 w-full h-10 flex-row justify-between items-center px-4 rounded-lg shadow-md' onPress={goToChama}>
        <Text className='font-lato text-white'>Go To {chamaName} Profile</Text>
        <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>

  <View className="w-full mt-6 px-2">
  <View className="flex-row justify-between items-center space-x-2 mb-6">
    
    {/* Create Chama */}
    <TouchableOpacity 
      className="flex-1 bg-white rounded-2xl items-center py-4 shadow-md"
      onPress={() => router.push('createchama/')}
    >
      <View className="bg-yellow-600 p-4 rounded-full shadow-sm">
        <Ionicons name="create" size={32} color="white" />
      </View>
      <Text className="mt-3 text-sm font-semibold text-gray-800 font-lato">Create Chama</Text>
    </TouchableOpacity>

    {/* Join Chama */}
    <TouchableOpacity 
      className="flex-1 bg-white rounded-2xl items-center py-4 shadow-md"
      onPress={() => router.push('joinchama/')}
    >
      <View className="bg-yellow-600 p-4 rounded-full shadow-sm">
        <Ionicons name="enter" size={32} color="white" />
      </View>
      <Text className="mt-3 text-sm font-semibold text-gray-800 font-lato">Join Chama</Text>
    </TouchableOpacity>

    {/* Invite */}
    <TouchableOpacity 
      className="flex-1 bg-white rounded-2xl items-center py-4 shadow-md"
      onPress={() => router.push('invitation/')}
    >
      <View className="bg-yellow-600 p-4 rounded-full shadow-sm">
        <Entypo name="add-user" size={32} color="white" />
      </View>
      <Text className="mt-3 text-sm font-semibold text-gray-800 font-lato">Invite</Text>
    </TouchableOpacity>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
});