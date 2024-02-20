import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import colors from '../misc/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const IntroScreen = () => { 
  const [name, setName] = useState('');

  useEffect(() => {
    loadName();
  }, []);

  const loadName = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      if (storedName !== null) {
        setName(storedName);
      }
    } catch (error) {
      console.error('Error loading name:', error);
    }
  };

  const handleContinue = async () => {
    console.log('Name entered:', name);
    try {
      await AsyncStorage.setItem('name', name);
      console.log('Name stored successfully');
    } catch (error) {
      console.error('Error storing name:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.introText}>Enter your name to continue:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your Name"
        autoCapitalize="words"
      />
      <TouchableOpacity style={styles.roundButton} onPress={handleContinue}>
        <Icon name="arrow-right" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  introText: {
    fontSize: 20,
    marginBottom: 20,
    color: colors.DARK,
  },
  input: {
    height: 50,
    width: Dimensions.get('window').width - 80,
    color: colors.PRIMARY,
    fontSize: 20,
    borderColor: colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  roundButton: {
    backgroundColor: colors.PRIMARY, 
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25, 
  },
});

export default IntroScreen;
