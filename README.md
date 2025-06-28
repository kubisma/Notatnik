### Notatnik - aplikacja React Native

Aplikacja mobilna do tworzenia, edycji i przeglądania notatek tekstowych oraz graficznych zbudowana w React Native. Umożliwia robienie zdjęć notatek, zapisywanie danych lokalnie, edycję i usuwanie notatek.

<div style="display: flex; gap: 10px;">
  <img src="images/Screen 1.png" alt="Obrazek 1" style="width: 30%; height: auto;">
  <img src="images/Screen 2.png" alt="Obrazek 2" style="width: 30%; height: auto;">
  <img src="images/Screen 3.png" alt="Obrazek 3" style="width: 30%; height: auto;">
  <img src="images/Screen 4.png" alt="Obrazek 4" style="width: 30%; height: auto;">
</div>


### Funkcje

- Tworzenie notatek z tekstem i zdjęciem
- Wyszukiwanie notatek
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


### Instalacja i uruchomienie projektu

Wymagania wstępne:

    Node.js (zalecana wersja LTS, np. 18.x)

    npm (lub yarn)

    Expo CLI (możesz zainstalować globalnie: npm install -g expo-cli)

    Emulator Android/iOS lub urządzenie fizyczne z aplikacją Expo Go

Krok po kroku:

    git clone https://github.com/kubisma/Notatnik.git
    cd Notatnik

    npm install

lub jeśli używasz yarn:

    yarn install

    npm start

lub

    expo start

Uruchom aplikację na wybranej platformie:

    npm run android (Emulator Android)

    npm run ios (Emulator iOS — tylko MacOS)

Lub zeskanuj kod QR w terminalu aplikacją Expo Go na telefonie.

### Technologie

- [React Native] (https://reactnative.dev/)
- [React Navigation] (https://reactnavigation.org/)
- [Context API] (https://react.dev/learn/passing-data-deeply-with-context)
- [AsyncStorage] (https://react-native-async-storage.github.io/async-storage/)
- [React Native Paper] (https://callstack.github.io/react-native-paper/)
- [Expo] (https://expo.dev/)
