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
  const { width } = useWindowDimensions(); // Pobranie szerokości okna

  return (
    <View style={[styles.container, { paddingHorizontal: width * 0.05 }]}>
      {/* Tytuł notatki */}
      <Text style={styles.title}>{note.title}</Text>
      {/* Treść notatki */}
      <Text style={styles.content}>{note.content}</Text>
      {/* Zdjęcie, jeśli jest dostępne */}
      {note.image && (
        <TouchableOpacity
          onPress={() => navigation.navigate("Zdjęcie", { uri: note.image })}
        >
          <Image source={{ uri: note.image }} style={styles.image} />
        </TouchableOpacity>
      )}
      {/* Przycisk przejścia do edycji */}
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
    height: 300,
    marginBottom: 24,
    borderRadius: 8,
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 6,
    justifyContent: "center",
  },
});
