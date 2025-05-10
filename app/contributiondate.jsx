import {Text, View, StatusBar,TouchableOpacity, Image,SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useState } from "react";
import "../global.css";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ContributionDate(){
    const [isLoading, setIsLoading] = useState(false);
    const [contributionDate, setContributionDate] = useState(new Date());
    const [show, setShow] = useState(false);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setContributionDate(currentDate);
      };
    
      const showDatePicker = () => {
        setShow(true);
      };
        // function to handle schedule
        const handleSchedule = async () => {
            setIsLoading(true);
            try {
              const formattedDate = new Date(contributionDate).toISOString();
              const chama_id = await AsyncStorage.getItem("chama");
              const url = `https://backend1-1cc6.onrender.com/contributiondate/`;
              const data = {
                date: formattedDate,
                chama_id: chama_id,
              }
              const response = await axios.post(url, data, {
                headers: { "Content-Type": "application/json" },
            });
              if (response.status === 200) {
                Toast.show({
                  type: "success",
                  text1: "Date set successfully",
                  text2: response.data.message,
                });
                setContributionDate(new Date());
              }
            } catch (error) {
              console.error(error);
              Toast.show({
                type: "error",
                text1: "Error setting date",
                text2: error.message,
              });
            } finally {
              setIsLoading(false);
            }
        };

    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
    <Text className="w-full text-lg font-serif">Click below to set contribution date</Text>
      <View className='w-full'>
      <TouchableOpacity onPress={showDatePicker} className=" bg-yellow-600 p-4 rounded-lg mt-1 mb-4">
      <Text className="w-full text-lg text-white font-serif">Contribution Date: {contributionDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={contributionDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
    <TouchableOpacity className="w-full bg-green-600 p-4 rounded-sm" onPress={handleSchedule}>
    {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg font-serif">Schedule</Text> }
                        
    </TouchableOpacity>
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