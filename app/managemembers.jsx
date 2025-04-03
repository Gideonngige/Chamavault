import { 
    Text, View, StatusBar, TextInput, TouchableOpacity, SafeAreaView, 
    ScrollView, ActivityIndicator 
  } from "react-native";
  import { useRouter } from "expo-router";
  import { useState } from "react";
  import DropDownPicker from 'react-native-dropdown-picker';
  
  export default function ManageMembers() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
  
    // Dropdown states
    const [open4, setOpen4] = useState(false);
    const [value4, setValue4] = useState(null);
    const [items4, setItems4] = useState([
      { label: "John Doe", value: "john_doe" },
      { label: "Ann Njeri", value: "ann_njeri" },
      { label: "Gideon Ushindi", value: "gideon_ushindi" }
    ]);
  
    // Message input state
    const [message, setMessage] = useState("");
  
    const handleSchedule = async () => {
      router.push('schedule/');
    };
  
    return (
      <SafeAreaView className="flex-1 bg-gray-100">
        <ScrollView className="p-4">
          <View className="flex-1 justify-center items-center p-5">
            
            {/* Page Title */}
            <Text className="w-full text-xl font-bold mb-3">Manage Members</Text>
  
            {/* Member Selection */}
            <View className="w-full mb-4">
              <Text className="text-lg font-semibold mb-2">Select a Member</Text>
              <DropDownPicker
                open={open4}
                value={value4}
                items={items4}
                setOpen={setOpen4}
                setValue={setValue4}
                setItems={setItems4}
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
                onPress={handleSchedule}
              >
                {isLoading 
                  ? <ActivityIndicator size="large" color="#fff" /> 
                  : <Text className="text-white text-center font-semibold text-lg">DELETE</Text>
                }
              </TouchableOpacity>
  
              <TouchableOpacity 
                className="bg-yellow-600 p-4 rounded-lg flex-1 ml-2"
                onPress={handleSchedule}
              >
                {isLoading 
                  ? <ActivityIndicator size="large" color="#fff" /> 
                  : <Text className="text-white text-center font-semibold text-lg">SEND MESSAGE</Text>
                }
              </TouchableOpacity>
            </View>
  
            <StatusBar />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  