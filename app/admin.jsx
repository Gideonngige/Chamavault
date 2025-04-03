import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";
import { useState } from 'react';

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSchedule = async () => {
    router.push('schedule/');
  };

  const handleProfile = async () => {
    router.push('home/');
  };

  const handlePoll = async () => {
    router.push('poll/');
  };

  const handleChat = async () => {
    router.push('chat/');
  };

  const handleManageroles = async () => {
    router.push('manageroles/');
  };
  const handleManagemembers = async () => {
    router.push('managemembers/');
  };
  

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="p-4">
        <View className="flex-1 justify-center items-center p-5">
          
          {/* Welcome Message */}
          <Text className="w-full text-xl font-bold mb-3">Hi, John Doe</Text>

          {/* Statistics Section */}
          <View className="w-full flex flex-row justify-between mb-4">
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-gray-900 font-bold">KHS CHAMA</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-gray-500">Total Members</Text>
              <Text className="text-lg font-bold">400</Text>
            </View>
          </View>

          <View className="w-full flex flex-row justify-between mb-6">
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-gray-500">Total Savings</Text>
              <Text className="text-lg font-bold">KES.200,000</Text>
            </View>
            <View className="bg-white p-4 rounded-lg shadow-lg flex-1 mx-2">
              <Text className="text-gray-500">Total Loans</Text>
              <Text className="text-lg font-bold">KES.20,000</Text>
            </View>
          </View>

          {/* Manage Roles Section */}
          <Text className="w-full text-lg font-bold mb-3">Manage Roles</Text>

          {/* Button Grid */}
          <View className="w-full flex-row flex-wrap justify-between">
            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2" onPress={handleManageroles}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Manage Roles</Text>}
            </TouchableOpacity>

            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2" onPress={handleManagemembers}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Manage Members</Text>}
            </TouchableOpacity>

            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2" onPress={handleChat}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Chat Message</Text>}
            </TouchableOpacity>

            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2" onPress={handleSchedule}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Schedule Meeting</Text>}
            </TouchableOpacity>

            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2" onPress={handlePoll}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Poll</Text>}
            </TouchableOpacity>

            <TouchableOpacity className="bg-yellow-600 p-4 rounded-lg w-[48%] mb-2" onPress={handleProfile}>
              {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Go To Profile</Text>}
            </TouchableOpacity>
          </View>

          <StatusBar />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
