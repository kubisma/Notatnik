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

// Ekran do tworzenia lub edytowania notatki
export default function NoteEditScreen({ route, navigation }) {
  const { dispatch } = useContext(NoteContext); // Pobieranie funkcji zarządzającej notatkami
  const editingNote = route.params?.note; // Pobranie notatki, jeśli jest edytowana

  // Ustawienia początkowe pól formularza
  const [title, setTitle] = useState(editingNote?.title || '');
  const [content, setContent] = useState(editingNote?.content || '');
  const [image, setImage] = useState(editingNote?.image || '');

  // Ustawienie tytułu ekranu w zależności od trybu edycji
  useLayoutEffect(() => {
    navigation.setOptions({
      title: editingNote ? 'Edytuj notatkę' : 'Nowa notatka',
    });
  }, [navigation, editingNote]);

  // Zapisanie nowej lub zaktualizowanej notatki
  const handleSave = () => {
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

    dispatch({
      type: editingNote ? 'UPDATE_NOTE' : 'ADD_NOTE',
      payload: noteData,
    });

    navigation.navigate('Notatki'); // Powrót do listy
  };

  // Wykonanie zdjęcia i dodanie do notatki
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Brak uprawnień do aparatu');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri); // Ustawienie obrazu
    }
  };

  // Usunięcie zdjęcia z notatki
  const handleRemoveImage = () => {
    Alert.alert('Usuń zdjęcie', 'Czy na pewno chcesz usunąć zdjęcie?', [
      { text: 'Anuluj', style: 'cancel' },
      { text: 'Usuń', style: 'destructive', onPress: () => setImage('') },
    ]);
  };

  // Otworzenie obrazu w pełnym ekranie
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

      {/* Pole treści */}
      <TextInput
        label="Treść notatki"
        mode="outlined"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={6}
        style={styles.input}
      />

      {/* Obraz, jeśli istnieje */}
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

      {/* Przycisk do zrobienia zdjęcia */}
      <Button mode="outlined" onPress={handlePickImage} style={styles.button}>
        Zrób zdjęcie
      </Button>

      {/* Przycisk zapisania notatki */}
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
