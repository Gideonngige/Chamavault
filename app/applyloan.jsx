import { useState } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import { useRouter } from "expo-router";
import DropDownPicker from 'react-native-dropdown-picker';

export default function Chama(){
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Long Term Loan', value: 'LTL' },
      { label: 'Short Term Loan', value: 'STL' },
    ]);
    
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
        <Text className="text-lg w-full font-bold">Type of loan</Text>
       <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select type of loan"
        style={{borderColor: '#ca8a04',borderWidth: 2,  
        }}
        className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
        listMode="SCROLLVIEW"
      />
      <Text className="w-full mt-4 text-lg font-bold">Enter loan amount</Text>
      <TextInput 
      placeholder="Enter loan amount"
      value=""
      onChangeText=""
      keyboardType="numeric"
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className="w-full text-lg font-bold">Repayment period</Text>
      <TextInput 
      placeholder="Repayment period"
      value=""
      onChangeText=""
      keyboardType="numeric"
      className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg"
      />
      <Text className='text-yellow-600 font-medium'>Our interest rate is 3% - 7% per annum</Text>
      <TouchableOpacity className="w-full mt-2 bg-yellow-600 text-white p-4 rounded-lg font-bold text-lg" onPress={() => {}}>
        <Text className="text-white text-center font-semibold text-lg">Apply Loan</Text>
      </TouchableOpacity>
      <Text>Read our terms & conditions <TouchableOpacity>
        <Text className='text-yellow-600 underline'>here</Text>
        </TouchableOpacity></Text>
      
            

        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}