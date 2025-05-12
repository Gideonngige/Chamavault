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
import BottomTabs from './BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-reanimated-carousel';
import * as Location from 'expo-location';
const InfoCard = ({ title}) => (
  <View className="bg-yellow-600 p-4 rounded-lg mb-4">
    <View className="flex-row justify-between mb-1">
    <Text className="text-lg mb-2 text-white font-serif">{title}</Text>
    <Ionicons name="chevron-forward" size={24} color="black" />
    </View>
    <View className="flex-row justify-between mb-1">
      <Text className="text-gray-950 font-serif">Interest rate p.a</Text>
      <Text className="text-gray-950 font-serif">10%-30%</Text>
    </View>
  </View>
);

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.8;

const data = [
  { title: 'Welcome to chamavault', image: require('../assets/images2/payment.png') },
  { title: 'Save your money to earn interest', image: require('../assets/images2/invest.png') },
  { title: 'Borrow money to grow', image: require('../assets/images2/loan.png') },
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

  // start of get location function
  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }
  
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
  
        console.log(latitude, longitude);
        // alert(latitude + " " + longitude); // Show latitude and longitude
  
        const member_id = await AsyncStorage.getItem('member_id');
        const name = await AsyncStorage.getItem('name');
  
        const url = "https://backend1-1cc6.onrender.com/update_location/";
        const data = {
          member_id,
          name,
          latitude,
          longitude,
        };
  
        const response = await axios.post(url, data, {
          headers: { "Content-Type": "application/json" },
        });
  
        console.log('Location posted successfully:', response.data);
      } catch (error) {
        console.error('Error fetching location or data:', error);
      }
    };
  
    getLocation();
  }, []);
  // end of get location function

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
        const profile_image = await AsyncStorage.getItem('profile_image');
        const selected_chama = await AsyncStorage.getItem('selected_chama');
        setChamaName(selected_chama);
        setProfileImg(profile_image);
        
        const url = `https://backend1-1cc6.onrender.com/getMember/${email}/${selected_chama}/`;
        const response = await axios.get(url);
        const url2 = `https://backend1-1cc6.onrender.com/send_reminder_message/2/`;
        const response2 = await axios.get(url2);
        await AsyncStorage.setItem('email',email);
        
        if(response.status === 200 && response2.status === 200){
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
          // await AsyncStorage.setItem('member_id', JSON.stringify(response.data.member_id));
          
          
        }
        
      } 
      catch (error) {
        console.error("Error:", error);
        return null;
      }
    }
    fetchData();

  },[email]);


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

const handleTerms = () => {
  router.push('terms/');
}


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
      <Text className="text-xl font-bold text-white font-serif">{name}</Text>
      <Text className="text-white mt-1 font-serif">{email}</Text>
    </View>
  </TouchableOpacity>

  <Toast />
</View>
      <Text className="text-lg align-middle font-bold text-yellow-600">{chamaName}</Text>

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
      <View className="space-y-4">
        <TouchableOpacity
        onPress={goToSavings}
        >
        <InfoCard
          title="Savings"
          interest={interest}
        />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={goToLoans}
        >
        <InfoCard
          title="Loans"
          interest={loanInterest}
        />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => router.push('invest/')}
        >
        <InfoCard
          title="Investments"
          interest={loanInterest}
        />
        </TouchableOpacity>
      </View>
      {/* Chamas Section */}
      <View className="items-center mt-4 mb-2">
        <TouchableOpacity className='bg-yellow-600 w-full h-10 flex-row justify-between items-center px-4 rounded-lg' onPress={() => router.push("chama/")}>
        <Text className='font-serif text-white'>Go To {chamaName} Profile</Text>
        <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>

  <View className="w-full p-0 rounded-lg mt-4 flex flex-row justify-between">
  {/* Create Chama Button */}
  <TouchableOpacity 
    className=" py-3 rounded-lg items-center w-1/3"
    onPress={() => router.push('createchama/')}
  >
    <View className='bg-yellow-600 rounded-full p-4'>
    <Ionicons name="create" size={50} color="white" />
    </View>
    <Text className="text-gray-900 font-medium font-serif mt-3">Create Chama</Text>
  </TouchableOpacity>

  {/* Join Chama Button */}
  <TouchableOpacity 
    className="py-3 rounded-lg items-center w-1/3"
    onPress={() => router.push('joinchama/')}
  >
    <View className='bg-yellow-600 rounded-full p-4'>
      <Ionicons name="enter" size={50} color="white" />
    </View>
    <Text className="text-gray-900 font-medium font-serif mt-3">Join Chama</Text>
  </TouchableOpacity>

  {/* Invite Button */}
  <TouchableOpacity 
    className="py-3 rounded-lg items-center w-1/3"
    onPress={() => router.push('invitation/')}
  >
    <View className='bg-yellow-600 rounded-full p-4'>
    <Entypo name="add-user" size={50} color="white" />
    </View>
    <Text className="text-gray-900 font-medium font-serif mt-3">Invite</Text>
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