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
    if (contactRetrieved != null) {
        isNew = false;
    }
    const { user, hanldeInformation } = useContext(UserContext);

    const [infomationUser, setInfomationUser] = useState({
        nombre: user?.nombre ? "" : null,
        apellido: user?.apellido ? "" : null,
        celular: user?.celular ? "" : null,
    });

    // Variable de estado
    const [name, setName] = useState(isNew ? null : contactRetrieved.nombre);
    const [surname, setSurname] = useState(
        isNew ? null : contactRetrieved.apellido
    );
    const [phoneNumber, setPhoneNumber] = useState(
        isNew ? null : contactRetrieved.celular
    );

    useEffect(() => {
        console.log(" GUARDANDO", infomationUser);
    });

    // Funcion para refewscar mensajes
    const showMessage = (messaje) => {
        Alert.alert("CONFIRMACION", messaje);
        navigation.goBack();
    };

    const saveContact = () => {
        console.log("SaveContact");
        saveContactRest(
            {
                name: infomationUser.nombre,
                surname: infomationUser.apellido,
                phoneNumber: infomationUser.celular,
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
        let validacion = value;
        setInfomationUser({
            ...infomationUser,
            nombre: validacion,
        });
    };

    const handelApellido = (value) => {
        let validacion = value;
        setInfomationUser({
            ...infomationUser,
            apellido: validacion,
        });
    };

    const handelPhoneNumbre = (value) => {
        let validacion = value;
        setInfomationUser({
            ...infomationUser,
            celular: validacion,
        });
    };

    const createUser = () => {
        isNew ? saveContact() : updateContact();
        try {
            let userInformation = {
                ...infomationUser,
                nombre: infomationUser.nombre,
                apellido: infomationUser.apellido,
                celular: infomationUser.celular,
            };
            let updateData = { ...user, userInformation: userInformation }

            hanldeInformation(updateData);
            // navigation.navigate("ContactsListNav");

        } catch (error) {
            console.log("ERROR EN CREATE USER: ", e);
        }
    };
    return (
        <View style={styles.container}>

            <Input
                value={infomationUser.nombre ? infomationUser.nombre : ""}
                placeholder="NOMBRE"
                onChangeText={(value) => {
                    handelNombre(value);
                }}
            />
            <Input
                value={infomationUser.apellido ? infomationUser.apellido : ""}
                placeholder="APELLIDO"
                onChangeText={(value) => {
                    handelApellido(value);

                }}
            />
            <Input
                value={infomationUser.celular ? infomationUser.celular : ""}
                placeholder="TELEFONO"
                onChangeText={(value) => {
                    handelPhoneNumbre(value);
                }}
            />
            <Button title="GUARDAR" onPress={createUser} />

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
