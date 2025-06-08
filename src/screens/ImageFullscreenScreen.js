import { Modal, StyleSheet, View, Alert } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

// Pełnoekranowy podgląd zdjęcia z przybliżeniem
export default function ImageFullscreenScreen({ route, navigation }) {
  const { uri } = route.params;

  if (!uri) {
    Alert.alert('Błąd', 'Brak obrazu do wyświetlenia.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
    return null;
  }

  return (
    <Modal visible={true} transparent={true} onRequestClose={() => navigation.goBack()}>
      <ImageViewer
        imageUrls={[{ url: uri }]}
        enableSwipeDown
        onSwipeDown={() => navigation.goBack()}
        renderIndicator={() => null}
        backgroundColor="black"
      />
    </Modal>
  );
}
