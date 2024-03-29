import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../misc/GlobalStyles';

const windowWidth = Dimensions.get('window').width;

const Note2 = ({ title, description }) => {
  const noteWidth = windowWidth * 0.85;
  return (
    <View style={[styles.container, { width: noteWidth }]}>
      <Text numberOfLines={2} style={styles.title}>{title}</Text>
      <Text numberOfLines={2} style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    borderColor: colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: colors.PRIMARY,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
    color: colors.WHITE,
  },
});

export default Note2;
