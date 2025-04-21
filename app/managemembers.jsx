import { 
    Text, View, StatusBar, TextInput, TouchableOpacity, SafeAreaView, 
    ScrollView, ActivityIndicator 
  } from "react-native";
  import { useRouter } from "expo-router";
  import { useState, useEffect } from "react";
  import DropDownPicker from 'react-native-dropdown-picker';
  import axios from "axios";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Toast from "react-native-toast-message";
  
  export default function ManageMembers() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const router = useRouter();
  
    // Dropdown states
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
  
    // Message input state
    const [message, setMessage] = useState("");
  
    const handleSchedule = async () => {
      router.push('schedule/');
    };

     // fetch members
  useEffect(() => {
    const fetchMembers = async () => {
      const chama_id = await AsyncStorage.getItem('chama_id');
      const email = await AsyncStorage.getItem('email');
      try{
        const url = `https://backend1-1cc6.onrender.com/members/${email}/${chama_id}/`;
        const response = await axios.get(url);
        if(response.status === 200){
          const formattedItems = response.data.map((member) => ({
            label: member.name,
            value: member.member_id, // Use an ID if available
          }));
          setItems(formattedItems);
          // await AsyncStorage.setItem('chama', chama);
        }

      }
      catch(error){
        console.error("Error fetching chamas:", error);
      }

    }
    fetchMembers();
  },[]);
  // end of fetch members

  // send message
  const handleSendMessage = async()=>{
    const chama_id = await AsyncStorage.getItem('chama_id');
    if(value == null || message == ""){
      Toast.show({
          type: "info", // Can be "success", "error", "info"
          text1: "Empty fields",
          text2: "Please fill all the fields",
          position:"center",
      });
    }
    else{
      setIsLoading2(true);
      try{
        const url = "https://backend1-1cc6.onrender.com/adminsendmessage/";
        const data = {
              member_id: value,
              chama_id: chama_id,
              message: message,
          };
        const response = await axios.post(url, data, {
            headers: { "Content-Type": "application/json" },
        });
        if(response.status === 200){
          Toast.show({
            type: "success", // Can be "success", "error", "info"
            text1: "Successfully sent",
            text2: response.data.message,
            position:"center",
        });
          setMessage("");
        }
        else{
          Toast.show({
            type: "error", // Can be "success", "error", "info"
            text1: "Error occurred",
            text2: "An error occurred",
            position:"center",
        });
        }

      }
      catch(error){
        Toast.show({
          type: "error", // Can be "success", "error", "info"
          text1: "Error",
          text2: error.message,
          position:"center",
      });
      }
      finally{
        setIsLoading2(false);
      }
    }
  }
  // end of send message

  // delete member function
  const deletemember = async() =>{
    setIsLoading(true);
    try{
      const url =`https://backend1-1cc6.onrender.com/deletemember/${value}`;
      const response = await axios.get(url);
      if(response.status === 200){
        Toast.show({
          type: "success", // Can be "success", "error", "info"
          text1: "Member deleted successfully",
          text2: response.data.message,
          position:"center",
      });
      }
      else{
        Toast.show({
          type: "error", // Can be "success", "error", "info"
          text1: "An error occurred, try again",
          text2: response.data.message,
          position:"center",
      });
      }

    }
    catch(error){
      Toast.show({
        type: "error", // Can be "success", "error", "info"
        text1: "Error",
        text2: error.message,
        position:"center",
    });
    }
    finally{
      setIsLoading(false);
    }
    
  }
  // end of delete member function
  
    return (
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
          <View className="flex-1 justify-center items-center p-5">
            
            {/* Page Title */}
            <Text className="w-full text-xl font-bold mb-3">Manage Members</Text>
  
            {/* Member Selection */}
            <View className="w-full mb-4">
              <Text className="text-lg font-semibold mb-2">Select a Member</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select a member"
                style={{ borderColor: '#ca8a04', borderWidth: 2 }}
                listMode="SCROLLVIEW"
              />
            </View>
  
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
  
            {/* Action Buttons */}
            <View className="w-full flex-row justify-between">
              <TouchableOpacity 
                className="bg-red-600 p-4 rounded-lg flex-1 mr-2"
                onPress={deletemember}
              >
                {isLoading 
                  ? <ActivityIndicator size="large" color="#fff" /> 
                  : <Text className="text-white text-center font-semibold text-lg">DELETE</Text>
                }
              </TouchableOpacity>
  
              <TouchableOpacity 
                className="bg-yellow-600 p-4 rounded-lg flex-1 ml-2"
                onPress={handleSendMessage}
              >
                {isLoading2 
                  ? <ActivityIndicator size="large" color="#fff" /> 
                  : <Text className="text-white text-center font-semibold text-lg">SEND MESSAGE</Text>
                }
              </TouchableOpacity>
            </View>
            <Toast/>
  
            <StatusBar />
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
  