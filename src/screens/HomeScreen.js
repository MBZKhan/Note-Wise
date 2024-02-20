import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import colors from "../misc/GlobalStyles";

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

  const name = 'Muhammad Bilal Zahid Khan'; 

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>{greeting}, {name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: colors.DARK,
    padding: 20,
  },
  greetingContainer: {
    marginBottom: 20, 
    marginTop: 30,
    backgroundColor: colors.PRIMARY,
    marginHorizontal: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.LIGHT,
  },
});

export default HomeScreen;
