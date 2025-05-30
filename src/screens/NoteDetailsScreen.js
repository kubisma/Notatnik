import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, Button } from "react-native-paper";

// Ekran wyświetlający szczegóły wybranej notatki
export default function NoteDetailsScreen({ route, navigation }) {
  const { note } = route.params; // Pobranie danych notatki przekazanej z poprzedniego ekranu
  const { width } = useWindowDimensions(); // Pobranie szerokości okna do responsywności

  return (
    // Główna sekcja ekranu
    <View style={[styles.container, { paddingHorizontal: width * 0.05 }]}>
      {/* Tytuł notatki */}
      <Text style={styles.title}>{note.title}</Text>

      {/* Treść notatki */}
      <Text style={styles.content}>{note.content}</Text>

      {/* Zdjęcie, jeśli jest dostępne */}
      {note.image ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Zdjęcie", { uri: note.image })}
        >
          <Image source={{ uri: note.image }} style={styles.image} />
        </TouchableOpacity>
      ) : null}

      {/* Przycisk przejścia do edycji */}
      <Button
        mode="contained"
        style={styles.fullWidthButton}
        onPress={() => navigation.navigate("Edycja", { note })}
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    marginBottom: 24,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 24,
    borderRadius: 8,
  },
  fullWidthButton: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 6,
  },
});
