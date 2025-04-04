import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, Image, TextInput, StatusBar, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { useRouter } from "expo-router";
import axios from 'axios';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Chama(){
    const [appliedLoans, setAppliedLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the API
        const fetchLoans = async () => {
            const role = await AsyncStorage.getItem('role');
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

    const handleConfirm = async(loan_id, loonee_id, approval) =>{
        try{
            const approverEmail = await AsyncStorage.getItem('email');
            const url = `https://backend1-1cc6.onrender.com/confirm_loan/${loan_id}/${loonee_id}/${approverEmail}/${approval}/`;
            alert(approverEmail);
            const response = await axios.get(url);
            if(response.status === 200){
                Toast.show({
                    type: "success", // Can be "success", "error", "info"
                    text1: "Successfully Approved",
                    text2: response.data.message,
                });
            }
            else{
                Toast.show({
                    type: "info", // Can be "success", "error", "info"
                    text1: "Not yet approved",
                    text2: response.data.message,
                });
            }
        }
        catch(error){
            Toast.show({
                type: "error", // Can be "success", "error", "info"
                text1: "An error occurred",
                text2: error.message,
            });
        }

    }



    const AppliedLoans = ({loan_id, loonee_id, loan, date,  creditScore, loanType}) => {
        return(
            
            <View className='w-full p-4 m-2 bg-yellow-600 rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold'>{loonee_id}</Text>
                    <Text className='font-bold'>KES.{loan}</Text>
                    <Text className='font-bold'>{date}</Text>
                </View>
                <Text className='m-3'>Credit Score: 90</Text>
                <Text className='m-3'>Type: {loanType}</Text>
                <View className="flex-row justify-between bg-gray-950 p-3 rounded-lg">
                    <TouchableOpacity onPress={() => handleConfirm(loan_id, loonee_id,"approved")}>
                        <Text className='text-white'>Confirm</Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={() => handleConfirm(loan_id, loonee_id,"declined")}>
                        <Text className='text-white'>Decline</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // Alert component
  const Alert = () => {
    return (
      <View className="flex flex-row items-center justify-center w-full bg-yellow-600 p-3 rounded-lg">
        <Text className="text-white font-bold">You have 0 notifications</Text>
      </View>
    );
  };

    if (loading) {
        return <ActivityIndicator size="large" color="#FFA500" />;
    }
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
        {appliedLoans.length === 0 ? (
            <Alert />
          ) : (
            <FlatList
                data={appliedLoans} // Array of data
                keyExtractor={(item) => item.loan_id.toString()} // Unique key for each item
                renderItem={({ item }) => <AppliedLoans loan_id={item.loan_id} loonee_id={item.name} loan={item.amount} date={item.loan_date.split("T")[0]} loanType={item.loan_type} />} // How each item is displayed
                showsVerticalScrollIndicator={false} // Hides the scrollbar
                listMode="SCROLLVIEW"
            />)}

            <Toast/>

        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}