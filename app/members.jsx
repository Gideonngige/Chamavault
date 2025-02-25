import { useState } from 'react';
import {View, Text, TouchableOpacity, FlatList, Image, TextInput, StatusBar, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect } from 'react';
import axios from 'axios';

export default function Members(){  
    
      const [members, setMembers] = ([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchMembers = async () => {
            
          try {
            const API_URL = "https://backend1-1cc6.onrender.com/members/gideonushindi94@gmail.com/@gideon/";
            
            const response = await axios.get(API_URL);
            // const data = await response.json();
            const data = response.data;
            alert(data[0]);
            setMembers(data[0]);
            alert("Hello2");
          } catch (error) {
            console.error("Error fetching members:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchMembers();
      }, []);



      const Member = ({name, savings, joined}) => (
        <View className='bg-yellow-600 p-0 w-full rounded-lg mt-5 flex flex-row justify-around'>
                <View className='w-1/8 m-2'>
                    <Image source={require('../assets/images2/profile.png')} style={{width:50, height:50}} className='rounded-full'/>
                </View>
                <View>
                    <Text className='mt-5 font-bold text-lg'>{name}</Text>
                    <Text className='mt-2 font-bold'>Previous savings KES.{savings}</Text>
                    <Text className='mt-2 mb-2 font-bold text-gray-300'>Joined: {joined}</Text>
                </View>
                <MaterialIcons name="verified" size={24} color="black" />
                
            </View>

      );

      if (loading) {
        return <ActivityIndicator size="large" color="#FFA500" />;
      }
    
    return(
        
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
        {/* search bar */}
        <View className="w-full flex-row items-center bg-gray-300 rounded-lg px-3 mb-6">
        <Ionicons name="search" size={20} color="gray" />
            <TextInput 
            placeholder="Search member here..."
            className="flex-1 h-10 p-2 text-gray-900 text-lg"
            />
        </View>
        {/* end of search bar */}

        {/* members part */}
      <FlatList
        data={members} // Array of data
        keyExtractor={(item) => item.id} // Unique key for each item
        renderItem={({ item }) => <Member name={item.name} savings={item.savings} joined={item.joined} />} // How each item is displayed
        showsVerticalScrollIndicator={false} // Hides the scrollbar
      />
        {/* end of members part */}
            

        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}