import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../misc/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchComponent from '../components/SearchComponent';
import NoteModal from '../components/NoteModal';
import Note from '../components/Note';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // AsyncStorage.clear();
    loadName();
    loadNotes();
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

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        const parsedNotes = JSON.parse(storedNotes);
        setNotes(parsedNotes);
        console.log('Saved Notes:', parsedNotes); 
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleAddNote = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSaveNote = (noteData) => {
    const date = new Date().toISOString();
    const newNote = { ...noteData, id: date };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          {greeting}, {name ? name : 'Friend'}
        </Text>
      </View>
      {notes.length > 0 && (
        <SearchComponent searchText={searchText} handleSearch={handleSearch} />
      )}
      {notes.length === 0 && (
        <View style={styles.centeredTextContainer}>
          <Text style={styles.centeredText}>ADD NOTES</Text>
        </View>
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>
      <NoteModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveNote}
      />
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <Note
            title={item.title}
            description={item.description}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2} 
        columnWrapperStyle={styles.columnWrapper} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: colors.LIGHT,
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
  columnWrapper: {
    justifyContent: 'space-between', 
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
    zIndex: 2,
  },
  
  
});

export default HomeScreen;
