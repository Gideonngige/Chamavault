import { SafeAreaView, ScrollView, Text, View, TouchableOpacity,Image, ImageBackground } from 'react-native';
import { useRouter } from "expo-router";
// import { DataTable } from "react-native-paper";
import NavBar from "./NavBar";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { push } from 'expo-router/build/global-state/routing';


export default function Invest() {
  const router = useRouter();
  const data = [
    { id: "1", name: "John Doe", age: 28, city: "New York" },
    { id: "2", name: "Jane Smith", age: 32, city: "Los Angeles" },
    { id: "3", name: "Michael Johnson", age: 24, city: "Chicago" },
  ];
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-row justify-between items-start mb-6 ">
        <View className="w-full p-4 bg-white">
          {/* welcome part */}
          <Text className="text-3xl font-bold text-gray-800 mb-0">Welcome back,John</Text>
          <Text className='text-lg font-bold text-gray-800 mt-0'>Time to invest your money</Text>
          <View className="p-0">
            {/* loan image part */}
      <ImageBackground
        source={require('../assets/images2/invest.png')}
        className="w-full h-48 rounded-lg overflow-hidden justify-center"
        style={{ resizeMode: 'contain', width: '100%', height: 200 }}
      >
        <View className="p-5">
          <Text className="text-xl font-bold text-gray-900">Your Investment</Text>
          <Text className="text-2xl font-bold text-gray-800">KES. 5,000</Text>
        </View>
      </ImageBackground>

      {/* top up part */}
      <View className="bg-yellow-600 p-4 m-2 w-full rounded-lg mt-5 flex flex-row justify-around">
        <TouchableOpacity
          className="bg-white py-3 px-5 rounded-xl items-center"
          onPress={() => router.push("poll/")}
        >
          <FontAwesome6 name="add" size={24} color="black" />
          <Text className="text-gray-900 font-medium mt-1">Top up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white py-3 px-5 rounded-xl items-center"
          onPress={() => router.push('/chama')}
        >
          <FontAwesome6 name="money-bills" size={24} color="black" />
          <Text className="text-gray-900 font-medium mt-1">Withdraw</Text>
        </TouchableOpacity>
      </View>
      {/* real estate investment */}
      <View className='w-full p-4 m-2 bg-yellow-600 rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold'>John Does</Text>
                    <Text className='font-bold'>12/02/2024</Text>
                </View>
                <Text className='font-bold'>Real Estate</Text>
                <Text className='m-3'>Amount: KES.5000</Text>
                <Text className='m-3'>Intrest rate: 5%</Text>
                <Text className='m-3'>Intrest earned: KES.400</Text>
       </View>
       {/* end of real estate investment */}

       {/* stocks investment */}
      <View className='w-full p-4 m-2 bg-yellow-600 rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold'>John Does</Text>
                    <Text className='font-bold'>12/03/2024</Text>
                </View>
                <Text className='font-bold'>Stocks</Text>
                <Text className='m-3'>Amount: KES.5000</Text>
                <Text className='m-3'>Intrest rate: 5%</Text>
                <Text className='m-3'>Intrest earned: KES.400</Text>
       </View>
       {/* end of stocks investment */}


       {/* activity part */}
       <View className="flex-row justify-between bg-white p-3 rounded-lg">
       <Text className='font-bold'>Activity</Text>
       <Text className='font-bold'><TouchableOpacity onPress={() => router.push('activity/')}><Text>View All</Text></TouchableOpacity></Text>

       </View>
      <View className='w-full p-4 m-2 bg-yellow-600 rounded-lg shadow-lg'>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold'>Interest paid</Text>
                    <Text className='font-bold'>+0.55</Text>
                </View>
                <Text className='font-bold mb-5'>12/08/2024</Text>
                <View className="flex-row justify-between bg-white p-3 rounded-lg">
                    <Text className='font-bold'>Interest paid</Text>
                    <Text className='font-bold'>+0.55</Text>
                </View>
                <Text className='font-bold mb-5'>12/08/2024</Text>
       </View>
       {/* activity part */}

      


      </View>
        </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}