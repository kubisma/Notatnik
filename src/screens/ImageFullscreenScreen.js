import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

// Pełnoekranowy podgląd zdjęcia
export default function ImageFullscreenScreen({ route, navigation }) {
  const { uri } = route.params; // Odbiór przekazanego adresu zdjęcia

  return (
    // Dotknięcie dowolnego miejsca zamyka widok
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.container}>
        {/* Wyświetlenie obrazka na pełnym ekranie */}
        <Image source={{ uri }} style={styles.image} resizeMode="contain" />
      </View>
    </TouchableWithoutFeedback>
  );
}

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
