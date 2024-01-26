// Importar el View
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button, ListItem, FAB } from "@rneui/base"
import { useState } from "react";
import { getAllContacts } from "../rest_client/contactos.js";

// DEfinicion del componente
export const ContactList = ({ navigation }) => {

    // Es una variable de estado
    // Se cre aun objeto para ver que tal
    const [contactsList, setContactList] = useState([]);

    // Funcion que retorne un dir
    const ContacItem = ({ contac }) => {
        return <ListItem>
            <ListItem.Content>
                <ListItem.Title>{contac.nombre} {contac.apellido}</ListItem.Title>
                <ListItem.Subtitle>{contac.celular}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    }


    fnRefreshList = (contacts) => {
        console.log("Refrescar lista!!", contacts)
        setContactList(contacts);

    }


    return <View style={styles.container}>
        <Text>LISTA DE CONTACTOS!</Text>
        <Button
            title="Consultar"
            onPress={() => {
                getAllContacts(fnRefreshList);
            }}
        />
        <FlatList
            data={contactsList}
            renderItem={({ item }) => {
                return <ContacItem contac={item} />
            }}
        />

        <FAB
            title="+"
            onPress={() => { navigation.navigate("ContactsFormNav") }}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column', // Principal eje vertical
        alignItems: 'stretch', // eje secundario
        justifyContent: 'flex-start', // JP
    },
});