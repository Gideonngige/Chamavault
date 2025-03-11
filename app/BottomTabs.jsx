import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import home from './home';
import notifications from './notifications';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'bell' : 'bell-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account' : 'account-outline';
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'yellow',
          tabBarInactiveTintColor: '#64748b',
          tabBarStyle: { backgroundColor: '#1E293B' },
        })}
      >
        <Tab.Screen name="Home" component={home} />
        <Tab.Screen name="Notifications" component={notifications} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
