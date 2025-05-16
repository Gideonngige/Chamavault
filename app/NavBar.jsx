import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BottomNavBar() {
  const [activeRoute, setActiveRoute] = useState('home');
  const navigation = useNavigation();

  const handleNotifications = async() => {
    const selected_chama = await AsyncStorage.getItem('selected_chama');
    if(selected_chama == "No Chama"){alert("You must join a chama first")}
    else{
      setActiveRoute('notifications');
      navigation.navigate('notifications');

    }
    
  };

  const handleProfile = async() => {
    const selected_chama = await AsyncStorage.getItem('selected_chama');
    if(selected_chama == "No Chama"){alert("You must join a chama first")}
    else{
      setActiveRoute('profile');
      navigation.navigate('profile');

    }
    
  };

  const handleChat = async() => {
    const selected_chama = await AsyncStorage.getItem('selected_chama');
    if(selected_chama == "No Chama"){alert("You must join a chama first")}
    else{
      setActiveRoute('chat');
      navigation.navigate('chat');

    }
  };

  const handleHome = () => {
    setActiveRoute('home');
    navigation.navigate('home'); // You can replace this with your actual home navigation logic
  };

  return (
    <View className="absolute bottom-4 left-4 right-4 bg-yellow-600 rounded-full px-6 py-3 shadow-lg shadow-black/20">
      <View className="flex-row justify-between items-center">
        {/* Home */}
        <TouchableOpacity onPress={handleHome} className="items-center flex-1">
          <MaterialCommunityIcons
            name={activeRoute === 'home' ? 'home' : 'home-outline'}
            size={28}
            color={activeRoute === 'home' ? 'black' : 'white'}
          />
          <Text className={`text-xs mt-1 ${activeRoute === 'home' ? 'text-black font-bold' : 'text-white'}`}>Home</Text>
        </TouchableOpacity>

        {/* Chat */}
        <TouchableOpacity onPress={handleChat} className="items-center flex-1">
          <Ionicons
            name={activeRoute === 'chat' ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'}
            size={26}
            color={activeRoute === 'chat' ? 'black' : 'white'}
          />
          <Text className={`text-xs mt-1 ${activeRoute === 'chat' ? 'text-black font-bold' : 'text-white'}`}>Chat</Text>
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity onPress={handleNotifications} className="items-center flex-1">
          <MaterialCommunityIcons
            name={activeRoute === 'notifications' ? 'bell' : 'bell-outline'}
            size={28}
            color={activeRoute === 'notifications' ? 'black' : 'white'}
          />
          <Text className={`text-xs mt-1 ${activeRoute === 'notifications' ? 'text-black font-bold' : 'text-white'}`}>
            Alerts
          </Text>
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity onPress={handleProfile} className="items-center flex-1">
          <MaterialCommunityIcons
            name={activeRoute === 'profile' ? 'account' : 'account-outline'}
            size={28}
            color={activeRoute === 'profile' ? 'black' : 'white'}
          />
          <Text className={`text-xs mt-1 ${activeRoute === 'profile' ? 'text-black font-bold' : 'text-white'}`}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
