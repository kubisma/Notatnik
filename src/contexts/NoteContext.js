import { createContext, useReducer, useEffect, useRef } from "react";
import { Alert } from "react-native";
import { NoteService } from "../services/NoteService";

// Różne typy akcji
const LOAD_NOTES = "LOAD_NOTES";
const ADD_NOTE = "ADD_NOTE";
const UPDATE_NOTE = "UPDATE_NOTE";
const DELETE_NOTE = "DELETE_NOTE";

// Tworzenie kontekstu notatek
export const NoteContext = createContext();

// Reducer obsługujący różne typy akcji
const noteReducer = (state, action) => {
  switch (action.type) {
    case LOAD_NOTES:
      return action.payload;
    case ADD_NOTE:
      return [...state, action.payload];
    case UPDATE_NOTE:
      return state.map((note) =>
        note.id === action.payload.id ? action.payload : note,
      );
    case DELETE_NOTE:
      return state.filter((note) => note.id !== action.payload);
    default:
      return state;
  }
};

// Provider kontekstu notatek
export const NoteProvider = ({ children }) => {
  const [notes, dispatch] = useReducer(noteReducer, []);
  const debounceTimer = useRef(null);

  // Wczytywanie notatek przy starcie
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const loadedNotes = await NoteService.loadNotes();
        if (isMounted) {
          dispatch({ type: LOAD_NOTES, payload: loadedNotes });
        }
      } catch (error) {
        Alert.alert("Błąd", "Nie udało się załadować notatek");
        console.error("Błąd ładowania notatek:", error);
      }
    })();

    return () => {
      isMounted = false;
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Debounced zapis
  const debouncedSave = (newNotes) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        await NoteService.saveNotes(newNotes);
      } catch (error) {
        Alert.alert("Błąd", "Nie udało się zapisać notatek");
        console.error("Błąd zapisu notatek:", error);
      }
    }, 500);
  };

  const validateNote = (note) => {
    if (!note || !note.id || typeof note.title !== "string") {
      throw new Error("Nieprawidłowe dane notatki");
    }
  };

  // Dodawanie notatki
  const addNote = async (note) => {
    try {
      validateNote(note);
      const updated = await NoteService.addNote(notes, note);
      dispatch({ type: ADD_NOTE, payload: note });
      debouncedSave(updated);
    } catch (error) {
      Alert.alert("Błąd", "Nie udało się dodać notatki");
      console.error("Błąd dodawania notatki:", error);
    }
  };

  // Usuwanie notatki
  const deleteNote = async (id) => {
    try {
      const updated = await NoteService.deleteNote(notes, id);
      dispatch({ type: DELETE_NOTE, payload: id });
      debouncedSave(updated);
    } catch (error) {
      Alert.alert("Błąd", "Nie udało się usunąć notatki");
      console.error("Błąd usuwania notatki:", error);
    }
  };

  // Aktualizacja notatki
  const updateNote = async (note) => {
    try {
      validateNote(note);
      const updated = await NoteService.updateNote(notes, note);
      dispatch({ type: UPDATE_NOTE, payload: note });
      debouncedSave(updated);
    } catch (error) {
      Alert.alert("Błąd", "Nie udało się zaktualizować notatki");
      console.error("Błąd aktualizacji notatki:", error);
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
