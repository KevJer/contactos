// Importar el View
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableHighlight,
} from "react-native";
import { Button, ListItem, FAB } from "@rneui/base";
import { useState, useEffect } from "react";
import { getAllContacts } from "../rest_client/contactos.js";
import { useContext } from "react";
import { UserContext } from "../context/Contex.js";

// DEfinicion del componente
export const ContactsList = ({ navigation }) => {
    const { user, hanldeInformation } = useContext(UserContext);

    // Es una variable de estado
    // Se cre aun objeto para ver que tal
    const [contactsList, setContactList] = useState([]);

    useEffect(() => {
        console.log("---------------");
        console.log(user?.userInformation?.apellido);
        // console.log(user?.userInformation[0].nombre);
        console.log("---------------");


        console.log("*******************");
        console.log(user)
        console.log("*******************");
        // console.log("Ejecuto la funcion de useEffect");
        getAllContacts(fnRefreshList);
    }, []);

    // Funcion que retorne un dir
    const ContacItem = ({ contac }) => {
        return (
            <TouchableHighlight
                onPress={() => {
                    navigation.navigate("ContactsFormNav", { contacParam: contac });
                }}
            >
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>
                            {contac.nombre} {contac.apellido}
                        </ListItem.Title>
                        <ListItem.Subtitle>{contac.celular}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </TouchableHighlight>
        );
    };

    fnRefreshList = (contacts) => {
        console.log("Refrescar lista!!", contacts);
        setContactList(contacts);
    };

    return (
        <View style={styles.container}>
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
                    return <ContacItem contac={item} />;
                }}
            />

            <Text>{user?.userInformation?.apellido}</Text>
            <Text>{user?.userInformation?.celular}</Text>
            <FAB
                title="+"
                onPress={() => {
                    navigation.navigate("ContactsFormNav", {});
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column", // Principal eje vertical
        alignItems: "stretch", // eje secundario
        justifyContent: "flex-start", // JP
    },
});
