import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../misc/GlobalStyles';

const Note = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    borderColor: colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: colors.PRIMARY,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.LIGHT,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default Note;
