import { SafeAreaView, ScrollView, Text, View, TextInput, ActivityIndicator, TouchableOpacity,Modal, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { push } from 'expo-router/build/global-state/routing';
import { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from "react-native-toast-message";
import { Paystack } from "react-native-paystack-webview";
import { useLocalSearchParams } from 'expo-router';

export default function Schedule() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'stock', value: 'stock' },
      { label: 'real estate', value: 'real estate' },
    ]);
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState(0)
  const [display, setDisplay] = useState(0);
  const [showPaystack, setShowPaystack] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card"); // Default payment method
  const publicKey = "pk_test_6633ec1991d6ba92490835f6cbc1b7934876a55f";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [chama_id, setChama_id] = useState();
  const { id, min_amount } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const storedEmail = await AsyncStorage.getItem("email");
      const storedName = await AsyncStorage.getItem("name");
      const storedPhone = await AsyncStorage.getItem("phonenumber");
      const storedChama_id = await AsyncStorage.getItem("chama");

      if (storedEmail) setEmail(storedEmail);
      if (storedName) setName(storedName);
      if (storedPhone) setPhonenumber(storedPhone);
      if (storedChama_id) setChama_id(storedChama_id);
    };

    fetchData();
  }, []);

  const amountValue = parseInt(amount);

  useEffect(() => {
    setDisplay(amount);
  }, [amount]);

  // function to check investment amount
  const checkAmount = async() => {
  const member_id = await AsyncStorage.getItem('member_id');
  const enteredAmount = parseFloat(amount);
  const min = parseFloat(min_amount);

  if (enteredAmount >= min) {
    setIsLoading(true);
    try{
      const response = await axios.get(
          `https://backend1-1cc6.onrender.com/checkmemberinvested/${id}/${member_id}/`
      );
      if(response.data.status == "ok"){
        setShowPaystack(true);
      }
      else{
        Toast.show({
          type: "info",
          text1: "Already Invested",
          text2: "You have already invested in this investment",
        });
        setShowPaystack(false);

      }

    }
    catch(error){
      alert(error);
    }
    finally{
      setIsLoading(false);
    }
    
  } else {
    Toast.show({
      type: "error",
      text1: "Amount too low",
      text2: `Minimum allowed is KES ${min}`,
    });
    setShowPaystack(false);
  }
};

  // end of function to check investment amount

  // function to save top up investment transaction
  const saveTransaction = async (transactionRef, amount) => {
    const member_id = await AsyncStorage.getItem('member_id');
    try {

      const url = "https://backend1-1cc6.onrender.com/member_investment/";
          const data = {
            investment_id: id,
            member_id: member_id,
            amount: amount, // Convert back to KES
            transactionRef: transactionRef,
          };
  
          console.log("Sending data:", data);  // Log request data
  
          const response = await axios.post(url, data, {
              headers: { "Content-Type": "application/json" },
          });


      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Successfully",
          text2: response.message,
        });
        console.log("Transaction saved successfully:", data);
      } else {
        Toast.show({
          type: "error",
          text1: "An error occurred",
          text2: response.message,
        });
        console.error("Failed to save transaction:", data);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error,
      });
      console.error("Error saving transaction:", error);
    }
  };
  // end of function to save investment transaction
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-lato">
          <Text className='text-lg font-bold font-lato'>Amount: {display}</Text>
              

               <Text className="w-full text-lg mt-4 font-bold font-lato">Amount to invest</Text>
               <TextInput 
               placeholder="Amount to invest"
               value={amount}
               onChangeText={setAmount}
               className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg font-lato"
               keyboardType='numeric'
                />

                {/* selection methods */}
                <View className="w-full flex-row justify-center mb-4">
                  <TouchableOpacity
                    onPress={() => setSelectedPaymentMethod("card")}
                    className={`p-3 mx-2 rounded-xl shadow-md w-40 ${
                      selectedPaymentMethod === "card" ? "bg-yellow-600" : "bg-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-center font-medium font-lato ${
                        selectedPaymentMethod === "card" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Top up with Card
                    </Text>
                  </TouchableOpacity>
                
                  <TouchableOpacity
                    onPress={() => setSelectedPaymentMethod("mobile_money")}
                    className={`p-3 mx-2 rounded-xl shadow-md w-40 ${
                      selectedPaymentMethod === "mobile_money" ? "bg-yellow-600" : "bg-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-center font-medium font-lato ${
                        selectedPaymentMethod === "mobile_money" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      Top Up with M-Pesa
                    </Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity
                className="w-full bg-yellow-600 p-4 rounded-lg"
                  onPress={checkAmount}
                >
                  {isLoading ? (
                 <ActivityIndicator size="large" color="#fff" />
                  ) : (
                <Text className="text-white text-center font-semibold text-lg font-lato">Proceed to Top Up</Text>
                )}
                </TouchableOpacity>
                
                {/* Paystack WebView Modal */}
                <Modal visible={showPaystack} animationType="slide" transparent={false}>
                <Paystack
                  paystackKey={publicKey}
                  amount={amountValue}
                  billingEmail={email}
                  billingName={name}
                  billingMobile={phonenumber}
                  currency="KES"
                  channels={selectedPaymentMethod === "mobile_money" ? ["mobile_money"] : ["card"]}
                  onSuccess={(res) => {
                  const transactionRef = res.transactionRef.reference;
                  saveTransaction(transactionRef, amountValue);
                
                  setShowPaystack(false);
                  Toast.show({
                      type: "success",
                      text1: "Payment Successful",
                      text2: `Transaction Ref: ${res.transactionRef.reference}`,
                      position:"center",
                  });
                  }}
                  onCancel={() => {
                  setShowPaystack(false);
                  Toast.show({
                    type: "error",
                    text1: "Payment Cancelled",
                    });
                  }}
                  autoStart={true}
                  />
                  </Modal>
                {/* end of selection method */}
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