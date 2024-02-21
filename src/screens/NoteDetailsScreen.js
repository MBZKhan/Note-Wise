import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../misc/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const NoteDetailsScreen = ({ route }) => {
  const { title, description, createdAt } = route.params; 

  const handleEdit = () => {
    // Implement edit action
  };

  const handleDelete = () => {
    // Implement delete action
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
    marginTop: 20,
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
