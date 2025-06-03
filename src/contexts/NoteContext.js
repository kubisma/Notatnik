import React, { createContext, useReducer, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { NoteService } from '../services/NoteService';

// Tworzenie kontekstu notatek
export const NoteContext = createContext();

// Obsługa akcji na notatkach
const noteReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_NOTES':
      return action.payload;
    default:
      return state;
  }
};

// Udostępnianie kontekstu w aplikacji
export const NoteProvider = ({ children }) => {
  const [notes, dispatch] = useReducer(noteReducer, []);
  const debounceTimer = useRef(null);

  // Wczytanie notatek po uruchomieniu aplikacji
  useEffect(() => {
    (async () => {
      try {
        const loadedNotes = await NoteService.loadNotes();
        dispatch({ type: 'LOAD_NOTES', payload: loadedNotes });
      } catch (error) {
        Alert.alert('Błąd', 'Nie udało się załadować notatek');
        console.error('Błąd ładowania notatek:', error);
      }
    })();
  }, []);

  // Funkcja do zapisu notatek z opóźnieniem (debounce)
  const debouncedSave = (newNotes) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        await NoteService.saveNotes(newNotes);
      } catch (error) {
        Alert.alert('Błąd', 'Nie udało się zapisać notatek');
        console.error('Błąd zapisu notatek:', error);
      }
    }, 500);
  };

  // Walidacja danych notatki przed zapisem
  const validateNote = (note) => {
    if (!note || !note.id || typeof note.title !== 'string') {
      throw new Error('Nieprawidłowe dane notatki');
    }
  };

  // Dodawanie nowej notatki
  const addNote = async (note) => {
    try {
      validateNote(note);
      const updated = await NoteService.addNote(notes, note);
      dispatch({ type: 'LOAD_NOTES', payload: updated });
      debouncedSave(updated);
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się dodać notatki');
      console.error('Błąd dodawania notatki:', error);
    }
  };

  // Usuwanie notatki
  const deleteNote = async (id) => {
    try {
      const updated = await NoteService.deleteNote(notes, id);
      dispatch({ type: 'LOAD_NOTES', payload: updated });
      debouncedSave(updated);
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się usunąć notatki');
      console.error('Błąd usuwania notatki:', error);
    }
  };

  // Aktualizacja istniejącej notatki
  const updateNote = async (note) => {
    try {
      validateNote(note);
      const updated = await NoteService.updateNote(notes, note);
      dispatch({ type: 'LOAD_NOTES', payload: updated });
      debouncedSave(updated);
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zaktualizować notatki');
      console.error('Błąd aktualizacji notatki:', error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, dispatch, addNote, deleteNote, updateNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};
