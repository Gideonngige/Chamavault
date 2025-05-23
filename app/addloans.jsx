import { useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput, StatusBar, SafeAreaView, ScrollView, Animated, StyleSheet} from 'react-native';
import { useRouter } from "expo-router";
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from "react-native-toast-message";
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddLoans(){
  const route = useRoute();
  const router = useRouter();
  const {email} = route.params;
    const [loanAmount, setLoanAmount] = useState("");
    const [repaymentPeriod, setRepaymentPeriod] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const bounceValue = useRef(new Animated.Value(0)).current;
    const [loanType, setLoanType] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
         { label: 'Short Term Loan', value: 'STL' },
         { label: 'Long Term Loan', value: 'LTL' },
        
      ]);

    const startBounce = () => {
      bounceValue.setValue(0); // reset
      Animated.spring(bounceValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };
  
    useEffect(() => {
      startBounce(); // initial bounce
  
      const interval = setInterval(() => {
        startBounce(); // repeat bounce every 3 seconds
      }, 3000);
  
      return () => clearInterval(interval); // cleanup
    }, []);


    const handleApplyLoan = async() => {
      const loan_type = value;
      if(loanAmount === ""){
        Toast.show({
            type: "error",
            text1: "Empty field",
            text2: "Please fill all fields",
            position:"center",
            });
        return;
      }
      else{
        setIsLoading(true);
        try{
          const chama = JSON.parse(await AsyncStorage.getItem('chama_id'));
          const member_id = await AsyncStorage.getItem('member_id');
          const member_id2 = parseInt(member_id)
          alert(member_id2);
          const url = `https://backend1-1cc6.onrender.com/loans/${member_id2}/${chama}/${loanAmount}/${loan_type}`;
          const response = await axios.get(url);
          if(response.data.status === 200) {
            Toast.show({
                type: "success",
                text1: "Loan application successful",
                text2: response.data.message,
                position:"center",
                });
                setLoanAmount("");
          }
          else{
            Toast.show({
              type: "info",
              text1: "Loan application  failed",
              text2: response.data.message,
              position:"center",
              });
          }

        }
        catch(error){
          Toast.show({
            type: "error",
            text1: "Error occurred",
            text2: error.message,
            position:"center",
            });
        }
        finally{
          setIsLoading(false);
        }

      }
    }
    
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
        <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images2/applyloan.png')}
        style={[
          styles.image,
          {
            transform: [{ scale: bounceValue }],
          },
        ]}
      />
    </View>
      
  <View style={{ zIndex: 3000 }}>
  <Text className="text-lg font-bold mt-4 font-lato">Select type of loan</Text>
  <DropDownPicker
    open={open}
    value={value}
    items={items}
    setOpen={setOpen}
    setValue={setValue}
    setItems={setItems}
    placeholder="Select member"
    style={{
      borderColor: '#ca8a04',
      borderWidth: 1,
      borderRadius: 5,
      height: 50,
      fontFamily: 'sans-serif',
      marginBottom:15,
    }}
    listMode="SCROLLVIEW"
    dropDownContainerStyle={{ zIndex: 3000 }}
  />
</View>
      <Text className="w-full mt-4 text-lg font-bold font-lato">Enter loan amount(ksh)</Text>
      <TextInput 
      placeholder="Enter loan amount"
      value={loanAmount}
      onChangeText={setLoanAmount}
      keyboardType="numeric"
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg font-lato"
      />

      <TouchableOpacity className="w-full bg-green-600 p-4 rounded-lg" onPress={handleApplyLoan}>
      {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg font-lato">Apply Loan</Text> }      
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
     <Text className='font-lato text-lg'>Read our terms & conditions </Text>
     <TouchableOpacity className='mb-40' onPress={() => router.push("/terms")}>
     <Text style={{ color: '#eab308', textDecorationLine: 'underline' }} className='font-lato text-lg'>here</Text>
    </TouchableOpacity>
    </View>

    <Toast/>
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
});