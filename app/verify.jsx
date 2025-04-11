import {Text, View, StatusBar, TextInput, TouchableOpacity, Image } from "react-native";
import "../global.css";
import { useRouter } from "expo-router";


export default function Verify() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
        <ScrollView nestedScrollEnabled={true} className="p-4 mb-20">
    <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
      <Image source={require('../assets/images2/verify.png')} className="w-full h-56 mb-4" style={{ resizeMode:"contain", height:300}}/>
      <Text className="text-3xl font-bold text-gray-800 mb-6">Enter OTP</Text>
      <Text className="text-base pb-5 text-center">A 4 digit otp has been sent to <span>johndoe@gmail.com</span></Text>
      <View className="flex flex-row gap-4">
  <TextInput 
    placeholder=""
    keyboardType="numeric"
    className="size-20 p-4 bg-white rounded-lg shadow-sm border border-yellow-600 text-lg text-center"
  />
  <TextInput 
    placeholder=""
    keyboardType="numeric"
    className="size-20 p-4 bg-white rounded-lg shadow-sm border border-yellow-600 text-lg text-center"
  />
  <TextInput 
    placeholder=""
    keyboardType="numeric"
    className="size-20 p-4 bg-white rounded-lg shadow-sm border border-yellow-600 text-lg text-center"
  />
  <TextInput 
    placeholder=""
    keyboardType="numeric"
    className="size-20 p-4 bg-white rounded-lg shadow-sm border border-yellow-600 text-lg text-center"
  />
</View>
<TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg mt-10" onPress={() => router.push("/home")}>
        <Text className="text-white text-center font-semibold text-lg">Verify</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
        <NavBar/>
        <StatusBar
          barStyle="dark-content" // or "light-content" depending on your background
          backgroundColor="transparent"
          translucent={true}
          />
        
        </SafeAreaView>
  );
}