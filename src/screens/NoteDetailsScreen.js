import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import colors from '../misc/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditNoteModal from '../components/EditNoteModal'; // Import the EditNoteModal

const NoteDetailsScreen = ({ route, navigation }) => {
  const { id, title: initialTitle, description: initialDescription, createdAt } = route.params; 
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Load existing notes from AsyncStorage
              const storedNotes = await AsyncStorage.getItem('notes');
              if (storedNotes !== null) {
                const parsedNotes = JSON.parse(storedNotes);
                // Filter out the note to be deleted based on its id
                const updatedNotes = parsedNotes.filter(note => note.id !== route.params.id);
                // Save updated notes to AsyncStorage
                await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
                // Navigate back to HomeScreen or any other desired screen
                navigation.goBack();
              }
            } catch (error) {
              console.error('Error deleting note:', error);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };
  
  const handleSaveEdit = async (editedData) => {
    try {
      // Load existing notes from AsyncStorage
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        const parsedNotes = JSON.parse(storedNotes);
        // Find the index of the note to be edited
        const noteIndex = parsedNotes.findIndex(note => note.id === id);
        if (noteIndex !== -1) {
          // Update the note with edited data
          parsedNotes[noteIndex] = { id, ...editedData };
          // Save updated notes to AsyncStorage
          await AsyncStorage.setItem('notes', JSON.stringify(parsedNotes));
          // Update state with new title and description
          setTitle(editedData.title);
          setDescription(editedData.description);
          // Close the modal
          setModalVisible(false);
        }
      }
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.noteContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Icon name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Icon name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.createdAtContainer}>
        <Text style={styles.createdAtText}>Created At: {createdAt}</Text>
      </View>
      <EditNoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveEdit}
        noteData={{ title, description }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  noteContainer: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.DARK,
    borderBottomWidth: 3,
    borderBottomColor: colors.PRIMARY,
    marginTop: 30,
  },
  description: {
    fontSize: 20,
    color: colors.DARK,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: colors.PRIMARY, 
  },
  createdAtContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  createdAtText: {
    fontSize: 16,
    color: colors.DARK,
  },
});

export default NoteDetailsScreen;
