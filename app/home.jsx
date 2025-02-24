import { View, Text, TextInput, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import "../global.css";
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useRouter } from "expo-router";
const InfoCard = ({ title, kes, intrest, date, dateLabel }) => (
  <View className="bg-yellow-600 p-4 rounded-lg mb-4">
    <Text className="text-lg font-bold mb-2">{title}</Text>
    <View className="flex-row justify-between mb-1">
      <Text className="text-gray-600">Saving</Text>
      <Text className="text-gray-800">{kes}</Text>
    </View>
    <View className="flex-row justify-between mb-1">
      <Text className="text-gray-600">Internet:</Text>
      <Text className="text-gray-800">{intrest}%</Text>
    </View>
    <View className="flex-row justify-between">
      <Text className="text-gray-600">{dateLabel}:</Text>
      <Text className="text-gray-800">{date}</Text>
    </View>
  </View>
);

export default function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ]);
  const route = useRoute();
  const router = useRouter();

  const fetchData = async () => {
    try {
      
      const url = `https://backend1-1cc6.onrender.com/members/${route.params.email}/@peter2025/`;
      alert("Goood");
      const response = await axios.get(url);
      if(response.status === 200){
        alert("Goood");
      }
    } 
    catch (error) {
      console.error("Error logging in:", error);
      return null;
    }
  }
  alert(route.params.email);
  useEffect(() => {
    fetchData();
  },[]);

  return (
    
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView className="p-4">
    <View className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="items-center mb-8">
      <Image 
        source={require('../assets/images2/profile.png')}
        style={{width: 150, height: 150, borderRadius: 75, borderWidth: 3,borderColor: '#fff',resizeMode: 'cover',
        }}
      />
        <Text className="text-lg font-bold text-gray-800 mb-1">Gideon Ushindi</Text>
        <Text className="text-gray-800">{route.params.email}</Text>
        <TouchableOpacity className="bg-yellow-600 rounded-lg w-80 h-10 flex items-center justify-center" onPress={() => {alert("Update profile")}}>
        <Text className="text-white font-bold">Update Profile</Text>
        </TouchableOpacity>
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
        onPress={() => {alert("Pressed Loans")}}
        >
        <InfoCard
          title="Loans"
          kes="10,0001"
          intrest="95"
          date="11/02/2023"
          dateLabel="Database"
        />
        </TouchableOpacity>
      </View>
      {/* Chamas Section */}
      <View className="items-center mb-2">
          <Text className="bg-yellow-600 mb-5 font-bold rounded-lg w-80 h-10 flex items-center justify-center">Member in 4 Chamas</Text>
          <View className="grid grid-flow-col grid-rows-3 gap-4">
          <TouchableOpacity className="bg-yellow-600 py-3 rounded-lg items-center row-span-2 row-start-2 w-40" 
          onPress={() => {alert("Create chama clicked")}}
          >
          <Ionicons name="create" size={24} color="black" />
            <Text className="text-white font-medium">Create Chama</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-yellow-600 py-3 rounded-lg items-center row-span-2 row-start-2 w-40" 
          onPress={() => {alert("Invite member clicked")}}
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