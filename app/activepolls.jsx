import { Text, View, StatusBar, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Activepolls() {
  const [polls, setPolls] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to check if the user has voted
  useEffect(() => {
    const check = async () => {
      const member_id = await AsyncStorage.getItem("member_id");
      const chama_id = await AsyncStorage.getItem("chama");
      setIsLoading(true);
      try{
        const response2 = await axios.get(`https://backend1-1cc6.onrender.com/checkmembervoted/${member_id}/${chama_id}/`);
        if(response2.status === 200){
          if(response2.data.message == "true"){
            setHasVoted(true);
          }
          else{
            setHasVoted(false);
          }
        }

      }
      catch(error){
        console.error("Error fetching member ID:", error);
      }
      finally{
        setIsLoading(false);
      }
    }
    check();
    
  },[]); 
  // Check if the user has voted when the component mounts

  useEffect(() => {
    // Fetch active polls from the Django backend
    const fetchPolls = async () => {
      setIsLoading(true);
      try {
        const chama_id = await AsyncStorage.getItem("chama");
        const response = await axios.get(`https://backend1-1cc6.onrender.com/activepolls/${chama_id}/`);
        if (response.data.polls) {
          setPolls(response.data.polls);
        }
       
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchPolls();
   
  }, []);
  // end of function to fetch polls

  // Function to handle vote submission
  const handleVote = async () => {
    if (!selectedOption) {
      return; // Make sure the user selects an option
    }
  
    try {
      const email = await AsyncStorage.getItem("email");
      const chama_id = await AsyncStorage.getItem("chama");
      // Assuming each poll has an 'id' and each choice has an 'id'
      const pollId = polls[0].id;  // Get the poll_id (assuming you're displaying only one poll at a time)
      const choiceId = selectedOption; // Get the selected choice_id
  
      // Send poll_id and choice_id to the backend
      const url = "https://backend1-1cc6.onrender.com/membervote/"
      const data = {
        poll_id: pollId,
        choice_id: choiceId,
        email: email,
        chama_id: chama_id,
    };
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
  });
  
      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: "Vote submitted successfully!",
        });
        if(response.data.message == "Vote recorded successfully") {
          setHasVoted(true);
        }
       
      } else {
        throw new Error("Failed to submit vote");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };
  // end of function to handle vote submission

  // alert component
  const Alert = () => {
    return (
      <View className="flex flex-row items-center justify-center w-full bg-yellow-600 p-3 rounded-lg">
        <Text className="text-white font-bold">All set, no poll available.</Text>
      </View>
    );
  };


  if (isLoading) {
    return <ActivityIndicator size="large" color="#FFA500" />;
  }
  

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        {/* Poll question */}
        {polls.length === 0 ? <Alert /> : null}


        {polls.map((poll) => (
          <View key={poll.id} className="bg-yellow-500 p-5 rounded-2xl shadow-lg mb-4">
            <Text className="text-white text-lg font-semibold">{poll.question}</Text>

            {/* Options with check selection */}
            {!hasVoted && (
              <View className="space-y-4">
                {poll.choices.map((choice) => (
                  <TouchableOpacity
                    key={choice.id}
                    onPress={() => setSelectedOption(choice.id)}
                    className={`flex-row items-center justify-between border p-3 rounded-xl ${
                      selectedOption === choice.id ? "border-yellow-600 bg-yellow-50" : "border-gray-300"
                    }`}
                  >
                    <Text className="text-base font-medium">{choice.choice_text}</Text>
                    {selectedOption === choice.id && (
                      <Ionicons name="checkmark-circle" size={24} color="#eab308" />
                    )}
                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  onPress={handleVote}
                  className={`bg-yellow-600 p-3 rounded-xl ${!selectedOption ? "opacity-50" : ""}`}
                  disabled={!selectedOption}
                >
                  <Text className="text-white font-bold text-center">Submit Vote</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Results after voting */}
            {hasVoted && (
              <View className="mt-8">
                <Text className="text-lg font-semibold mb-2">Poll Results</Text>
                {poll.choices.map((choice) => {
                  const totalVotes = poll.choices.reduce((sum, opt) => sum + opt.votes, 0);
                  const percent = totalVotes ? ((choice.votes / totalVotes) * 100).toFixed(0) : 0;

                  return (
                    <View key={choice.id} className="mb-3">
                      <Text className="text-base font-medium mb-1">
                        {choice.choice_text} — {percent}%
                      </Text>
                      <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <View className="h-2 bg-yellow-600" style={{ width: `${percent}%` }} />
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        ))}
        <Toast/>

        <StatusBar />
      </ScrollView>
    </SafeAreaView>
  );
}
