import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function AvailableChamas() {
  const router = useRouter();
  const [items, setItems] = useState([]);

  // Fetch chamas
  useEffect(() => {
    const fetchChamas = async () => {
      try {
        const url = `https://backend1-1cc6.onrender.com/get_all_chamas/`;
        const response = await axios.get(url);
        if (response.status === 200) {
          setItems(response.data);
        }
      } catch (error) {
        console.error("Error fetching chamas:", error);
      }
    };
    fetchChamas();
  }, []);

  // Go to admin
  const goToAdmin = async (chamaname, chama_id) => {
    await AsyncStorage.setItem('chama_id', JSON.stringify(chama_id));
    await AsyncStorage.setItem('chamaname', chamaname);
    router.push('/admin');
  };

  // Each chama card
  const renderChama = ({ item }) => (
    <TouchableOpacity
      onPress={() => goToAdmin(item.name, item.chama_id)}
      className="bg-white p-4 rounded-lg shadow mb-4 mx-4"
    >
      <Text className="text-yellow-600 font-semibold text-lg">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={items}
        keyExtractor={(item) => item.chama_id.toString()}
        renderItem={renderChama}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
        ListFooterComponent={() => (
          <TouchableOpacity
            onPress={() => router.push('/createchama')}
            className="bg-white p-4 rounded-lg shadow mx-4 mt-2"
          >
            <Text className="text-yellow-600 font-semibold text-lg">
              + Add Chama
            </Text>
          </TouchableOpacity>
        )}
      />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    </SafeAreaView>
  );
}
