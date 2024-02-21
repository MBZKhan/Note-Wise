import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const NoteDetailsScreen = ({ route }) => {
  const { title, description } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.noteContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  noteContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
  },
});

export default NoteDetailsScreen;
