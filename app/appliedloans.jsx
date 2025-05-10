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



    const AppliedLoans = ({loan_id, loonee_id, loan, date, chama_id, loanType}) => {
        return (
            <View className='w-80 p-4 m-2 bg-yellow-600 rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold font-serif'>{loonee_id}</Text>
                    <Text className='font-bold font-serif'>KES.{loan}</Text>
                    <Text className='font-bold font-serif'>{date}</Text>
                </View>
                <Text className='m-3 font-serif'>Credit Score: 90</Text>
                <Text className='m-3 font-serif'>Type: {loanType}</Text>
                <View className="flex-row justify-between bg-gray-950 p-3 rounded-lg">
                    <TouchableOpacity onPress={() => handleConfirm(loan_id, loonee_id, "approved", chama_id)}>
                        {loadingLoanId === loan_id ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text className='text-white font-serif'>Confirm</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleConfirm(loan_id, loonee_id, "declined", chama_id)}>
                        {loadingLoanId === loan_id ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text className='text-white font-serif'>Decline</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    

    // Alert component
  const Alert = () => {
    return (
      <View className="flex flex-row items-center justify-center w-full bg-yellow-600 p-3 rounded-lg">
        <Text className="text-white font-bold font-serif">You have 0 notifications</Text>
      </View>
    );
  };

    if (loading) {
        return <ActivityIndicator size="large" color="#FFA500" />;
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