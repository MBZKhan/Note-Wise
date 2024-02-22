import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../misc/GlobalStyles';

const SearchComponent = ({ searchText, handleSearch }) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleClearText = () => {
    handleSearch('');
    setIsSearching(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={(text) => {
              handleSearch(text);
              setIsSearching(text.length > 0);
            }}
            value={searchText}
          />
          {isSearching ? (
            <TouchableOpacity onPress={handleClearText} style={styles.iconContainer}>
              <Icon name="times-circle" size={25} color={colors.PRIMARY} />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconContainer}>
              <Icon name="search" size={20} color={colors.PRIMARY} />
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  iconContainer: {
    padding: 8,
  },
});

export default SearchComponent;
