import { View, Text, StyleSheet, Alert } from "react-native";
import { Input, Button } from "@rneui/base";
import { useState, useEffect, useContext } from "react";
import {
    deleteContactRest,
    saveContactRest,
    updateContactRest,
} from "../rest_client/contactos.js";
import { UserContext } from "../context/Contex.js";

export const ContacsForm = ({ navigation, route }) => {
    let contactRetrieved = route.params.contacParam;
    let isNew = true;
    if (contactRetrieved != true) {
        isNew = false;
    }
    const { user, hanldeInformation } = useContext(UserContext)

    const [infomationUser, setInfomationUser] = useState({ nombre: user?.nombre ? "" : null })

    // Variable de estado
    const [name, setName] = useState(isNew ? null : contactRetrieved.nombre);
    const [surname, setSurname] = useState(
        isNew ? null : contactRetrieved.apellido
    );
    const [phoneNumber, setPhoneNumber] = useState(
        isNew ? null : contactRetrieved.celular
    );

    // Funcion para refewscar mensajes
    const showMessage = (messaje) => {
        Alert.alert(
            "CONFIRMACION",
            messaje
        );
        navigation.goBack();
    };

    const saveContact = () => {
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

    const confirmContact = () => {
        Alert.alert("CONFIRMACION", "Esta seguro que quiere eliminar", [
            {
                text: "Si",
                onPress: deleteContact,
            },
            { text: "Cancelar" },
        ]);
    };
    const deleteContact = () => {
        console.log("BORARANDO EL CONTACTO");
        deleteContactRest({ id: contactRetrieved }, showMessage);
    };

    const handelNombre = (value) => {
        let validacion = value
        setInfomationUser({
            ...infomationUser,
            nombre: validacion
        })
    }

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
                value={infomationUser.nombre ? infomationUser.nombre : ""}
                label={nombre}
                onChangeText={(value) => {
                    handelNombre(value)
                }} />
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
            <Button title="GUARDAR" onPress={isNew ? saveContact : updateContact} />

            {isNew ? (
                <View></View>
            ) : (
                <Button title={"ELIMINAR"} onPress={confirmContact} />
            )}
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
