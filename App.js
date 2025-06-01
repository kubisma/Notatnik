import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NoteProvider } from './src/contexts/NoteContext';

// Import ekranów aplikacji
import NoteListScreen from './src/screens/NoteListScreen';
import NoteDetailsScreen from './src/screens/NoteDetailsScreen';
import NoteEditScreen from './src/screens/NoteEditScreen';
import ImageFullscreenScreen from './src/screens/ImageFullscreenScreen';

// Konfiguracja stosu nawigacji
const Stack = createStackNavigator();

// Główna funkcja aplikacji
export default function App() {
  return (
    // Dostarczenie kontekstu notatek do całej aplikacji
    <NoteProvider>
      {/* Material Design */}
      <PaperProvider>
        {/* Nawigacja w aplikacji */}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Notatki" component={NoteListScreen} />
            <Stack.Screen name="Szczegóły" component={NoteDetailsScreen} />           
            <Stack.Screen name="Edycja" component={NoteEditScreen} />
            <Stack.Screen
              name="Zdjęcie"
              component={ImageFullscreenScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </NoteProvider>
  );
}
