import React, { useContext, useState, useLayoutEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { NoteContext } from '../contexts/NoteContext';

export default function NoteEditScreen({ route, navigation }) {
  const { addNote, updateNote } = useContext(NoteContext);
  const editingNote = route.params?.note;

  // Stan lokalny formularza
  const [title, setTitle] = useState(editingNote?.title || '');
  const [content, setContent] = useState(editingNote?.content || '');
  const [image, setImage] = useState(editingNote?.image || '');

  // Dynamiczne ustawienie tytułu nagłówka
  useLayoutEffect(() => {
    navigation.setOptions({
      title: editingNote ? 'Edytuj notatkę' : 'Nowa notatka',
    });
  }, [navigation, editingNote]);

  // Zapis notatki
  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Błąd', 'Tytuł nie może być pusty');
      return;
    }

    const noteData = {
      id: editingNote?.id || uuid.v4(),
      title: title.trim(),
      content: content.trim(),
      image: image || '',
    };

    try {
      if (editingNote) {
        await updateNote(noteData);
      } else {
        await addNote(noteData);
      }
      navigation.navigate('Notatki');
    } catch (error) {
      console.error(error);
      Alert.alert('Błąd', 'Nie udało się zapisać notatki');
    }
  };

  // Uruchomienie aparatu
  const handlePickImage = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Brak dostępu', 'Nie masz uprawnień do używania aparatu.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.3,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Błąd aparatu:', error);
      Alert.alert('Błąd', 'Nie udało się uruchomić aparatu');
    }
  };

  // Wybór zdjęcia z galerii
  const handleChooseFromLibrary = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Brak dostępu', 'Nie masz uprawnień do galerii.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.3,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Błąd galerii:', error);
      Alert.alert('Błąd', 'Nie udało się otworzyć galerii');
    }
  };

  // Usunięcie zdjęcia z notatki
  const handleRemoveImage = () => {
    Alert.alert('Usuń zdjęcie', 'Czy na pewno chcesz usunąć zdjęcie?', [
      { text: 'Anuluj', style: 'cancel' },
      { text: 'Usuń', style: 'destructive', onPress: () => setImage('') },
    ]);
  };

  // Otwórz zdjęcie w pełnym ekranie
  const handleOpenFullScreen = () => {
    navigation.navigate('Zdjęcie', { uri: image });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Pole tytułu */}
      <TextInput
        label="Tytuł"
        mode="outlined"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      {/* Pole treści notatki */}
      <TextInput
        label="Treść notatki"
        mode="outlined"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={6}
        style={styles.input}
      />

      {/* Wyświetlanie wybranego zdjęcia */}
      {image ? (
        <>
          <TouchableOpacity onPress={handleOpenFullScreen}>
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
          <Button
            mode="text"
            onPress={handleRemoveImage}
            style={styles.removeButton}
          >
            Usuń zdjęcie
          </Button>
        </>
      ) : null}

      {/* Akcje związane ze zdjęciem */}
      <Button mode="outlined" onPress={handlePickImage} style={styles.button}>
        Zrób zdjęcie
      </Button>

      <Button
        mode="outlined"
        onPress={handleChooseFromLibrary}
        style={styles.button}
      >
        Wybierz z galerii
      </Button>

      {/* Zapis notatki */}
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Zapisz
      </Button>
    </ScrollView>
  );
}

// Style
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
    height: 48,
    borderRadius: 6,
    justifyContent: 'center',
    width: '100%',
  },
  removeButton: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 8,
    borderRadius: 8,
  },
});
