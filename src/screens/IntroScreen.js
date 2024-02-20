import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon component you want to use
import colors from '../misc/GlobalStyles';

const IntroScreen = ({ navigation }) => { // Assuming you're using navigation props for navigation
  const [name, setName] = useState('');

  const handleContinue = () => {
    console.log('Name entered:', name);
    // Navigate to the next screen here
    // Example: navigation.navigate('NextScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.introText}>Enter your name to continue:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your Name"
        autoCapitalize="words"
      />
      <TouchableOpacity style={styles.roundButton} onPress={handleContinue}>
        <Icon name="arrow-right" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  introText: {
    fontSize: 20,
    marginBottom: 20,
    color: colors.DARK,
  },
  input: {
    height: 50,
    width: Dimensions.get('window').width - 80,
    color: colors.PRIMARY,
    fontSize: 20,
    borderColor: colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  roundButton: {
    backgroundColor: colors.PRIMARY, 
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25, 
  },
});

export default IntroScreen;
