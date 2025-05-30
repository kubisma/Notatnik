import React, { useContext } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  Alert,
} from 'react-native';
import { FAB, Card, IconButton } from 'react-native-paper';
import { NoteContext } from '../contexts/NoteContext';
import { useNavigation } from '@react-navigation/native';

// Główny ekran wyświetlający listę notatek
export default function NoteListScreen() {
  const { notes, dispatch } = useContext(NoteContext); // Dostęp do notatek
  const navigation = useNavigation(); // Nawigacja między ekranami
  const { width } = useWindowDimensions(); // Ustawienie szerokości do responsywności

  return (
    <View style={styles.container}>
      {/* Jeśli nie ma notatek, wyświetl komunikat */}
      {notes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Brak notatek</Text>
        </View>
      ) : (
        // Lista notatek
        <FlatList
          data={notes} // Tablica notatek
          keyExtractor={item => item.id} // Klucz dla każdej notatki
          renderItem={({ item }) => (
            <Card
              style={[styles.card, { width: width * 0.9 }]} // Karta z notatką
              onPress={() => navigation.navigate('Szczegóły', { note: item })} // Przejście do szczegółów
            >
              <Card.Title
                title={item.title}
                titleStyle={styles.cardTitle}
                style={styles.cardTitleContainer}
                right={() => (
                  <IconButton
                    icon="delete"
                    // Potwierdzenie przed usunięciem notatki
                    onPress={() => {
                      Alert.alert(
                        'Usuń notatkę',
                        'Czy na pewno chcesz usunąć notatkę?',
                        [
                          { text: 'Anuluj', style: 'cancel' },
                          {
                            text: 'Usuń',
                            style: 'destructive',
                            onPress: () =>
                              dispatch({
                                type: 'DELETE_NOTE',
                                payload: item.id,
                              }),
                          },
                        ],
                        { cancelable: true }
                      );
                    }}
                  />
                )}
              />
            </Card>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Przycisk dodawania nowej notatki */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Edycja')}
      />
    </View>
  );
}

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  listContent: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  card: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitleContainer: {
    minHeight: 64,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    textAlignVertical: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
  },
});
