import { useState } from 'react';
import {View, Text, TouchableOpacity, FlatList, Image, TextInput, StatusBar, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Members(){  
    
      const [members, setMembers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [search, setSearch] = useState('');
      const [filteredMembers, setFilteredMembers] = useState([]);

      useEffect(() => {
        // Fetch data from the API using Axios
        const getdata = async() => {
          const email = await AsyncStorage.getItem('email');
          const chama_id = await AsyncStorage.getItem('chama');
          axios.get(`https://backend1-1cc6.onrender.com/members/${email}/${chama_id}/`)
          .then((response) => {
            setMembers(response.data);
            setFilteredMembers(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
        }
        getdata();
      }, []);

       // for searching
       useEffect(() => {
        if (Array.isArray(members)) { // Ensure members is an array
          setFilteredMembers(
            members.filter((member) =>
              member.name?.toLowerCase().includes(search.toLowerCase()) // Safe check for name
            )
          );
        } else {
          setFilteredMembers([]); // Set an empty array if members is not valid
        }
      }, [search, members]);
      ;
      // end of searching

      const ProfileCard = ({ name, email, joined_date }) => {
        return (
          <View className="bg-yellow-600 mb-6 p-4 rounded-2xl shadow-lg w-80 mx-auto">
            {/* Profile Image */}
            <View className="items-center">
            <Image source={require('../assets/images2/profile3.png')} style={{width:50, height:50}} className='rounded-full'/>
            </View>
      
            {/* User Info */}
            <View className="mt-4 items-center">
              <Text className="text-xl font-bold text-gray-900">{name}</Text>
              <Text className="text-gray-900">{email}</Text>
              <Text className='mt-2 mb-2 mr-2 font-bold text-gray-300'>Joined: {joined_date}</Text>
            </View>
          </View>
        );
      };

      if (loading) {
        return <ActivityIndicator size="large" color="#FFA500" />;
      }

     
    
    return(
        
        <SafeAreaView className="flex-1 bg-white">
          {/* search bar */}
          <View className="flex-1 bg-white justify-center items-center mt-10 w-full p-5 font-sans">
        <View className="flex-row items-center bg-gray-300 rounded-lg h-10 p-2 w-full mb-2">
        <Ionicons name="search" size={20} color="gray" />
            <TextInput 
            value={search}
            onChangeText={(text) => setSearch(text)}
            placeholder="Search member here..."
            className="flex-1 h-10  text-gray-900 text-lg p-2 decoration-none"
            />
        </View>
        </View>
        {/* end of search bar */}
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
        

        {/* members part */}
      <FlatList
        data={filteredMembers} // Array of data
        keyExtractor={(item) => item.member_id.toString()} // Unique key for each item
        renderItem={({ item }) => <ProfileCard name={item.name} email={item.email} joined_date={item.joined_date} />} // How each item is displayed
        showsVerticalScrollIndicator={false} // Hides the scrollbar
        listMode="SCROLLVIEW"
      />
        {/* end of members part */}
            
        </View>
        </ScrollView>
        <StatusBar
            barStyle="dark-content" // or "light-content" depending on your background
            backgroundColor="transparent"
            translucent={true}
          />
        </SafeAreaView>
    );
}