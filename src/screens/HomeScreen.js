import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../misc/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native'; 
import SearchComponent from '../components/SearchComponent';
import AddNoteModal from '../components/AddNoteModal';
import Note from '../components/Note';

const HomeScreen = () => {
  const { navigate } = useNavigation();
  const isFocused = useIsFocused(); 

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
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadName();
    loadNotes();
  }, [isFocused]); 

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
        setFilteredNotes(parsedNotes); 
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

  const handleSearch = (text) => {
    setSearchText(text);
    const searchTextLowerCase = text.toLowerCase();
    const filteredNotes = notes.filter(note => {
      const titleLowerCase = note.title.toLowerCase();
      const descriptionLowerCase = note.description.toLowerCase();
      return titleLowerCase.includes(searchTextLowerCase) || descriptionLowerCase.includes(searchTextLowerCase);
    });
    setFilteredNotes(filteredNotes);
  };
  
  const handleAddNote = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSaveNote = async (noteData) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  
    const id = currentDate.toISOString(); 
    const newNote = { ...noteData, id, createdAt: formattedDate }; 
    const updatedNotes = [...notes, newNote];
  
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
  
      // Update filteredNotes state as well
      const searchTextLowerCase = searchText.toLowerCase();
      const filteredNotes = updatedNotes.filter(note => {
        const titleLowerCase = note.title.toLowerCase();
        const descriptionLowerCase = note.description.toLowerCase();
        return titleLowerCase.includes(searchTextLowerCase) || descriptionLowerCase.includes(searchTextLowerCase);
      });
      setFilteredNotes(filteredNotes);
  
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const navigateToNoteDetails = (note) => {
    navigate('NoteDetailsScreen', note);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const filteredNotes = notes.filter((note) => note.id !== noteId);
      setNotes(filteredNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(filteredNotes));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            {greeting}, {name ? name : 'Friend'}
          </Text>
        </View>
        {notes.length > 0 && (
          <SearchComponent searchText={searchText} handleSearch={handleSearch} />
        )}
        {filteredNotes.length === 0 && searchText.length > 0 && (
          <View style={styles.centeredTextContainer}>
            <Text style={styles.centeredText}>Not Found</Text>
          </View>
        )}
        {notes.length === 0 && (
          <View style={styles.centeredTextContainer}>
            <Text style={styles.centeredText}>ADD NOTES</Text>
          </View>
        )}
        {filteredNotes.length > 0 && (
          <>
            <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
              <Icon name="plus" size={24} color="white" />
            </TouchableOpacity>
            <AddNoteModal
              visible={modalVisible}
              onClose={handleCloseModal}
              onSave={handleSaveNote}
            />
            <FlatList
              data={filteredNotes}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigateToNoteDetails(item)}>
                  <Note
                    title={item.title}
                    description={item.description}
                    onDelete={() => handleDeleteNote(item.id)} 
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
            />
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
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