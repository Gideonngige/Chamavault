import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  StatusBar,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const email = await AsyncStorage.getItem('email');
      const chama_id = await AsyncStorage.getItem('chama_id');
      axios.get(`https://backend1-1cc6.onrender.com/members/${email}/${chama_id}/`)
        .then((response) => {
          setMembers(response.data);
          setFilteredMembers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getData();
  }, []);

  useEffect(() => {
    if (Array.isArray(members)) {
      setFilteredMembers(
        members.filter((member) =>
          member.name?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredMembers([]);
    }
  }, [search, members]);

  const ProfileCard = ({ name, email, joined_date, profile_image }) => (
    <View className="bg-white mb-4 p-4 rounded-2xl mx-4 shadow-lg">
      <View className="flex-row items-center space-x-4">
        <Image
          source={{ uri: profile_image }}
          style={{ width: 60, height: 60 }}
          className="rounded-full"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 font-serif">{name}</Text>
          <Text className="text-sm text-gray-900">{email}</Text>
          <Text className="text-xs text-yellow-600 mt-1 font-serif">Joined: {joined_date}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#FFA500" />
        <Text className="text-gray-600 mt-4 font-serif">Loading members...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* Search Bar */}
      <View className="px-5 pt-12 pb-2">
        <View className="flex-row items-center bg-gray-200 rounded-lg p-2 shadow-sm">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Search member here..."
            className="flex-1 ml-2 text-gray-800 text-base font-serif"
          />
        </View>
      </View>

      {/* Members List */}
      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.member_id.toString()}
        renderItem={({ item }) => (
          <ProfileCard
            name={item.name}
            email={item.email}
            joined_date={item.joined_date.split('T')[0]}
            profile_image={item.profile_image}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
