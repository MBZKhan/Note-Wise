import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../misc/GlobalStyles';

const windowWidth = Dimensions.get('window').width;

const Note = ({ title, description }) => {
  const noteWidth = (windowWidth / 2) - 40; // Assuming 2 columns
  return (
    <View style={[styles.container, { width: noteWidth }]}>
      <Text numberOfLines={2} style={styles.title}>{title}</Text>
      <Text numberOfLines={2} style={styles.description}>{description}</Text>
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
    backgroundColor: colors.PRIMARY,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.LIGHT,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
    color: colors.LIGHT,
  },
});

export default Note;
