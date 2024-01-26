import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ContactsList } from './screens/ContactsList';

export default function App() {
  const StackConcts = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <StackConcts.Navigator>
        <StackConcts.Screen name='ContactsListNav' component={ContactsList} />
      </StackConcts.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
