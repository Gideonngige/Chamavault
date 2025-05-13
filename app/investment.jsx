import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Investment() {
  const [isLoading, setIsLoading] = useState(false);
  const [investmentImage, setInvestmentImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setInvestmentImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4 space-y-4">
        <Text className="text-2xl font-bold text-gray-800 font-serif">Create Investment</Text>

        {/* Image Picker */}
        <TouchableOpacity
          onPress={pickImage}
          className="bg-gray-200 p-4 rounded-lg items-center mt-5 mb-5 justify-center"
        >
          {investmentImage ? (
            <Image
              source={{ uri: investmentImage }}
              className="w-full h-48 rounded-lg"
              resizeMode="cover"
            />
          ) : (
            <Text className="text-gray-600 font-serif">Tap to pick an image</Text>
          )}
        </TouchableOpacity>

        {/* Name Field */}
        <TextInput
          className="border border-gray-300 mb-5 rounded-lg p-3 font-serif"
          placeholder="Investment Name"
          value={name}
          onChangeText={setName}
        />

        {/* Description Field */}
        <TextInput
          className="border border-gray-300 mb-5 rounded-lg p-3 font-serif"
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        {/* Minimum Amount */}
        <TextInput
          className="border border-gray-300 mb-5 rounded-lg p-3 font-serif"
          placeholder="Minimum Amount (KES)"
          keyboardType="numeric"
          value={minAmount}
          onChangeText={setMinAmount}
        />

        {/* Interest Rate */}
        <TextInput
          className="border border-gray-300 mb-5 rounded-lg p-3 font-serif"
          placeholder="Interest Rate (%)"
          keyboardType="numeric"
          value={interestRate}
          onChangeText={setInterestRate}
        />

        {/* Duration */}
        <TextInput
          className="border border-gray-300 mb-5 rounded-lg p-3 font-serif"
          placeholder="Duration (days/months)"
          value={duration}
          onChangeText={setDuration}
        />

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-yellow-600 p-4 rounded-lg items-center"
          onPress={() => {
            // Handle investment creation logic
            console.log({ name, description, minAmount, interestRate, duration, investmentImage });
          }}
        >
          <Text className="text-white font-bold font-serif">Create Investment</Text>
        </TouchableOpacity>
      </ScrollView>

      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
    </SafeAreaView>
  );
}
