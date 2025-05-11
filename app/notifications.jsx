import { SafeAreaView, ScrollView, Text, View, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Alert component
  const Alert = () => {
    return (
      <View className="flex flex-row items-center justify-center w-full bg-yellow-600 p-3 rounded-lg">
        <Text className="text-white font-bold">You have 0 notifications</Text>
      </View>
    );
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const email = await AsyncStorage.getItem('email');
      const chama_id = await AsyncStorage.getItem('chama');
      try {
        const response = await axios.get(`https://backend1-1cc6.onrender.com/get_notifications/${email}/${chama_id}/`);
        setNotifications(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, []);

  const NotificationItem = ({ date, type, message }) => {
  return (
    <View className="w-full bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-200">
      {/* Header: Icon + Date + Type */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center space-x-2">
          <MaterialCommunityIcons name="bell-ring" size={20} color="#facc15" />
          <Text className="text-sm text-gray-500">{date}</Text>
        </View>
        <Text className="text-sm font-semibold text-yellow-600 lowercase">{type}</Text>
      </View>

      {/* Message */}
      <Text className="text-gray-800 text-base leading-5">{message}</Text>
    </View>
  );
};

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FFA500" />
          <Text className="text-gray-600 font-serif">Loading notifications...</Text>
        </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white mb-20">
      {/* <ScrollView nestedScrollEnabled={true} className="p-4"> */}
      
        <View className="bg-white  p-5 font-sans">
          {notifications.length === 0 ? (
            <Alert />
          ) : (
            <FlatList
              data={notifications} // Array of data
              keyExtractor={(item) => item.notification_id.toString()} // Unique key for each item
              renderItem={({ item }) => (
                <NotificationItem
                  date={item.notification_date.split("T")[0]}
                  type={item.notification_type}
                  message={item.notification}
                />
              )}
              showsVerticalScrollIndicator={false} // Hides the scrollbar
              listMode="SCROLLVIEW"
            />
          )}
        </View>
        {/* </ScrollView> */}
        <StatusBar
            barStyle="dark-content" // or "light-content" depending on your background
            backgroundColor="transparent"
            translucent={true}
          />
    </SafeAreaView>
  );
}
