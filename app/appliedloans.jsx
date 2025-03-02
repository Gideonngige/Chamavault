import { useState } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StatusBar, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { useRouter } from "expo-router";

export default function Chama(){
    const data = [
        {id:1, name:"John Doe", loan:90000, date:"12/12/2024",creditScore:90,loanType:"LTS"},
        {id:2, name:"John Doe", loan:90000, date:"12/12/2024",creditScore:90,loanType:"LTS"},
        {id:3, name:"John Doe", loan:90000, date:"12/12/2024",creditScore:90,loanType:"LTS"},
    ]
    const AppliedLoans = ({name, loan, date,  creditScore, loanType}) => {
        return(
            
            <View className='w-80 p-4 m-2 bg-yellow-600 rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold'>{name}</Text>
                    <Text className='font-bold'>KES.{loan}</Text>
                    <Text className='font-bold'>{date}</Text>
                </View>
                <Text className='m-3'>Credit Score: {creditScore}</Text>
                <Text className='m-3'>Type: {loanType}</Text>
                <View className="flex-row justify-between bg-gray-950 p-3 rounded-lg">
                    <TouchableOpacity>
                        <Text className='text-white'>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text className='text-white'>Decline</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
            <FlatList
                data={data} // Array of data
                keyExtractor={(item) => item.id.toString()} // Unique key for each item
                renderItem={({ item }) => <AppliedLoans name={item.name} loan={item.loan} date={item.date} creditScore={item.creditScore} loanType={item.loanType} />} // How each item is displayed
                showsVerticalScrollIndicator={false} // Hides the scrollbar
                listMode="SCROLLVIEW"
            />

        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}