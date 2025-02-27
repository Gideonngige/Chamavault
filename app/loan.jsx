import { SafeAreaView, ScrollView, Text, View, TouchableOpacity,Image, ImageBackground } from 'react-native';
import { useRouter } from "expo-router";
// import { DataTable } from "react-native-paper";
import NavBar from "./NavBar";
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Loans() {
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
          <Text className='text-lg font-bold text-gray-800 mt-0'>Time to borrow money</Text>
          <View className="p-4">
            {/* loan image part */}
      <ImageBackground
        source={require('../assets/images2/loan.png')}
        className="w-full h-48 rounded-lg overflow-hidden justify-center"
        style={{ resizeMode: 'contain', width: '100%', height: 200 }}
      >
        <View className="p-5">
          <Text className="text-xl font-bold text-gray-900">Your Loans</Text>
          <Text className="text-2xl font-bold text-gray-800">KES. 5,000</Text>
        </View>
      </ImageBackground>

      {/* top up part */}
      <View className="bg-yellow-600 p-4 rounded-lg mt-5 flex flex-row justify-around">
        <TouchableOpacity
          className="bg-white py-3 px-5 rounded-xl items-center"
          onPress={() => router.push("applyloan/")}
        >
          <FontAwesome6 name="add" size={24} color="black" />
          <Text className="text-gray-900 font-medium mt-1">Take Loan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white py-3 px-5 rounded-xl items-center"
          onPress={() => router.push("appliedloans/")}
        >
          <FontAwesome6 name="money-bills" size={24} color="black" />
          <Text className="text-gray-900 font-medium mt-1">Pay Loan</Text>
        </TouchableOpacity>
      </View>

      {/* saving part */}
      <View>
        <Text className='font-bold mt-5'>My savings</Text>
        <View className='bg-yellow-600 rounded-lg'>
        <View className='bg-yellow-600 p-4 rounded-lg mt-5 flex flex-row justify-around'>
          <View>
            <Image source={require('../assets/images2/logo.png')} style={{width:40, height:40}} className='rounded-full'/>
          </View>
          <View>
            <Text className='text-2xl font-bold'>Chamavault</Text>
            <Text>saving for future</Text>
          </View>
        </View>
        <Text className='ml-5 font-bold'>John Doe</Text>
        <View className='p-2 mt-0 flex flex-row justify-around'>
          <View>
            <Text>Your savings</Text>
          </View>
          <View>
            <Text className='font-bold'>KES.80000</Text>
          </View>
        </View>
        <View className='p-2 mt-0 flex flex-row justify-around'>
          <View>
            <Text>Annual rate</Text>
          </View>
          <View>
            <Text className='font-bold'>15%</Text>
          </View>
        </View>
        <View className='p-2 mt-0 flex flex-row justify-around'>
          <View>
            <Text>Penality</Text>
          </View>
          <View>
            <Text className='font-bold'>KES.0.00</Text>
          </View>
        </View>
        </View>

        {/* your activity part  */}
        <Text className='ml-1 font-bold mt-5'>Your activity</Text>
        <View className='bg-yellow-600 p-2 mt-0 mb-2 flex flex-row justify-around'>
          <View>
            <Text>Borrowed</Text>
            <Text>Chamavault</Text>
          </View>
          <View>
            <Text className='font-bold'>KES.80000</Text>
            <Text className='font-bold'>3:15 pm</Text>
          </View>
        </View>
        <View className='bg-yellow-600 p-2 mt-0 mb-2 flex flex-row justify-around'>
          <View>
            <Text>Borrowed</Text>
            <Text>Chamavault</Text>
          </View>
          <View>
            <Text className='font-bold'>KES.80000</Text>
            <Text className='font-bold'>3:15 pm</Text>
          </View>
        </View>
        <View className='bg-yellow-600 p-2 mt-0 mb-2 flex flex-row justify-around'>
          <View>
            <Text>Borrowed</Text>
            <Text>Chamavault</Text>
          </View>
          <View>
            <Text className='font-bold'>KES.80000</Text>
            <Text className='font-bold'>3:15 pm</Text>
          </View>
        </View>
        
      </View>



      </View>
        </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}