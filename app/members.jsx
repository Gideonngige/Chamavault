import { useState } from 'react';
import {View, Text, TouchableOpacity, FlatList, Image, TextInput, StatusBar, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect } from 'react';
import axios from 'axios';

export default function Members(){  
    
      const [members, setMembers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [search, setSearch] = useState('');
      const [filteredMembers, setFilteredMembers] = useState([]);

      useEffect(() => {
        // Fetch data from the API using Axios
        axios.get('https://backend1-1cc6.onrender.com/members/gtechcompany01@gmail.com/@testuser/')
          .then((response) => {
            setMembers(response.data);
            setFilteredMembers(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);

       // for searching
       useEffect(() => {
        setFilteredMembers(
          members.filter((member) =>
            member.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      }, [search, members]);
      // end of searching



      const Member = ({name, email, joined_date}) => (
        <View className='bg-yellow-600 p-0 w-full rounded-lg mt-5 flex flex-row justify-around'>
                <View className='w-1/8 m-2'>
                    <Image source={require('../assets/images2/profile.png')} style={{width:50, height:50}} className='rounded-full'/>
                </View>
                <View>
                    <Text className='mt-5 mr-2 font-bold text-lg'>{name}</Text>
                    <Text className='mt-2 mr-2 font-bold'>Email: {email}</Text>
                    <Text className='mt-2 mb-2 mr-2 font-bold text-gray-300'>Joined: {joined_date}</Text>
                </View>
                <MaterialIcons name="verified" size={24} color="black" />
                
            </View>

      );

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
        renderItem={({ item }) => <Member name={item.name} email={item.email} joined_date={item.joined_date.split("T")[0]} />} // How each item is displayed
        showsVerticalScrollIndicator={false} // Hides the scrollbar
        listMode="SCROLLVIEW"
      />
        {/* end of members part */}
            

        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}