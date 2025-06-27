import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "NOTES";

export class NoteService {
  // Walidacja notatki
  static validateNote(note) {
    if (!note?.id || typeof note.title !== "string" || !note.title.trim()) {
      throw new Error("Nieprawidłowe dane notatki");
    }
  }

  // Wczytywanie notatek z pamięci
  static async loadNotes() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Błąd podczas ładowania notatek:", error);
      throw new Error("Nie udało się załadować notatek");
    }
  }

  // Zapisywanie notatek do pamięci
  static async saveNotes(notes) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
      console.error("Błąd podczas zapisywania notatek:", error);
      throw new Error("Nie udało się zapisać notatek");
    }
  }

  // Dodawanie nowej notatki
  static async addNote(state, note) {
    this.validateNote(note);
    const updated = [...state, note];
    await this.saveNotes(updated);
    return updated;
  }

  // Usuwanie notatki po ID
  static async deleteNote(state, noteId) {
    const updated = state.filter((note) => note.id !== noteId);
    await this.saveNotes(updated);
    return updated;
  }

  // Aktualizacja istniejącej notatki
  static async updateNote(state, updatedNote) {
    this.validateNote(updatedNote);
    const updated = state.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    await this.saveNotes(updated);
    return updated;
  }
}
