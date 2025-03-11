import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function BottomNavBar() {
  const [activeRoute, setActiveRoute] = useState('home');
  const navigation = useNavigation();

  const handleNotifications = () => {
    navigation.navigate('notifications', {
      
    });

  }

  const handleProfile =() =>{
    navigation.navigate('profile', {
      
    });
  }

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-gray-900 pt-2 border-t border-gray-200">
      <View className="flex-row justify-between items-center px-6 pb-4">
        {/* Left Tab */}
        <TouchableOpacity 
          className="items-center"
          onPress={() => {setActiveRoute('home'); alert("Home page!")}}
        >
          <MaterialCommunityIcons 
            name={activeRoute === 'home' ? 'home' : 'home-outline'} 
            size={24} 
            color={activeRoute === 'home' ? '#2563eb' : '#64748b'} 
          />
          {activeRoute === 'home' && (
            <Text className="text-yellow-600 text-xs mt-1">Home</Text>
          )}
        </TouchableOpacity>
       {/* notfication button */}
       <TouchableOpacity 
        className="items-center"
       onPress={handleNotifications}
      >
      <MaterialCommunityIcons 
      name={activeRoute === 'notifications' ? 'bell' : 'bell-outline'} 
      size={24} 
      color={activeRoute === 'notifications' ? 'yellow' : '#64748b'} 
      />
      {activeRoute === 'notifications' && (
      <Text className="text-yellow-600 text-xs mt-1">Notifications</Text>
      )}
      </TouchableOpacity>
       {/* end of notification button */}
        

        {/* Right Tab */}
        <TouchableOpacity 
          className="items-center"
          onPress={handleProfile}
        >
          <MaterialCommunityIcons 
            name={activeRoute === 'profile' ? 'account' : 'account-outline'} 
            size={24} 
            color={activeRoute === 'profile' ? 'yellow' : '#64748b'} 
          />
          {activeRoute === 'profile' && (
            <Text className="text-yellow-600 text-xs mt-1">Profile</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}