import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Optional gradient effect
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Creditscore() {
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
      const updatecreditscore = async () => {
        setIsLoading(true);
        try{
          const chama_id = await AsyncStorage.getItem('chama_id');
          const member_id = await AsyncStorage.getItem('member_id');
          const url = `https://backend1-1cc6.onrender.com/creditscoreapi/${member_id}/${chama_id}/`;
          const response = await axios.get(url);
          if(response.status === 200){
            setScore(response.data.credit_score)
          }
        }
        catch(error){
          console.error("Error fetching chamas:", error);
        }
        finally{
            setIsLoading(false);
        }
  
      }
      updatecreditscore();
    },[]);
    // end of fetch member chamas

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <ScrollView className="px-4 py-6">
        <View className="flex-1 justify-center items-center space-y-8">
          {/* Header */}
          <Text className="text-2xl font-extrabold text-gray-800">My Credit Score</Text>

          {/* Circular Score Display */}
          <LinearGradient
            colors={['#facc15', '#fbbf24']}
            className="w-72 h-72 rounded-full justify-center items-center shadow-2xl"
          >
            <View className="bg-gray-900 w-56 h-56 rounded-full justify-center items-center shadow-inner">
              <View className="bg-white w-36 h-36 rounded-full justify-center items-center shadow-inner">
     <Text className="text-3xl font-bold text-yellow-600">+{isLoading ? "..." : `${score}`}</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Tip / Status */}
          <Text className="text-center text-base text-gray-500 max-w-xs mt-4">
            A higher score increases your chances of receiving larger loans with better terms.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
