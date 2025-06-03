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
    <NoteProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#6851A4' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
              headerTitleAlign: 'center',
            }}
          >
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
