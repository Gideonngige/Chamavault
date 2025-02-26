import { useState } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StatusBar, SafeAreaView, ScrollView, FlatList} from 'react-native';
import { useRouter } from "expo-router";

export default function Chama(){
    const AppliedLoans = () => {
        <View className='bg-yellow-600 p-0 w-full rounded-lg mt-5 flex flex-row justify-around'>
            <Text>Name</Text>
            <Text>KES.5000</Text>
            <Text>Date</Text>
            <View>
                <Text>Credit Score:90</Text>
                <Text>Type:Long time loan</Text>
            </View>
        </View>
    }
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
            {/* <FlatList
                data={filteredMembers} // Array of data
                keyExtractor={(item) => item.member_id.toString()} // Unique key for each item
                renderItem={({ item }) => <Member name={item.name} email={item.email} joined_date={item.joined_date} />} // How each item is displayed
                showsVerticalScrollIndicator={false} // Hides the scrollbar
            /> */}

            <View className='flex-1 justify-center items-center bg-gray-100'>
            <View className='w-80 p-4 bg-white rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold'>John Doe</Text>
                    <Text className='font-bold'>KES.90000</Text>
                    <Text className='font-bold'>12/03/2025</Text>
                </View>
                <Text className='m-3'>Credit Score: 90</Text>
                <Text className='m-3'>Type: Long term loan</Text>
                <View className="flex-row justify-between bg-gray-950 p-3 rounded-lg">
                    <TouchableOpacity>
                        <Text className='text-white'>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text className='text-white'>Decline</Text>
                    </TouchableOpacity>
                </View>
            </View>
           
        </View>

        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}