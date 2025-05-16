import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdminNotification(){
  const navigation = useNavigation();
  const gotToNotification =async()=>{
      const selected_chama = await AsyncStorage.getItem('selected_chama');
      if(selected_chama == "No Chama"){
        alert("You must join a chama first");
      }
      else{
        navigation.navigate('appliedloans')
      }
  
    }
  return (
    <TouchableOpacity
      style={{ marginRight: 10 }}
      onPress={gotToNotification}
    >
      <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};
