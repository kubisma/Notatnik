### Notatnik - aplikacja React Native


Aplikacja mobilna do tworzenia, edycji i przeglądania notatek tekstowych oraz graficznych zbudowana w React Native. Umożliwia robienie zdjęć notatek, zapisywanie danych lokalnie, edycję i usuwanie notatek.


### Funkcje

- Tworzenie notatek z tekstem i zdjęciem
- Edycja i usuwanie notatek
- Podgląd zdjęcia w trybie pełnoekranowym
- Zapisywanie danych lokalnie z użyciem `AsyncStorage`
- Nawigacja między ekranami przy użyciu `React Navigation`
- Zarządzanie stanem za pomocą `Context API + useReducer`
- Stylizacja przy pomocy `react-native-paper`
- Responsywny interfejs


### Architektura

Aplikacja opiera się na architekturze opartej o Context API + useReducer, która zapewnia przejrzyste i skalowalne zarządzanie stanem globalnym.
Struktura

    • Context API tworzy wspólny kontekst (NoteContext), dostępny w całej aplikacji.
    • useReducer obsługuje logikę zmian stanu za pomocą akcji.
    • Komponenty uzyskują dostęp do kontekstu przez useContext.

### Technologie

- [React Native] (https://reactnative.dev/)
- [React Navigation] (https://reactnavigation.org/)
- [Context API] (https://react.dev/learn/passing-data-deeply-with-context)
- [AsyncStorage] (https://react-native-async-storage.github.io/async-storage/)
- [React Native Paper] (https://callstack.github.io/react-native-paper/)
- [Expo] (https://expo.dev/)


### Funkcje w przygotowaniu

- Dodawanie zdjęć z galerii
- Logowanie za pomocą PIN-u
- Wyszukiwarka notatek
