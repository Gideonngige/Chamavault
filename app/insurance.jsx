import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StatusBar, SafeAreaView, ScrollView, ActivityIndicator, Modal } from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Paystack } from "react-native-paystack-webview";
import axios from "axios";

export default function Insurance() {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [display, setDisplay] = useState(0);
  const [showPaystack, setShowPaystack] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  const publicKey = "pk_test_6633ec1991d6ba92490835f6cbc1b7934876a55f";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [chama_id, setChama_id] = useState();
  const [totalInsurance, setTotalInsurance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const storedEmail = await AsyncStorage.getItem("email");
      const storedName = await AsyncStorage.getItem("name");
      const storedPhone = await AsyncStorage.getItem("phonenumber");
      const storedChama_id = await AsyncStorage.getItem("chama_id");

      if (storedEmail) setEmail(storedEmail);
      if (storedName) setName(storedName);
      if (storedPhone) setPhonenumber(storedPhone);
      if (storedChama_id) setChama_id(storedChama_id);
    };

    fetchData();
  }, []);

  const amountValue = parseInt(amount);
  useEffect(() => setDisplay(amount), [amount]);


  useEffect(() => {
    const fetchInsurance = async () => {
      const chama_id = await AsyncStorage.getItem("chama_id");
      const member_id = await AsyncStorage.getItem("member_id");
      try{
        const url = `https://backend1-1cc6.onrender.com/get_total_insurance/${member_id}/${chama_id}/`;
      const response = await axios.get(url);
      if(response.status === 200){
        setTotalInsurance(response.data.total_insurance);

      }
      else{
        alert(response.data.message);
      }
      }
      catch(error){
        alert("An error occurred:" + error);
      }
    };

    fetchInsurance();
    setInterval(() => {
      fetchInsurance();
    }, 3000); // Refresh every 60 seconds
  }, []);




  const saveTransaction = async (transactionRef, amount, email) => {
    try {
      const url = "https://backend1-1cc6.onrender.com/insurance/";
      const data = {
        email,
        amount,
        phonenumber,
        chama_id,
        transactionRef,
      };

      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Transaction Successful",
          text2: `Ref: ${transactionRef}`,
        });
        setAmount("");
      } else {
        Toast.show({
          type: "error",
          text1: "Transaction Failed",
          text2: "No contribution date has been set!",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Transaction Error",
        text2: error.message,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-10">
      <ScrollView className="px-4">
        <View className="bg-white rounded-2xl shadow-md p-6 mb-6 mt-4">
            <Text className="font-lato text-lg">Total Insurance: KES.{totalInsurance}</Text>
        </View>
        <View className="bg-white rounded-2xl shadow-md p-6 mb-6 mt-4">
          <Text className="text-center text-xl font-semibold text-gray-800 mb-1 font-lato">
            Insurance Amount
          </Text>
          <Text className="text-center text-yellow-600 font-bold text-2xl mb-4 font-lato">
            KES {display || "0"}
          </Text>

          <TextInput
            placeholder="Enter amount in KES"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            className="border border-yellow-500 text-gray-900 bg-white p-4 rounded-lg text-lg font-lato mb-6"
          />

          {/* Payment Method Switcher */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity
              onPress={() => setSelectedPaymentMethod("card")}
              className={`flex-1 p-4 mx-1 rounded-xl ${
                selectedPaymentMethod === "card"
                  ? "bg-yellow-600"
                  : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-center text-base font-semibold font-lato ${
                  selectedPaymentMethod === "card"
                    ? "text-white"
                    : "text-gray-800"
                }`}
              >
                Pay with Card
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedPaymentMethod("mobile_money")}
              className={`flex-1 p-4 mx-1 rounded-xl ${
                selectedPaymentMethod === "mobile_money"
                  ? "bg-yellow-600"
                  : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-center text-base font-semibold font-lato ${
                  selectedPaymentMethod === "mobile_money"
                    ? "text-white"
                    : "text-gray-800"
                }`}
              >
                Pay with M-Pesa
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="bg-green-600 rounded-xl p-4"
            onPress={() => setShowPaystack(true)}
            disabled={!amount}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg font-lato">
                Proceed to Payment
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Payment Modal */}
      <Modal visible={showPaystack} animationType="slide">
        <Paystack
          paystackKey={publicKey}
          amount={amountValue}
          billingEmail={email}
          billingName={name}
          billingMobile={phonenumber}
          currency="KES"
          channels={
            selectedPaymentMethod === "mobile_money"
              ? ["mobile_money"]
              : ["card"]
          }
          onSuccess={(res) => {
            saveTransaction(res.transactionRef.reference, amountValue, email);
            setShowPaystack(false);
          }}
          onCancel={() => {
            setShowPaystack(false);
            Toast.show({
              type: "error",
              text1: "Payment Cancelled",
            });
          }}
          autoStart
        />
      </Modal>

      <Toast />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    </SafeAreaView>
  );
}
