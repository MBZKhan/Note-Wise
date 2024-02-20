import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import colors from '../misc/GlobalStyles';

const SearchComponent = ({ searchText, handleSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={handleSearch}
        value={searchText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 5,
    paddingHorizontal: 20,
    width: '90%',
    alignSelf: 'center',
    borderColor: colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 10,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
  },
});

export default SearchComponent;
