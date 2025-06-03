import { Alert } from 'react-native';

//Wyświetla alert potwierdzający usunięcie notatki
export const confirmDelete = (onConfirm) => {
  Alert.alert(
    'Usuń notatkę',
    'Czy na pewno chcesz usunąć notatkę?',
    [
      { text: 'Anuluj', style: 'cancel' },
      { text: 'Usuń', style: 'destructive', onPress: onConfirm },
    ],
    { cancelable: true }
  );
};
