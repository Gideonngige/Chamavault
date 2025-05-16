import { Text, View, StatusBar, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import "../global.css";
import { useRouter } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Asset } from 'expo-asset';
import Ionicons from "react-native-vector-icons/Ionicons";


export default function Register() {
    const router = useRouter();
    const [fullname, setFullname] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    useEffect(() => {
    const loadDefaultImage = async () => {
        const asset = Asset.fromModule(require('../assets/images2/profile3.png'));
        await asset.downloadAsync();
        setImage(asset.localUri || asset.uri);
    };

    if (!image) {
        loadDefaultImage();
    }
}, []);


    // Image picker
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Permission to access media is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Handle registration
    const handleRegister = async () => {
        if (fullname === "" || phonenumber === "" || email === "" || password === "" || confirmPassword === "") {
            Toast.show({
                type: "error",
                text1: "Empty fields",
                text2: "Please fill in all fields",
                position: "center",
            });
            return;
        }

         // Password Validation
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordRegex.test(password)) {
        Toast.show({
            type: "error",
            text1: "Weak password",
            text2: "Password must be at least 6 characters, include a number and a special character.",
            text2NumberOfLines: 5,
            position: "center",
        });
        return;
    }

        if (password !== confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Password mismatch",
                text2: "Passwords do not match",
                position: "center",
            });
            return;
        }

        setIsLoading(true);

        try {
            const url = "https://backend1-1cc6.onrender.com/postsignUp/";
            const formData = new FormData();

            formData.append("name", fullname);
            formData.append("email", email);
            formData.append("phone_number", phonenumber);
            formData.append("password", password);

            if (image) {
                const fileName = image.split('/').pop();
                const fileType = fileName.split('.').pop();

                formData.append("profile_image", {
                    uri: image,
                    name: fileName,
                    type: `image/${fileType}`,
                });
            }

            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Registration successful!",
                position: "center",
            });

            if (response.data.message === "Successfully registered") {
                router.push("login/");
            } else {
                Toast.show({
                    type: "error",
                    text1: "Registration failed",
                    text2: response.data.message,
                    position: "center",
                });
            }

        } catch (error) {
            const message = error?.response?.data?.message || error.message;
            Toast.show({
                type: "error",
                text1: "Error",
                text2: message,
                position: "center",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView nestedScrollEnabled={true} className="p-4">
                <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
                    <TouchableOpacity onPress={pickImage}>
                        {image ? (
                            <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 75, borderWidth: 3, borderColor: '#fff' }} />
                        ) : (
                            <Image source={require('../assets/images2/profile3.png')} style={{ width: 150, height: 150, borderRadius: 75, borderWidth: 3, borderColor: '#fff' }} />
                        )}
                    </TouchableOpacity>
                    <Text className="text-md font-lato text-gray-500 mt-2">Tap image to upload profile picture</Text>

                    <Text className="w-full text-lg font-bold font-lato mt-5">Enter your full name</Text>
                    <TextInput
                        placeholder="e.g John Doe"
                        value={fullname}
                        onChangeText={setFullname}
                        className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg font-lato"
                    />

                    <Text className="w-full text-lg font-bold font-lato">Enter your phonenumber</Text>
                    <TextInput
                        placeholder="e.g 0712345678"
                        value={phonenumber}
                        onChangeText={setPhonenumber}
                        className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg font-lato"
                    />

                    <Text className="w-full text-lg font-bold font-lato">Enter your email</Text>
                    <TextInput
                        placeholder="e.g johndoe@example.com"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        className="w-full p-4 bg-white rounded-lg shadow-sm mb-4 border border-yellow-600 text-gray-400 text-lg font-lato"
                    />

                    <View className="w-full">
      {/* Password Field */}
      <Text className="w-full text-lg font-bold font-lato mb-2">Enter your password</Text>
      <View className="relative mb-6">
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          className="w-full p-4 pr-12 bg-white rounded-lg shadow-sm border border-yellow-600 text-gray-800 text-lg font-lato"
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute right-4 top-4"
        >
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Field */}
      <Text className="w-full text-lg font-bold font-lato mb-2">Confirm your password</Text>
      <View className="relative mb-6">
        <TextInput
          placeholder="Confirm your password"
          secureTextEntry={!isConfirmVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="w-full p-4 pr-12 bg-white rounded-lg shadow-sm border border-yellow-600 text-gray-800 text-lg font-lato"
        />
        <TouchableOpacity
          onPress={() => setIsConfirmVisible(!isConfirmVisible)}
          className="absolute right-4 top-4"
        >
          <Ionicons
            name={isConfirmVisible ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
    </View>

                    <TouchableOpacity className="w-full bg-green-600 p-4 rounded-lg" onPress={handleRegister}>
                        {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-lato font-semibold text-lg">Register</Text>}
                    </TouchableOpacity>

                    <View className="flex-row justify-center mt-4 mb-6">
                        <Text className="text-lg font-lato">Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push("/login")}>
                            <Text className="text-lg text-yellow-600 font-lato mb-40">Login</Text>
                        </TouchableOpacity>
                    </View>

                    <Toast />
                    <StatusBar />
                </View>
            </ScrollView>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        </SafeAreaView>
    );
}
