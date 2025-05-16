import {Text, View, StatusBar, TextInput, TouchableOpacity,SafeAreaView, ScrollView, Image } from "react-native";
import "../global.css";
import { useRouter } from "expo-router";


export default function Index() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-4 mb-0">
    <View className="flex-1 bg-white justify-center items-center p-0 font-sans">
      <Image source={require('../assets/images2/welcome.png')} className="w-full h-56 mb-0" style={{ resizeMode:"contain", height:300}}/>
      <Text className="text-2xl font-bold text-gray-800 mb-4 font-serif">Save, Borrow, Invest</Text>
      <Text className="text-base pb-5 text-center font-serif">Chamavault is a digital platform for Chamas to save, borrow and invest money.</Text>
    
       <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-full mt-8" onPress={() => router.push("/register")}>
        <Text className="text-white text-center font-semibold text-lg font-serif">Create new account</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-full bg-green-600 p-4 rounded-full mt-8" onPress={() => router.push("/login")}>
        <Text className="text-white text-center font-semibold text-lg font-serif">I already have an account</Text>
      </TouchableOpacity>
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