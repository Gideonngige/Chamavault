import { SafeAreaView, ScrollView, Text, View, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      <View className="w-full bg-yellow-600 p-3 rounded-lg mb-5">
        {/* Date and Event Title */}
        <View className="flex-row justify-between bg-white p-3 rounded-lg">
          <Text className="font-bold text-gray-950 font-serif">{date}</Text>
          <Text className="font-bold text-gray-950 font-serif">{type}</Text>
        </View>

        {/* Divider */}
        <View className="border-b border-gray-300 my-2"></View>

        {/* Description */}
        <Text className="text-gray-950 font-serif">{message}</Text>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FFA500" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
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
