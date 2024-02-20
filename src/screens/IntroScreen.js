import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import colors from '../misc/GlobalStyles';

const IntroScreen = () => {
  const [name, setName] = useState('');

  const handleContinue = () => {
    console.log('Name entered:', name);
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
      <Button title="Continue" onPress={handleContinue} />
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
    color:  colors.DARK,
  },
  input: {
    height: 40,
    width: Dimensions.get('window').width - 80, 
    color: colors.PRIMARY,
    fontSize: 20,
    borderColor: colors.PRIMARY,
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default IntroScreen;
