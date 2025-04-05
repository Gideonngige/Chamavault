import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity,Image, ActivityIndicator, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { push } from 'expo-router/build/global-state/routing';
import { useState } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function Schedule() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [stopTime, setStopTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  
  const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || stopTime;
      setShowPicker(Platform.OS === "ios");
      setStopTime(currentDate);
    };

    // function to handle schedule
    const handleSchedule = async () => {
      if (message === "" || stopTime === "") {
        Toast.show({
          type: "error",
          text1: "Empty fields",
          text2: "Please fill in all fields",
        });
        return;
      } else {
        setIsLoading(true);
        try {
          const formattedDate = new Date(stopTime).toISOString();
          const chama_id = await AsyncStorage.getItem("chama");
          const member_id = await AsyncStorage.getItem("member_id");
          alert(member_id);
          const url = `https://backend1-1cc6.onrender.com/schedulemeeting/`;
          const data = {
            message: message,
            date: formattedDate,
            chama_id: chama_id,
            member_id: member_id,
          }
          const response = await axios.post(url, data, {
            headers: { "Content-Type": "application/json" },
        });
          if (response.status === 200) {
            Toast.show({
              type: "success",
              text1: "Scheduled successfully",
              text2: response.data.message,
            });
            setMeetingDate(new Date());
            setMessage("");
          }
        } catch (error) {
          console.error(error);
          Toast.show({
            type: "error",
            text1: "Error scheduling meeting",
            text2: error.message,
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    // end of function to handle schedule
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
          <Text className="w-full text-lg font-bold">Meeting date</Text>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            className="p-4 w-full bg-white rounded-lg border border-yellow-600 mb-4"
          >
            <Text className="text-gray-700 text-base">
              {stopTime.toLocaleString()}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={stopTime}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
                {/* Message Input Field */}
            <View className="w-full mb-4">
              <Text className="text-lg font-semibold mb-2">Write a Message</Text>
              <TextInput
                className="w-full bg-white p-4 rounded-lg shadow-md border border-gray-300"
                placeholder="Type your message here..."
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
              />
            </View>
                <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={handleSchedule}>
                {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Schedule</Text> }
                        
                </TouchableOpacity>
                <Toast/>
            <StatusBar/>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}