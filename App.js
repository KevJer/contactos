import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ContactsList } from "./screens/ContactsList";
import { ContacsForm } from "./screens/ContactsForm";
import { UserState } from "./context/States";

export default function App() {
  const StackConcts = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StackConcts.Navigator initialRouteName="ContactsListNav">
        <UserState>
          <StackConcts.Screen name="ContactsListNav" component={ContactsList} />
          <StackConcts.Screen name="ContactsFormNav" component={ContacsForm} />
        </UserState>
      </StackConcts.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
