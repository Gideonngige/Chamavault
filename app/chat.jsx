import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
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
    // const interval = setInterval(fetchMessages, 1000);
    // return () => clearInterval(interval);
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
    }
    finally {
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
    }
    finally {
      setIsSending(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', marginBottom:100 }}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        {isLoading ? <Text className='font-serif p-4'>Loading your chats...</Text> : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[
              styles.messageBubble,
              item.sender === name ? styles.sentMessage : styles.receivedMessage
            ]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../assets/images2/profile3.png')} style={styles.profileImage} />
                <Text style={styles.senderName} className='font-serif'>{item.sender == name ? "You" : item.sender}</Text>
              </View>
              <Text style={styles.messageText} className='font-serif'>{item.text}</Text>
              <Text style={styles.timestamp} className='font-serif'>
                {new Date(item.timestamp).toLocaleTimeString()}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80, padding: 10 }}
        />
      )}

        {/* Input at the bottom */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            className='font-serif'
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText} className='font-serif'>{isSending ? "Sending..." : "Send"}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: '#ca8a04',
    alignSelf: 'flex-end',
    marginRight: 6,
  },
  receivedMessage: {
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  timestamp: {
    color: '#d3d3d3',
    fontSize: 12,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: 'white',
  },
  sendButton: {
    backgroundColor: '#ca8a04',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 20,
    height: 20,
    borderRadius: 999,
  },
  senderName: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ChatScreen;
