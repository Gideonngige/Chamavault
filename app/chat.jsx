import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState("");

  // Replace with your Django backend URL
  const API_URL = 'https://backend1-1cc6.onrender.com/sendmessage/';
  

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // start of function to fetch messages
  const fetchMessages = async () => {
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
  };
  // end of function to fetch messages


  // function to send messages
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const chama_id = await AsyncStorage.getItem('chama');
      const name = await AsyncStorage.getItem('name');
      setName(name);
      const member_id = await AsyncStorage.getItem('member_id');
      await axios.post(API_URL, {
        text: newMessage,
        sender: name, // Replace with actual user identification
        timestamp: new Date().toISOString(),
        chama: chama_id,
        member_id: member_id,
      });
      setNewMessage('');
      fetchMessages(); // Refresh messages after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  // end of function to send message

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.sender === name ? styles.sentMessage : styles.receivedMessage
          ]}>
            <View className="items-start flex-row">
              <Image source={require('../assets/images2/profile3.png')} style={{width:20, height:20}} className='rounded-full'/>
              <Text className='font-bold ml-2'>{item.sender}</Text>
            </View>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  messageBubble: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: '#ca8a04',
    alignSelf: 'flex-end',
    marginRight:6,
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
    padding: 10,
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
});

export default ChatScreen;