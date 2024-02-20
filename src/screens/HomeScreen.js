import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../misc/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchComponent from '../components/SearchComponent';

const HomeScreen = () => {
  const currentHour = new Date().getHours();
  let greeting = '';

  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

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

  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleAddNote = () => {
    console.log('Adding note...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          {greeting}, {name ? name : 'Friend'}
        </Text>
      </View>
      <SearchComponent searchText={searchText} handleSearch={handleSearch} />
      <View style={styles.centeredTextContainer}>
        <Text style={styles.centeredText}>ADD NOTES</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
  },
  greetingContainer: {
    marginBottom: 20,
    marginTop: 30,
    marginHorizontal: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.DARK,
  },
  centeredTextContainer: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  centeredText: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    opacity: 0.5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.PRIMARY,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
