import { View, Text, TextInput, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import "../global.css";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
const InfoCard = ({ title, kes, intrest, date, dateLabel }) => (
  <View className="bg-yellow-600 p-4 rounded-lg mb-4">
    <Text className="text-lg font-bold mb-2">{title}</Text>
    <View className="flex-row justify-between mb-1">
      <Text className="text-gray-600">Saving</Text>
      <Text className="text-gray-800">{kes}</Text>
    </View>
    <View className="flex-row justify-between mb-1">
      <Text className="text-gray-600">Internet</Text>
      <Text className="text-gray-800">{intrest}%</Text>
    </View>
    <View className="flex-row justify-between">
      <Text className="text-gray-600">{dateLabel}</Text>
      <Text className="text-gray-800">{date}</Text>
    </View>
  </View>
);

export default function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Chama1', value: 'Chama1' },
    { label: 'Chama2', value: 'Chama2' },
    { label: 'Chama3', value: 'Chama3' },
  ]);
  const [name, setName]  = useState("");
  const route = useRoute();
  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const url = `https://backend1-1cc6.onrender.com/getMember/${route.params.email}/`;
        const response = await axios.get(url);
        
        if(response.status === 200){
          Toast.show({
            type: "success", // Can be "success", "error", "info"
            text1: "Successfully Login",
            text2: "You have successfully logged in",
          });
          setName(response.data.name);
        }
      } 
      catch (error) {
        console.error("Error:", error);
        return null;
      }
    }
    fetchData();

  },[route.params.email]);

  return (
    
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView nestedScrollEnabled={true} className="p-4">
    <View className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="items-center mb-8">
      <Image 
        source={require('../assets/images2/profile.png')}
        style={{width: 150, height: 150, borderRadius: 75, borderWidth: 3,borderColor: '#fff',resizeMode: 'cover',
        }}
      />
        <Text className="text-lg font-bold text-gray-800 mb-1">{name}</Text>
        <Text className="text-gray-800">{route.params.email}</Text>
        <TouchableOpacity className="bg-yellow-600 rounded-lg w-full h-10 flex items-center justify-center" onPress={() => {alert("Update profile")}}>
        <Text className="text-white font-bold">Update Profile</Text>
        </TouchableOpacity>
        <Toast/>
      </View>
      <Text className="text-lg font-bold">Select Chama</Text>
      <View style={{padding:5}}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select a chama"
        style={{borderColor: '#ca8a04',borderWidth: 2,  
        }}
        listMode="SCROLLVIEW"
      />
    </View>

      {/* Main Content */}
      <View className="space-y-4">
        <TouchableOpacity
        onPress={() => router.push('saving/')}
        >
        <InfoCard
          title="Savings"
          kes="10,0000"
          intrest="75"
          date="10/02/2023"
          dateLabel="Last saving"
        />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => router.push('loan/')}
        >
        <InfoCard
          title="Loans"
          kes="10,0001"
          intrest="95"
          date="11/02/2023"
          dateLabel="Last loan"
        />
        </TouchableOpacity>
      </View>
      {/* Chamas Section */}
      <View className="items-center mb-2">
        <View className="bg-yellow-600 mb-5 font-bold rounded-lg w-full h-10 flex items-center justify-center">
        <Text className='font-bold'>Member in 4 Chamas</Text>
        </View>

          <View className="bg-yellow-600 p-4 rounded-lg mt-5 flex flex-row justify-around">
          <TouchableOpacity className="bg-yellow-600 py-3 rounded-lg items-center row-span-2 row-start-2 w-40" 
          onPress={() => router.push('createchama/')}
          >
          <Ionicons name="create" size={24} color="black" />
            <Text className="text-white font-medium">Create Chama</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-yellow-600 py-3 rounded-lg items-center row-span-2 row-start-2 w-40" 
          onPress={() => router.push('invitation/')}
          >
          <Entypo name="add-user" size={24} color="black" />
            <Text className="text-white font-medium">Invite</Text>
          </TouchableOpacity>
          </View>
        </View>
    </View>
    
    </ScrollView>
    </SafeAreaView>
  );
}