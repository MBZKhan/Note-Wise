import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../misc/GlobalStyles';
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

  const name = 'Muhammad Bilal Zahid Khan';

  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          {greeting}, {name}
        </Text>
      </View>
      <SearchComponent searchText={searchText} handleSearch={handleSearch} />
      <View style={styles.centeredTextContainer}>
        <Text style={styles.centeredText}>ADD NOTES</Text>
      </View>
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredText: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    opacity: 0.5,
  },
});

export default HomeScreen;
