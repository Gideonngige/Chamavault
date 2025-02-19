import { SafeAreaView, ScrollView, Text, View, TouchableOpacity,Image } from 'react-native';
import { useRouter } from "expo-router";
import NavBar from "./NavBar";
export default function Home() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        {/* Header Section */}
        <View className="flex-row justify-between items-start mb-6 ">
          <View>
            <TouchableOpacity onPress={() => alert("This is your profile")}>
            <Image source={require('../assets/images2/profile.png')} style={{width:100, height:100, borderRadius:50}} />
            </TouchableOpacity>
          </View>
          <Text className="text-sm text-gray-900 font-bold">{"\n"}Welcome {"\n"} Gideon Ushindi</Text>
          <TouchableOpacity onPress={() => alert("All set!. No notifications")}>
          <Image source={require('../assets/images2/notification1.png')} style={{width:100, height:100, borderRadius:50}} />
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View className="flex-row justify-center mb-6">  {/* Center items in a row */}
      {/* First Card */}
      <View className="bg-yellow-600 p-4 rounded-lg flex-1 mr-2 items-center justify-center">  {/* Center content */}
        <Image
          source={require('../assets/images2/members.png')}
          className=""
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text className="text-gray-900 text-sm font-bold">Members</Text>
        <Text className="text-2xl font-bold text-gray-900">143</Text>
      </View>

      {/* Second Card */}
      <View className="bg-yellow-600 p-4 rounded-lg flex-1 ml-2 items-center justify-center">  {/* Center content */}
      <Image
          source={require('../assets/images2/saving.png')}
          className=""
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text className="text-gray-900 text-sm font-bold">Chama Saving</Text>
        <Text className="text-2xl font-bold text-gray-900">Ksh.200,000</Text>
      </View>
    </View>

        {/* Action Buttons */}
        <View className="flex-row mb-6 space-x-4">
          <TouchableOpacity className="flex-1 bg-yellow-600 py-3 rounded-lg" onPress={() => router.push("/saving")}>
            <Text className="text-white text-center font-semibold">Savings</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-yellow-600 py-3 rounded-lg" onPress={() => router.push("/NavBar")}>
            <Text className="text-white text-center font-semibold">Loans</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activities */}
        <Text className="text-lg font-bold mb-4">Recent activities</Text>
        
        <View className="bg-yellow-200 rounded-lg p-4">
          {/* Activity Item */}
          <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
            <View>
              <Text className="font-semibold text-gray-900">Paid Ksh.500</Text>
              <Text className="text-gray-500 text-sm">ChamaVault</Text>
            </View>
            <Text className="text-gray-500 text-sm">3:15 pm</Text>
          </View>

          <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
            <View>
              <Text className="font-semibold text-gray-900">Paid Ksh.500</Text>
              <Text className="text-gray-500 text-sm">ChamaVault</Text>
            </View>
            <Text className="text-gray-500 text-sm">3:15 pm</Text>
          </View>

          <View className="flex-row justify-between items-center py-3 border-b border-gray-200">
            <View>
              <Text className="font-semibold text-gray-900">Paid Ksh.500</Text>
              <Text className="text-gray-500 text-sm">ChamaVault</Text>
            </View>
            <Text className="text-gray-500 text-sm">3:15 pm</Text>
          </View>
        </View>

        
      </ScrollView>
      {/* Navigation Bar */}
      <View>
        <NavBar />
      </View>
    </SafeAreaView>
  );
}