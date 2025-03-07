import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity,Image, ImageBackground, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { push } from 'expo-router/build/global-state/routing';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';


export default function Schedule() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Chama1', value: 'Chama1' },
      { label: 'Chama2', value: 'Chama2' },
      { label: 'Chama3', value: 'Chama3' },
    ]);
  const handleSchedule = async () => {
    router.push('topupinvestment/');
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
               <Text className="w-full text-lg font-bold">Area of investment</Text>
               <DropDownPicker
               open={open}
               value={value}
               items={items}
               setOpen={setOpen}
               setValue={setValue}
               setItems={setItems}
               placeholder="Select a chama"
               style={{borderColor: '#ca8a04',borderWidth: 2,  
               }}
               listMode="SCROLLVIEW"
               />

               <Text className="w-full text-lg mt-4 font-bold">Amount to invest</Text>
               <TextInput 
               placeholder="Amount to invest"
               value=""
               onChangeText=""
               className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
                />
                <Text className="w-full text-lg font-bold">Duration of investment</Text>
               <TextInput 
               placeholder="duration of investment"
               value=""
               onChangeText=""
               className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
                />

                <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={handleSchedule}>
                {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center mt-4 font-semibold text-lg">Top Up</Text> }
                </TouchableOpacity>
            <StatusBar/>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}