import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Paystack } from "react-native-paystack-webview";
import axios from "axios";

export default function PayLoan() {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [display, setDisplay] = useState(0);
  const [showPaystack, setShowPaystack] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [loan, setLoan] = useState(0);

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
      const loan = await AsyncStorage.getItem("loan");
      setLoan(loan);

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

  const saveTransaction = async (transactionRef, amount, email) => {
    try {
      const url = "https://backend1-1cc6.onrender.com/payloan/";
      const data = {
        email: email,
        amount: amount,
        phonenumber: phonenumber,
        chama_id: chama_id,
        transactionRef: transactionRef,
      };

      console.log("Sending data:", data);

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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 justify-center items-center space-y-6">
          <Text className="text-lg font-bold text-gray-800 w-full">
            Your Loan: <Text className="text-yellow-600">KES.{loan}</Text>
          </Text>

          <View className="w-full space-y-1">
            <Text className="text-gray-700 text-base">Repayment Amount</Text>
            <Text className="text-yellow-600 font-bold text-2xl">KES.{display}</Text>
          </View>

          <TextInput
            placeholder="Enter repayment amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            className="w-full p-4 rounded-xl bg-white border border-yellow-500 text-gray-800 text-lg shadow-md"
          />

          <View className="w-full flex-row justify-between mt-2">
            <TouchableOpacity
              onPress={() => setSelectedPaymentMethod("card")}
              className={`flex-1 mr-1 p-3 rounded-xl ${
                selectedPaymentMethod === "card" ? "bg-yellow-600" : "bg-gray-300"
              }`}
            >
              <Text className="text-white text-center font-semibold">Pay with Card</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedPaymentMethod("mobile_money")}
              className={`flex-1 ml-1 p-3 rounded-xl ${
                selectedPaymentMethod === "mobile_money" ? "bg-yellow-600" : "bg-gray-300"
              }`}
            >
              <Text className="text-white text-center font-semibold">Pay with M-Pesa</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="w-full bg-yellow-600 p-4 rounded-xl mt-4 shadow-md"
            onPress={() => setShowPaystack(true)}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white text-center font-bold text-lg">Proceed to Payment</Text>
            )}
          </TouchableOpacity>

          <Modal visible={showPaystack} animationType="slide" transparent={false}>
            <Paystack
              paystackKey={publicKey}
              amount={amountValue}
              billingEmail={email}
              billingName={name}
              billingMobile={phonenumber}
              currency="KES"
              channels={
                selectedPaymentMethod === "mobile_money" ? ["mobile_money"] : ["card"]
              }
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
