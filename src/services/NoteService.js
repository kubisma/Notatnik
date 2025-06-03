import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const STORAGE_KEY = 'NOTES';

// Operacje na notatkach w pamięci urządzenia
export class NoteService {
  // Wczytywanie notatek z pamięci
  static async loadNotes() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Błąd podczas ładowania notatek:', error);
      Alert.alert('Błąd', 'Nie udało się załadować notatek');
      return [];
    }
  }

  // Zapisywanie notatek do pamięci
  static async saveNotes(notes) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error('Błąd podczas zapisywania notatek:', error);
      Alert.alert('Błąd', 'Nie udało się zapisać notatek');
    }
  }

  // Dodawanie nowej notatki
  static async addNote(state, note) {
    if (!note?.id || !note?.title?.trim()) {
      Alert.alert('Błąd', 'Nieprawidłowe dane notatki');
      return state;
    }

    const updated = [...state, note];
    await this.saveNotes(updated);
    return updated;
  }

  // Usuwanie notatki po ID
  static async deleteNote(state, noteId) {
    const updated = state.filter(note => note.id !== noteId);
    await this.saveNotes(updated);
    return updated;
  }

  // Aktualizacja istniejącej notatki
  static async updateNote(state, updatedNote) {
    if (!updatedNote?.id || !updatedNote?.title?.trim()) {
      Alert.alert('Błąd', 'Nieprawidłowe dane notatki');
      return state;
    }

    const updated = state.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
    await this.saveNotes(updated);
    return updated;
  }
}
