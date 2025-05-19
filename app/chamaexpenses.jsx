import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ChamaExpenses() {
  const [chama, setChama] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([
    { label: 'Rent', value: 'Rent' },
    { label: 'Business', value: 'Business' },
    { label: 'Travel', value: 'Travel' },
    { label: 'Others', value: 'Others' },
  ]);

  const router = useRouter();

   // start of function to take expenses money chama
   const handleTakeExpense = async () => {
  const member_id = await AsyncStorage.getItem('member_id');
  const chama_id = await AsyncStorage.getItem('chama_id');
  setIsLoading(true);

  try {
    if (value == null || amount == 0) {
      Toast.show({
        type: "info",
        text1: "Fill in all the fields",
        text2: "please fill in all the fields",
        position: "center"
      });
      return; // prevent execution of the request
    }

    const url = `https://backend1-1cc6.onrender.com/chamaexpenses/${member_id}/${chama_id}/${value}/${description}/${amount}/`;
    const response = await axios.get(url);

    Toast.show({
      type: "success",
      text1: "Expenses money granted successfully",
      text2: response.data.message,
      position: "center"
    });
    setValue(null);
    setDescription("");
    setAmount(0);

  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Handle 400 Bad Request
      Toast.show({
      type: "error",
      text1: "Inadequate funds",
      text2: "chama has inadequate funds",
      position: "center"
    });

    } else {
      alert(error.message);
    }
  } finally {
    setIsLoading(false);
  }
};

  // end of function to join chama

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="px-5 pt-4"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="w-full"
        >
          <Text className="text-2xl font-bold text-yellow-700 mb-6">Take money for Chama Expenses</Text>

          {/* Expense Type */}
          <Text className="text-lg font-semibold text-gray-800 mb-2">Select Expense Type</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Choose type"
            style={{
              borderColor: '#ca8a04',
              borderRadius: 10,
              height: 50,
              zIndex: 1000
            }}
            dropDownContainerStyle={{
              borderColor: '#ca8a04',
              zIndex: 1000
            }}
          />
          <Text className="text-lg font-bold font-lato">Expense description</Text>
              <TextInput 
              placeholder="expense description..."
              value={description}
              onChangeText={setDescription} 
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="w-full h-40 p-4 bg-white rounded-lg shadow-sm mb-6 border border-yellow-600 text-gray-400 text-lg font-lato"
              />

          {/* Amount */}
          <Text className="text-lg font-semibold text-gray-800 mt-6 mb-2">Amount (KES)</Text>
          <TextInput
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            className="w-full p-4 rounded-xl border border-yellow-600 bg-white text-gray-900 text-base"
          />

          {/* Button */}
          <TouchableOpacity
            onPress={handleTakeExpense}
            className="w-full mt-8 bg-green-600 py-4 rounded-xl shadow-md"
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <Text className="text-white text-center text-lg font-semibold">
                Take Expense
              </Text>
            )}
          </TouchableOpacity>
          <Toast/>
        </KeyboardAvoidingView>
      </ScrollView>

      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    </SafeAreaView>
  );
}
