import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import colors from '../misc/GlobalStyles';

const NoteModal = ({ visible, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    onSave({ title, description });
    setTitle('');
    setDescription('');
    onClose();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Note</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <ScrollView style={styles.descriptionScrollView}>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Description"
                multiline={true}
                value={description}
                onChangeText={setDescription}
                textAlignVertical="top"
                scrollEnabled={true} 
              />
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={onClose} color="#888" />
              <Button title="Save" onPress={handleSave} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: colors.DARK,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: colors.PRIMARY,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  descriptionScrollView: {
    flex: 1,
  },
  descriptionInput: {
    minHeight: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginRight:100,
    marginLeft: 100,
  },
});

export default NoteModal;
