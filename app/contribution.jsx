import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StatusBar, SafeAreaView, ScrollView, ActivityIndicator, Modal } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Paystack } from "react-native-paystack-webview";
import axios from "axios";

export default function Contributions() {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [display, setDisplay] = useState(0);
  const [showPaystack, setShowPaystack] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card"); // Default payment method

  const publicKey = "pk_test_6633ec1991d6ba92490835f6cbc1b7934876a55f";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [chama_id, setChama_id] = useState();

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


//   function to save transactions
const saveTransaction = async (transactionRef, amount, email) => {
    try {

      const url = "https://backend1-1cc6.onrender.com/contributions/";
          const data = {
            email: email,
            amount: amount, // Convert back to KES
            phonenumber: phonenumber,
            chama_id: chama_id,
            transactionRef: transactionRef,
          };
  
          console.log("Sending data:", data);  // Log request data
  
          const response = await axios.post(url, data, {
              headers: { "Content-Type": "application/json" },
          });


      if (response.status === 200) {
        console.log("Transaction saved successfully:", data);
      } else {
        console.error("Failed to save transaction:", data);
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };
  
// end of function to save transaction 

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
          <Text className="text-gray-950">Contribution amount</Text>
          <Text className="text-yellow-600 font-bold text-xl">KES.{display}</Text>

          <TextInput
            placeholder="Enter contribution amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            className="w-full p-4 bg-white rounded-lg shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg"
          />

          {/* Payment Method Selection */}
          {/* Payment Method Selection */}
<View className="w-full flex-row justify-center mb-4">
  <TouchableOpacity
    onPress={() => setSelectedPaymentMethod("card")}
    className={`p-3 mx-2 rounded-xl shadow-md w-40 ${
      selectedPaymentMethod === "card" ? "bg-yellow-600" : "bg-gray-200"
    }`}
  >
    <Text
      className={`text-center font-medium ${
        selectedPaymentMethod === "card" ? "text-white" : "text-gray-800"
      }`}
    >
      Pay with Card
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    onPress={() => setSelectedPaymentMethod("mobile_money")}
    className={`p-3 mx-2 rounded-xl shadow-md w-40 ${
      selectedPaymentMethod === "mobile_money" ? "bg-yellow-600" : "bg-gray-200"
    }`}
  >
    <Text
      className={`text-center font-medium ${
        selectedPaymentMethod === "mobile_money" ? "text-white" : "text-gray-800"
      }`}
    >
      Pay with M-Pesa
    </Text>
  </TouchableOpacity>
</View>


          <TouchableOpacity
            className="w-full bg-yellow-600 p-4 rounded-lg"
            onPress={() => setShowPaystack(true)}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg">Proceed to Payment</Text>
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
                saveTransaction(transactionRef, amountValue, email);

                setShowPaystack(false);
                Toast.show({
                  type: "success",
                  text1: "Payment Successful",
                  text2: `Transaction Ref: ${res.transactionRef.reference}`,
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

          <Toast />
          <StatusBar />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
