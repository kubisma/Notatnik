import React, { useContext, useState, useCallback } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  RefreshControl,
} from 'react-native';
import { FAB, Card, IconButton, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NoteContext } from '../contexts/NoteContext';
import { confirmDelete } from '../utils/confirmDelete';

export default function NoteListScreen() {
  const { notes, deleteNote } = useContext(NoteContext);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Filtrowanie notatek po tytule
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Obsługa odświeżania listy
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  // Renderowanie pojedynczego elementu listy
  const renderNoteItem = ({ item }) => (
    <Card
      style={[styles.card, { width: width * 0.9 }]}
      onPress={() => navigation.navigate('Szczegóły', { note: item })}
    >
      <Card.Title
        title={item.title}
        titleStyle={styles.cardTitle}
        style={styles.cardTitleContainer}
        right={() => (
          <IconButton
            icon="delete"
            onPress={() => confirmDelete(() => deleteNote(item.id))}
          />
        )}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Pole wyszukiwania */}
      <TextInput
        placeholder="Szukaj notatki..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        mode="outlined"
        left={<TextInput.Icon icon="magnify" />}
      />

      {/* Lista notatek lub komunikat o braku */}
      {filteredNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Brak notatek</Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={renderNoteItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {/* Przycisk dodania nowej notatki */}
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
  searchInput: {
    marginHorizontal: 16,
    marginBottom: 16,
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
