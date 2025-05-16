import {
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Poll() {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState(["", ""]); // start with 2 choices
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleChoiceChange = (text, index) => {
    const updated = [...choices];
    updated[index] = text;
    setChoices(updated);
  };

  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  const removeChoice = (index) => {
    if (choices.length > 2) {
      const updated = choices.filter((_, i) => i !== index);
      setChoices(updated);
    } else {
      Toast.show({
        type: "info",
        text1: "At least 2 choices are required",
      });
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

// start of handle submit poll function
    const handleSubmitPoll = async() =>{
     
      const formattedDate = new Date(date).toISOString();
      const chama_id = await AsyncStorage.getItem("chama_id");
      if(choices === "" || question === "" || date === ""){
        Toast.show({
          type: "error",
          text1: "All fields are required",
          text2: "Please fill in all fields before submitting.",
        });
        return;
      }
      
      else{
        setIsLoading(true);
        try {
          const response = await fetch("https://backend1-1cc6.onrender.com/createpoll/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              question,
              choices,
              stop_time: formattedDate,
              chama_id: chama_id, // Replace with actual chama_id
            }),
          });
          if (response.status === 200) {
            Toast.show({
              type: "success",
              text1: "Poll created successfully!",
            });
            setTimeout(() => {
              router.push("/activepolls");
            }, 2000); // Redirect after 2 seconds
          } else {
            throw new Error("Failed to create poll");
          }
        } catch (error) {
          Toast.show({
            type: "error",
            text1: error.message,
          });
        } finally {
          setIsLoading(false);
        }
      }
    }
  // end of handle submit poll function
    
  

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 bg-white p-2">
          <Text className="text-lg font-bold mb-2 font-serif">Poll Question</Text>
          <TextInput
            placeholder="Type your poll question"
            value={question}
            onChangeText={setQuestion}
            className="p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-700 text-base"
          />

          <Text className="text-lg font-bold mb-2 font-serif">Choices</Text>
          {choices.map((choice, index) => (
            <View key={index} className="flex-row items-center mb-3">
              <TextInput
                placeholder={`Choice ${index + 1}`}
                value={choice}
                onChangeText={(text) => handleChoiceChange(text, index)}
                className="flex-1 p-3 bg-white rounded-lg border border-yellow-600 text-gray-700 text-base"
              />
              <TouchableOpacity
                className="ml-2 p-2"
                onPress={() => removeChoice(index)}
              >
                <Ionicons name="trash-bin" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            onPress={addChoice}
            className="bg-yellow-100 border border-yellow-500 p-3 rounded-lg mb-4"
          >
            <Text className="text-yellow-600 text-center font-semibold">
              ➕ Add another choice
            </Text>
          </TouchableOpacity>

    <View>
    <Text className="w-full text-lg font-bold font-serif">Select stop date</Text>
      <TouchableOpacity onPress={showDatePicker} className="bg-yellow-600 p-4 rounded-lg mt-1 mb-4">
      <Text className="w-full text-lg font-bold font-serif">Stop Date: {date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>


          <TouchableOpacity
            className="bg-green-600 p-4 rounded-lg mt-4"
            onPress={handleSubmitPoll}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg font-serif">
                Submit Poll
              </Text>
            )}
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

