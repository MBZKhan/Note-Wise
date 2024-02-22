import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import colors from '../misc/GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditNoteModal = ({ visible, onClose, onSave, noteData }) => {
  const [title, setTitle] = useState(noteData.title);
  const [description, setDescription] = useState(noteData.description);

  const handleSave = () => {
    onSave({ title, description });
    onClose();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isNoteEmpty = title.trim() === '' && description.trim() === '';

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
            <Text style={styles.modalTitle}>Edit Note</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <ScrollView style={styles.descriptionScrollView}>
              <TextInput
                style={styles.descriptionInput}
                placeholder="Description"
                multiline={true}
                value={description}
                onChangeText={setDescription}
                textAlignVertical="top"
                scrollEnabled={true} 
              />
            </ScrollView>
            <View style={styles.buttonContainer}>
              {!isNoteEmpty && ( 
                <>
                  <Icon name="times" size={30} color="white" onPress={onClose} style={styles.roundButtonIcon} />
                  <Icon name="check" size={30} color="white" onPress={handleSave} style={styles.roundButtonIcon} />
                </>
              )}
              {isNoteEmpty && (
                <Icon name="times" size={30} color="white" onPress={onClose} style={styles.roundButtonIcon} />
              )}
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
    backgroundColor: colors.LIGHT,
    padding: 20,
  },
  modalTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: colors.SECONDARY,
  },
  titleInput: {
    fontSize: 30,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: colors.PRIMARY,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  descriptionInput: {
    borderBottomWidth: 2,
    borderColor: colors.PRIMARY,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 20,
    minHeight: 50,
  },
  descriptionScrollView: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  roundButtonIcon: {
    backgroundColor: colors.SECONDARY,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
  },
});

export default EditNoteModal;
