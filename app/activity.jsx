import { SafeAreaView, ScrollView, Text, View, TouchableOpacity,Image, ImageBackground, StatusBar } from 'react-native';

export default function Invest() {
  return (
    <SafeAreaView className="flex-1 bg-white">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='mb-5'>
      <View className='text-xl m-5'><Text>January</Text></View>
      <View className='text-xl m-5'><Text>February</Text></View>
      <View className='text-xl m-5'><Text>March</Text></View>
      <View className='text-xl m-5'><Text>April</Text></View>
      <View className='text-xl m-5'><Text>May</Text></View>
      <View className='text-xl m-5'><Text>June</Text></View>
      <View className='text-xl m-5'><Text>July</Text></View>
      <View className='text-xl m-5'><Text>August</Text></View>
      <View className='text-xl m-5'><Text>September</Text></View>
      <View className='text-xl m-5'><Text>October</Text></View>
      <View className='text-xl m-5'><Text>November</Text></View>
      <View className='text-xl m-5'><Text>December</Text></View>
    </ScrollView>
      <ScrollView className="p-4">
        <View className="flex-row justify-between items-start mb-6 ">
        <StatusBar/>  
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
      </ScrollView>
      <StatusBar
      barStyle="dark-content" // or "light-content" depending on your background
      backgroundColor="transparent"
      translucent={true}
      />
      
    </SafeAreaView>
  );
}