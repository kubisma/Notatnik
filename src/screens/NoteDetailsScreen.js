import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, Button } from "react-native-paper";

// Komponent ekranu szczegółów notatki
export default function NoteDetailsScreen({ route, navigation }) {
  const note = route.params?.note; // Pobranie notatki z parametrów nawigacji
  const { width } = useWindowDimensions(); // Użycie szerokości okna

  // Komunikat o braku notatki
  if (!note) {
    return (
      <View style={[styles.container, { paddingHorizontal: width * 0.05 }]}>
        <Text style={styles.title}>Nie znaleziono notatki.</Text>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Wróć
        </Button>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingHorizontal: width * 0.05 }]}>
      {/* Tytuł notatki */}
      <Text style={styles.title}>{note.title}</Text>

      {/* Treść notatki */}
      <Text style={styles.content}>{note.content}</Text>

      {/* Zdjęcie (jeśli istnieje) */}
      {note.image && (
        <TouchableOpacity
          onPress={() => navigation.navigate("Zdjęcie", { uri: note.image })}
        >
          <Image
            source={{ uri: note.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}

      {/* Przycisk edycji */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Edycja", { note })}
        style={styles.button}
      >
        Edytuj
      </Button>
    </View>
  );
}

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
  },
  content: {
    fontSize: 16,
    marginBottom: 24,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 24,
    backgroundColor: "#eee",
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 6,
    justifyContent: "center",
  },
});
