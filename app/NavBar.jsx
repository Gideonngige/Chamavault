import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function BottomNavBar() {
  const [activeRoute, setActiveRoute] = useState('home');

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

        {/* Center Floating Button */}
        <TouchableOpacity 
          className="items-center justify-center bg-yellow-600 rounded-full w-16 h-16 -top-8 absolute"
          style={{ elevation: 5, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5 }}
          onPress={() => alert('Center button pressed')}
        >
          <MaterialCommunityIcons 
            name="plus" 
            size={32} 
            color="black" 
          />
        </TouchableOpacity>

        {/* Right Tab */}
        <TouchableOpacity 
          className="items-center"
          onPress={() => {setActiveRoute('profile');alert("Profile page!")}}
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