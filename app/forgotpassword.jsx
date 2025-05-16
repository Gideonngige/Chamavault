import {
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    setIsLoading(true);
    try {
      if (email === "") {
        Toast.show({
          type: "error",
          text1: "Missing Email",
          text2: "Please enter your email address.",
        });
      } else {
        const url = `https://backend1-1cc6.onrender.com/postReset/${email}/`;
        const response = await axios.get(url);
        Toast.show({
          type: "success",
          text1: "Reset Email Sent",
          text2: response.data.message,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Reset Failed",
        text2: "Please check your connection or email format.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-6 pt-10 bg-white"
        >
          <View className="items-center">
            <Image
              source={require("../assets/images2/logo.png")}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                marginBottom: 20,
              }}
            />
            <Text className="text-2xl font-bold text-yellow-600 font-lato mb-2">
              ChamaVault
            </Text>
            <Text className="text-gray-700 font-lato text-center mb-6 text-base">
              Enter your registered email address to reset your password.
            </Text>
          </View>

          <View className="w-full mb-4">
            <Text className="text-base font-semibold font-lato mb-2">
              Email Address
            </Text>
            <TextInput
              placeholder="e.g. user@example.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              className="w-full p-4 bg-white rounded-xl border border-yellow-600 text-gray-800 text-base font-lato"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            onPress={handleForgotPassword}
            className="bg-yellow-600 rounded-xl p-4 mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-center text-white font-semibold text-base font-lato">
                Send Reset Link
              </Text>
            )}
          </TouchableOpacity>

          <Toast />
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
    </SafeAreaView>
  );
}
