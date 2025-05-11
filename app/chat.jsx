import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState('');
  const API_URL = 'https://backend1-1cc6.onrender.com/sendmessage/';

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const chama_id = await AsyncStorage.getItem('chama');
      const name = await AsyncStorage.getItem('name');
      setName(name);
      const API_URL2 = `https://backend1-1cc6.onrender.com/getmessages/${chama_id}`;
      const response = await axios.get(API_URL2);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsSending(true);
    try {
      const chama_id = await AsyncStorage.getItem('chama');
      const name = await AsyncStorage.getItem('name');
      const member_id = await AsyncStorage.getItem('member_id');
      await axios.post(API_URL, {
        text: newMessage,
        sender: name,
        timestamp: new Date().toISOString(),
        chama: chama_id,
        member_id: member_id,
      });
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white mb-24">
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        {isLoading ? (
         <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#FFA500" />
              <Text className="text-gray-600 font-serif">Loading chats...</Text>
          </View>
        ) : (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                className={`p-3 rounded-lg my-1 max-w-[80%] ${
                  item.sender === name ? 'bg-white self-end mr-1 shadow-lg' : 'shadow-lg bg-gray-200 self-start'
                }`}
              >
                <View className="flex-row items-center">
                  <Image
                    source={require('../assets/images2/profile3.png')}
                    className="w-5 h-5 rounded-full"
                  />
                  <Text className="ml-2 font-bold font-serif text-gray-900 dark:text-black">
                    {item.sender == name ? 'You' : item.sender}
                  </Text>
                </View>
                <Text className="text-black dark:text-black font-serif mt-1">{item.text}</Text>
                <Text className="text-xs text-gray-300 mt-1 font-serif">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 10 }}
          />
        )}

        <View className="flex-row items-center p-3 border-t border-gray-200 bg-white mb-5">
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2 bg-white font-serif"
          />
          <TouchableOpacity
            onPress={sendMessage}
            className="bg-yellow-600 px-5 py-2 rounded-full"
          >
            <Text className="text-white font-bold font-serif">
              {isSending ? 'Sending...' : 'Send'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
