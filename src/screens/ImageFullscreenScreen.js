import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

// Pełnoekranowy podgląd zdjęcia z zoomem
export default function ImageFullscreenScreen({ route, navigation }) {
  const { uri } = route.params;

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
