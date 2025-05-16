import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

export default function ActivePolls() {
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const chama_id = await AsyncStorage.getItem("chama");
        const response = await axios.get(`https://backend1-1cc6.onrender.com/activepolls/${chama_id}/`);
        const pollData = response.data.polls[0]; // Assuming 1 active poll
        setPoll(pollData);
      } catch (error) {
        console.error("Error fetching poll:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoll();
  }, []);

  const handleVote = async () => {
    if (!selectedOption) return;

    setIsSending(true);
    try {
      const email = await AsyncStorage.getItem("email");
      const chama_id = await AsyncStorage.getItem("chama");

      const data = {
        poll_id: poll.id,
        choice_id: selectedOption,
        email,
        chama_id,
      };

      const response = await axios.post("https://backend1-1cc6.onrender.com/membervote/", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && response.data.message === "Vote recorded successfully") {
        Toast.show({
          type: "success",
          text1: "Vote submitted successfully!",
        });
      } else {
        Toast.show({
          type: "info",
          text1: "Failed to vote!",
          text2: response.data.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Vote failed",
        text2: error.message,
      });
    }
    finally{
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FFA500" />
         <Text className="text-gray-600 font-serif">Loading polls...</Text>
      </View>
    );
  }

  if (!poll) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="font-lato">No active poll available.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="bg-yellow-500 p-5 rounded-2xl shadow-lg mb-4">
          <Text className="text-white text-lg font-semibold mb-4 font-lato">{poll.question}</Text>

          {poll.choices.map((choice) => (
            <TouchableOpacity
              key={choice.id}
              onPress={() => setSelectedOption(choice.id)}
              className={`flex-row items-center justify-between border p-3 rounded-xl mb-2 ${
                selectedOption === choice.id ? "border-yellow-600 bg-yellow-50" : "border-gray-300"
              }`}
            >
              <Text className="text-base font-medium font-lato">{choice.choice_text}</Text>
              {selectedOption === choice.id && (
                <Ionicons name="checkmark-circle" size={24} color="#eab308" />
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={handleVote}
            className={`bg-yellow-600 p-3 rounded-xl mt-4 ${!selectedOption ? "opacity-50" : ""}`}
            disabled={!selectedOption}
          >
            {isSending ? <ActivityIndicator size="large" color="#FFA500" /> : 
            <Text className="text-white font-bold text-center font-lato">Submit Vote</Text>
            }
          </TouchableOpacity>
        </View>

      {/* Poll Results Section */}
<View className="mt-8 bg-white p-4 rounded-2xl shadow-md">
  <Text className="text-xl font-bold mb-4 text-gray-800 font-lato">Poll Results</Text>

  {poll.choices.map((choice) => {
    const totalVotes = poll.choices.reduce((sum, c) => sum + c.votes, 0);
    const percentage = totalVotes ? ((choice.votes / totalVotes) * 100).toFixed(0) : 0;

    return (
      <View key={choice.id} className="mb-4">
        {/* Choice text and percentage */}
        <View className="flex-row justify-between mb-1">
          <Text className="text-base text-gray-800 font-medium font-lato">{choice.choice_text}</Text>
          <Text className="text-base text-gray-600 font-lato">{percentage}%</Text>
        </View>

        {/* Progress Bar */}
        <View className="w-full h-3 bg-gray-200 rounded-full">
          <View
            className="h-3 bg-green-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </View>
      </View>
    );
  })}
</View>



        <Toast />
        <StatusBar />
      </ScrollView>
    </SafeAreaView>
  );
}
