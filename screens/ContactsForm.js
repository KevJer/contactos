import { View, Text, StyleSheet, Alert } from "react-native";
import { Input, Button } from "@rneui/base";
import { useState, useEffect, useContext } from "react";
import {
  deleteLaptopRest,
  saveLaptopRest,
  updateLaptopRest,
} from "../rest_client/contactos.js";
import { UserContext } from "../context/Contex.js";

export const ContacsForm = ({ navigation, route }) => {

  let laptopRetrived = route.params.contacParam  ;
  let isNew = true;
  if (laptopRetrived != null) {
    isNew = false;
  }

  const { user, hanldeInformation } = useContext(UserContext);

  // Variable de estado
  const [infomationUser, setInfomationUser] = useState({
    marca: isNew ? null : user?.marca || laptopRetrived?.marca || "",
    procesador: isNew
      ? null
      : user?.procesador || laptopRetrived?.procesador || "",
    memoria: isNew ? null : user?.memoria || laptopRetrived?.memoria || "",
    disco: isNew ? null : user?.disco || laptopRetrived?.disco || "",
  });



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
    saveLaptopRest(
      {
        marca: infomationUser.marca,
        procesador: infomationUser.procesador,
        memoria: infomationUser.memoria,
        disco: infomationUser.disco,
      },
      showMessage
    );
  };
  const updateContact = () => {
    console.log("Actualizando Contacto");
    updateLaptopRest(
      {
        id: laptopRetrived.id,
        procesador: infomationUser.apellido,
        memoria: infomationUser.celular,
        disco: infomationUser.disco,
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
    console.log("ID SELECIONADA ----------- >>", laptopRetrived.id);
    deleteLaptopRest({ id: laptopRetrived.id }, showMessage);
  };

  const handelMarca = (value) => {
    let validacion = value;
    setInfomationUser({
      ...infomationUser,
      marca: validacion,
    });
  };

  const handelProcesador = (value) => {
    let validacion = value;
    setInfomationUser({
      ...infomationUser,
      procesador: validacion,
    });
  };

  const handelMemoria = (value) => {
    let validacion = value;
    setInfomationUser({
      ...infomationUser,
      memoria: validacion,
    });
  };
  const handelDisco = (value) => {
    let validacion = value;
    setInfomationUser({
      ...infomationUser,
      disco: validacion,
    });
  };

  const createUser = () => {
    isNew ? saveContact() : updateContact();
    try {
      let userInformation = {
        ...infomationUser,
        marca: infomationUser.marca,
        procesador: infomationUser.procesador,
        memoria: infomationUser.memoria,
        disco: infomationUser.disco,
      };
      let updateData = { ...user, userInformation: userInformation };

      hanldeInformation(updateData);
      // navigation.navigate("ContactsListNav");
    } catch (error) {
      console.log("ERROR EN CREATE USER: ", e);
    }
  };
  return (
    <View style={styles.container}>
      <Input
        value={infomationUser.marca}
        placeholder="MARCA"
        onChangeText={(value) => {
          handelMarca(value);
        }}
      />

      <Input
        value={infomationUser.procesador}
        placeholder="PROCESADOR"
        onChangeText={(value) => {
          handelProcesador(value);
        }}
      />

      <Input
        value={infomationUser.memoria}
        placeholder="MEMORIA"
        onChangeText={(value) => {
          handelMemoria(value);
        }}
      />

      <Input
        value={infomationUser.disco}
        placeholder="DISCO"
        onChangeText={(value) => {
          handelDisco(value);
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
