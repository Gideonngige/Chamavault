import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity,Image, ActivityIndicator, StatusBar, Linking, FlatList } from 'react-native';
import { useRouter } from "expo-router";
import { push } from 'expo-router/build/global-state/routing';
import { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



export default function Defaulters() {
   const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [defaulters, setDefaulters] = useState([]);


//  // start get defaulters function
    useEffect(() => {
        const getDefaulters = async () => {
        const chama_id = await AsyncStorage.getItem('chama_id');
        setIsLoading(true);
        try {
            const url = `https://backend1-1cc6.onrender.com/get_defaulters/${chama_id}/`;
            const response = await axios.get(url);
            setDefaulters(response.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
        };
        getDefaulters();
    }, []);
// end of get defaulters function

// alert
const Alert = () => {
    return (
      <View className="flex flex-row items-center justify-center w-full bg-yellow-600 p-3 rounded-lg">
        <Text className="text-white font-bold font-serif">Chama has no defaulter</Text>
      </View>
    );
  };
// alert

// defaulters component
const DefaultersItem = ({ name, phone_number }) => {
  return (
    <View className="bg-white shadow-md rounded-2xl px-4 py-4 mb-4 w-full flex-row items-center justify-between border border-gray-200">
      <View>
        <Text className="text-lg font-semibold text-gray-900">{name}</Text>
        <Text className="text-sm text-gray-600 mt-1">{phone_number}</Text>
      </View>

      <TouchableOpacity
        onPress={() => handleCall(phone_number)}
        className="bg-green-600 p-3 rounded-full"
      >
        <MaterialIcons name="call" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// end of defaulters component

//   function to handle call
    const handleCall = (phone_number) =>{
        const url = `tel:${phone_number}`;
        Linking.openURL(url).catch(err => console.error("Error:", err));
    }
// end of function to handle call

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#FFA500" />
                <Text className="text-gray-600 font-serif">Loading defaulters...</Text>
            </View>
        );
    }
  return (
    <SafeAreaView className="flex-1 bg-white">
         <View className="flex-1 bg-white justify-center items-center p-5 font-sans mb-40">
          {defaulters.length === 0 ? (<Alert/>) : (
            <FlatList
              data={defaulters} // Array of data
              keyExtractor={(item) => item.member_id.toString()} // Unique key for each item
              renderItem={({ item }) => (
                <DefaultersItem
                    name={item.member_name}
                    phone_number={item.phone_number}
                />
              )}
              showsVerticalScrollIndicator={false} // Hides the scrollbar
              listMode="SCROLLVIEW"
            />

          )}
        
        </View>
      <StatusBar
            barStyle="dark-content" // or "light-content" depending on your background
            backgroundColor="transparent"
            translucent={true}
          />
    </SafeAreaView>
  );
}