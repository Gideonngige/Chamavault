import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, Image, TextInput, StatusBar, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { useRouter } from "expo-router";
import axios from 'axios';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Chama(){
    const [appliedLoans, setAppliedLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingLoanId, setLoadingLoanId] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        const fetchLoans = async () => {
            const role = await AsyncStorage.getItem('role');
            // alert(role)
            axios.get(`https://backend1-1cc6.onrender.com/getAllLoans/${role}/`)
          .then((response) => {
            setAppliedLoans(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
        }
        fetchLoans();
    })

    const handleConfirm = async(loan_id, loonee_id, approval, chama_id) => {
        try {
            setLoadingLoanId(loan_id); // Set currently loading loan
            const approverEmail = await AsyncStorage.getItem('email');
            const url = `https://backend1-1cc6.onrender.com/confirm_loan/${loan_id}/${loonee_id}/${approverEmail}/${approval}/${chama_id}/`;
            const response = await axios.get(url);
    
            if(response.status === 200){
                Toast.show({
                    type: "success",
                    text1: "Successfully Approved",
                    text2: response.data.message,
                });
            } else {
                Toast.show({
                    type: "info",
                    text1: "Not yet approved",
                    text2: response.data.message,
                });
            }
        } catch(error) {
            Toast.show({
                type: "error",
                text1: "An error occurred",
                text2: error.message,
            });
        } finally {
            setLoadingLoanId(null); // Reset loading state
        }
    };


// start of applied loans component
const AppliedLoans = ({ loan_id, loonee_id, loan, date, chama_id, loanType }) => {
  return (
    <View className="w-80 p-4 mb-4 bg-white rounded-2xl shadow-md border border-gray-200">
      {/* Top Info Section */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm text-gray-700 font-semibold">Loanee: {loonee_id}</Text>
        <Text className="text-base font-bold text-green-600">KES {loan}</Text>
      </View>

      {/* Loan Metadata */}
      <Text className="text-sm text-gray-500 mb-1">Applied on: {date}</Text>
      <Text className="text-sm text-gray-600 mb-1">Credit Score: 90</Text>
      <Text className="text-sm text-gray-600 mb-3">Type: {loanType}</Text>

      {/* Action Buttons */}
      <View className="flex-row justify-between mt-3">
        <TouchableOpacity
          onPress={() => handleConfirm(loan_id, loonee_id, "approved", chama_id)}
          className="bg-green-600 px-4 py-2 rounded-lg"
        >
          {loadingLoanId === loan_id ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Approve</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleConfirm(loan_id, loonee_id, "declined", chama_id)}
          className="bg-red-600 px-4 py-2 rounded-lg"
        >
          {loadingLoanId === loan_id ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Decline</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// end of applied loans component
    

    // Alert component
  const Alert = () => {
    return (
      <View className="flex flex-row items-center justify-center w-full bg-yellow-600 p-3 rounded-lg">
        <Text className="text-white font-bold font-serif">You have 0 notifications</Text>
      </View>
    );
  };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#FFA500" />
                <Text className="text-gray-600 font-serif">Loading loans...</Text>
            </View>
        )
    }
    return(
        <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
        {appliedLoans.length === 0 ? (
            <Alert />
          ) : (
            <FlatList
                data={appliedLoans} // Array of data
                keyExtractor={(item) => item.loan_id.toString()} // Unique key for each item
                renderItem={({ item }) => <AppliedLoans loan_id={item.loan_id} loonee_id={item.name} loan={item.amount} date={item.loan_date.split("T")[0]} chama_id={item.chama} loanType={item.loan_type} />} // How each item is displayed
                showsVerticalScrollIndicator={false} // Hides the scrollbar
                listMode="SCROLLVIEW"
            />)}

            <Toast/>

        </View>
        <StatusBar
      barStyle="dark-content" // or "light-content" depending on your background
      backgroundColor="transparent"
      translucent={true}
      />
        </SafeAreaView>
    );
}