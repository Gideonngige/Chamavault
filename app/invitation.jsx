import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Image, ActivityIndicator, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import Toast from "react-native-toast-message";
import { Share } from 'react-native';


export default function Invitation(){ 
    const [isLoading, setIsLoading] = useState(false); 

    // share app function
    const shareChamaVaultApp = async () => {
        setIsLoading(true);
        try {
          const result = await Share.share({
            message: 'Check out the ChamaVault app: https://chamavaultApp.com',
          });
      
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // Shared with specific activity type
              console.log('Shared via', result.activityType);
            } else {
              // Shared
              console.log('Shared successfully');
            }
          } else if (result.action === Share.dismissedAction) {
            // Dismissed
            console.log('Share dismissed');
          }
        } catch (error) {
          console.error('Error sharing:', error.message);
        }
        finally{
            setIsLoading(false);
        }
      };
    //   share app function
      
    return(
        <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-4">
        <View className="flex-1 bg-white justify-center items-center p-5 font-sans">
            <Image
                    source={require('../assets/images2/share.png')}
                    className="w-full h-48 rounded-lg overflow-hidden justify-center"
                    style={{ resizeMode: 'contain', width: '100%', height: 200 }}
            ></Image>
            <Text className='text-gray-950 w-full font-bold'>Click the button below to share the app</Text>
            <TouchableOpacity className="w-full bg-yellow-600 p-4 rounded-lg" onPress={shareChamaVaultApp}>
            {isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Text className="text-white text-center font-semibold text-lg">Share</Text> }
            </TouchableOpacity>
            <Toast/>
       
        <StatusBar/>
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}