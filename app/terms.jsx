import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export default function Terms() {
  const navigation = useNavigation();
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    router.push('applyloan');
  };

  const handleDecline = () => {
    Toast.show({
      type: "info",
      text1: "Terms Declined",
      text2: "You must accept the terms to use ChamaVault",
    });
    setTimeout(() => {
      router.push('');
    }, 3000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <View className="flex-1">
          
            <Text className="text-lg font-bold mb-2 font-serif">Introduction</Text>
            <Text className="text-sm mb-2 font-serif">Welcome the user and explain the purpose of the agreement.</Text>
            <Text className="text-lg font-bold mb-2 font-serif">User Responsibilities</Text>
            <Text className="text-sm mb-2 font-serif">What users can and cannot do (e.g., sharing login credentials, misusing features).</Text>
            <Text className="text-lg font-bold mb-2 font-serif">Account and Membership</Text>
            <Text className="text-sm mb-2 font-serif">Explain user registration, membership in a chama, and roles.</Text>
            <Text className="text-lg font-bold mb-2 font-serif">Loans and Investments</Text>
            <Text className="text-sm mb-2 font-serif">Define rules for applying, repaying, and investing through the app.</Text>
            <Text className="text-sm mb-2 font-serif">Interest for loans is as follows: Short term loans is 30%, Long Term loan is 1%. Short term loan are repaid within a duration of 6 months, failure to which there is an additional penalty of 10% each month.</Text>
            <Text className="text-lg font-bold mb-2 font-serif">Data and Privacy</Text>
            <Text className="text-sm mb-2 font-serif">How personal and financial data is handled (link to your Privacy Policy).</Text>
            <Text className="text-lg font-bold mb-2 font-serif">Usage Limitations</Text>
            <Text className="text-sm mb-2">For example, you may not use the app for fraud, bots, or unlawful activity.</Text>
            <Text className="text-lg font-bold mb-2 font-serif">Liability and Risk Disclaimer</Text>
            <Text className="text-sm mb-2 font-serif">Limit your responsibility for user actions or system failures.</Text>
            <Text className="text-lg font-bold mb-2 font-serif">Changes to Terms</Text>
            <Text className="text-sm mb-2">Inform users you may update T&Cs and how they’ll be notified.</Text>
            <Text className="text-lg font-bold mb-2 font-serif">Acceptance</Text>
            <Text className="text-sm mb-2 font-serif">Let users know that using the app means they accept these terms.</Text>
          

          {/* Bottom Buttons */}
          <View className="absolute bottom-0 left-0 right-0 flex-row justify-between px-4 py-3 bg-white">
            <TouchableOpacity className="bg-yellow-600 flex-1 mr-2 p-4 rounded-lg" onPress={handleDecline}>
              <Text className="text-white text-center font-semibold text-lg font-serif">Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-yellow-600 flex-1 ml-2 p-4 rounded-lg" onPress={handleAccept}>
              <Text className="text-white text-center font-semibold text-lg font-serif">Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
}
