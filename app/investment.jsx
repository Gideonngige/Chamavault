import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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

  // start of function to send investment
  const postInvestment = async () => {
    const BACKEND_URL = "https://backend1-1cc6.onrender.com/new_investment/";
    const chama_id = await AsyncStorage.getItem('chama_id');
  if (!name || !description || !minAmount || !interestRate || !duration) {
    alert("Please fill in all fields.");
    return;
  }

  const formData = new FormData();

  formData.append("chama_id", chama_id); // Replace with actual chama_id or dynamic one
  formData.append("investment_name", name);
  formData.append("description", description);
  formData.append("min_amount", minAmount);
  formData.append("interest_rate", interestRate);
  formData.append("duration_months", duration);

  if (investmentImage) {
    const fileName = investmentImage.split("/").pop();
    const fileType = fileName.split(".").pop();

    formData.append("image", {
      uri: investmentImage,
      name: fileName,
      type: `image/${fileType}`,
    });
  }
  
  setIsLoading(true);
  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = await response.json();
    if (response.ok) {
      alert("Investment created successfully!");
      // Reset form
      setName("");
      setDescription("");
      setMinAmount("");
      setInterestRate("");
      setDuration("");
      setInvestmentImage(null);
    } else {
      alert("Error: " + data.message);
    }
  } catch (error) {
    alert("Failed to create investment: " + error.message);
  } finally {
    setIsLoading(false);
  }
};

  // end of function to send investment

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4 space-y-4">
        <Text className="text-2xl font-bold text-gray-800 font-lato">Create Investment</Text>

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
            <Text className="text-gray-600 font-lato">Tap to pick an image</Text>
          )}
        </TouchableOpacity>

        {/* Name Field */}
        <TextInput
          className="border border-gray-300 mb-5 rounded-lg p-3 font-lato"
          placeholder="Investment Name"
          value={name}
          onChangeText={setName}
        />

        {/* Description Field */}
        <TextInput
          className="border border-gray-300 mb-5 rounded-lg p-3 font-lato"
          placeholder="Description"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        {/* Minimum Amount */}
        <TextInput
          className="border border-gray-300 mb-5 rounded-lg p-3 font-lato"
          placeholder="Minimum Amount (KES)"
          keyboardType="numeric"
          value={minAmount}
          onChangeText={setMinAmount}
        />

        {/* Interest Rate */}
        <TextInput
          className="border border-gray-300 mb-5 rounded-lg p-3 font-lato"
          placeholder="Interest Rate (%)"
          keyboardType="numeric"
          value={interestRate}
          onChangeText={setInterestRate}
        />

        {/* Duration */}
        <TextInput
          className="border border-gray-300 mb-5 rounded-lg p-3 font-lato"
          placeholder="Duration (days/months)"
          value={duration}
          onChangeText={setDuration}
        />

        {/* Submit Button */}
        <TouchableOpacity
        className="bg-yellow-600 p-4 rounded-lg items-center mb-20"
        onPress={postInvestment}
        >
        <Text className="text-white font-bold font-lato">
        {isLoading ? "Submitting..." : "Create Investment"}
        </Text>
        </TouchableOpacity>
      </ScrollView>

      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
    </SafeAreaView>
  );
}
