import { View, Text, StyleSheet, Alert } from "react-native";
import { Input, Button } from "@rneui/base";
import { useState, useEffect } from "react";
import {
    saveContactRest,
    updateContactRest,
} from "../rest_client/contactos.js";

export const ContacsForm = ({ navigation, route }) => {
    let contactRetrieved = route.params.contacParam;
    let isNew = true;
    if (contactRetrieved != true) {
        isNew = false;
    }

    // Variable de estado
    const [name, setName] = useState(isNew ? null : contactRetrieved.nombre);
    const [surname, setSurname] = useState(
        isNew ? null : contactRetrieved.apellido
    );
    const [phoneNumber, setPhoneNumber] = useState(
        isNew ? null : contactRetrieved.celular
    );

    // Funcion para refewscar mensajes
    const showMessage = () => {
        Alert.alert(
            "CONFIRMACION",
            isNew ? "Se creo el Contacto" : "Contanto Actualizado"
        );
        navigation.goBack();
    };

    const createContact = () => {
        console.log("SaveContact");
        saveContactRest(
            {
                name: name,
                surname: surname,
                phoneNumber: phoneNumber,
            },
            showMessage
        );
    };
    const updateContact = () => {
        console.log("Actualizando Contacto");
        updateContactRest(
            {
                id: contactRetrieved.id,
                name: name,
                surname: surname,
                phoneNumber: phoneNumber,
            },
            showMessage
        );
    };

    return (
        <View style={styles.container}>
            <Input
                value={name}
                placeholder="NOMBRE"
                onChangeText={(value) => {
                    setName(value);
                }}
            />
            <Input
                value={surname}
                placeholder="APELLIDO"
                onChangeText={(value) => {
                    setSurname(value);
                }}
            />
            <Input
                value={phoneNumber}
                placeholder="TELEFONO"
                onChangeText={(value) => {
                    setPhoneNumber(value);
                }}
            />
            <Button title="GUARDAR" onPress={isNew ? createContact : updateContact} />


            {isNew && <View><Button title={"ELIMINAR"} /></View>}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
