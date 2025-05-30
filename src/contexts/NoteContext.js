import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Utworzenie kontekstu do zarządzania notatkami
export const NoteContext = createContext();

// Obsługa operacji na notatkach
const noteReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_NOTES':
      return action.payload;
    case 'ADD_NOTE':
      return [...state, action.payload];
    case 'DELETE_NOTE':
      return state.filter(note => note.id !== action.payload);
    case 'UPDATE_NOTE':
      return state.map(note =>
        note.id === action.payload.id ? action.payload : note
      );
    default:
      return state;
  }
};

// Komponent udostępniający kontekst notatek
export const NoteProvider = ({ children }) => {
  const [notes, dispatch] = useReducer(noteReducer, []);

  // Wczytanie notatek z pamięci
  useEffect(() => {
    const load = async () => {
      try {
        const data = await AsyncStorage.getItem('NOTES');
        if (data) dispatch({ type: 'LOAD_NOTES', payload: JSON.parse(data) });
      } catch (error) {
        console.error("Błąd podczas wczytywania notatek:", error);
      }
    };
    load();
  }, []);

  // Zapisywanie notatek do pamięci po każdej zmianie
  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem('NOTES', JSON.stringify(notes));
      } catch (error) {
        console.error("Błąd podczas zapisywania notatek:", error);
      }
    };
    save();
  }, [notes]);

  // Udostępnienie notatek i funkcji zarządzających w całej aplikacji
  return (
    <NoteContext.Provider value={{ notes, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};
