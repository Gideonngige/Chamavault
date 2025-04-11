import { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { useRouter } from "expo-router";
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from "react-native-toast-message";
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ApplyLoan(){
  const route = useRoute();
  const {email} = route.params;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [items, setItems] = useState([
      { label: 'Long Term Loan', value: 'LTL' },
      { label: 'Short Term Loan', value: 'STL' },
    ]);
    const [loanAmount, setLoanAmount] = useState("");
    const [repaymentPeriod, setRepaymentPeriod] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const handleRepaymentPeriod = ()=>{
        if(loanAmount > 0 && loanAmount <= 1000){
          setRepaymentPeriod(3);
        }
        else if(loanAmount > 1000 && loanAmount <= 10000){
          setRepaymentPeriod(6);
        }
        else if(loanAmount > 10000 && loanAmount <= 30000){
          setRepaymentPeriod(9);
        }
      }
      handleRepaymentPeriod();
    }, [loanAmount]);


    const handleApplyLoan = async() => {
      if(value === "" || loanAmount === "" || repaymentPeriod === 0){
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
          const chama = JSON.parse(await AsyncStorage.getItem('chama'));
          const period = repaymentPeriod * 30;
          const url = `https://backend1-1cc6.onrender.com/loans/${email}/${chama}/${loanAmount}/${value}/${period}`;
          const response = await axios.get(url);
          if(response.data.status === 200) {
            Toast.show({
                type: "success",
                text1: "Loan application successful",
                text2: "Your loan application will be reviewed by the Chamavault team",
                position:"center",
                });
                setLoanAmount("");
                setValue("");
                setRepaymentPeriod(0);
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
        <Text className="text-lg w-full font-bold">Type of loan</Text>
       <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select type of loan"
        style={{borderColor: '#ca8a04',borderWidth: 2,  
        }}
        className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
        listMode="SCROLLVIEW"
      />
      <Text className="w-full mt-4 text-lg font-bold">Enter loan amount</Text>
      <TextInput 
      placeholder="Enter loan amount"
      value={loanAmount}
      onChangeText={setLoanAmount}
      keyboardType="numeric"
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className="w-full text-lg font-bold">Repayment period</Text>
      <TextInput 
      placeholder="Repayment period"
      value={repaymentPeriod}
      onChangeText={setRepaymentPeriod}
      keyboardType="numeric"
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className='text-yellow-600 font-medium'>Our interest rate is 3% - 7% per annum</Text>
      <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={handleApplyLoan}>
      {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Apply Loan</Text> }      
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
     <Text>Read our terms & conditions </Text>
     <TouchableOpacity>
     <Text style={{ color: '#eab308', textDecorationLine: 'underline' }}>here</Text>
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