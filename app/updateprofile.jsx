import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity,Image, ImageBackground, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { push } from 'expo-router/build/global-state/routing';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';



export default function UpdateProfile() {
   const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
        <View className="items-center mb-8">
        <Image 
        source={require('../assets/images2/profile3.png')}
        style={{width: 150, height: 150, borderRadius: 75, borderWidth: 3,borderColor: '#fff',resizeMode: 'cover',
        }}
      />
    </View>
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