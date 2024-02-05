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
import { getAllLaptops } from "../rest_client/contactos.js";
import { useContext } from "react";
import { UserContext } from "../context/Contex.js";

// DEfinicion del componente
export const ContactsList = ({ navigation }) => {
  const { user, hanldeInformation } = useContext(UserContext);

  // Es una variable de estado
  // Se cre aun objeto para ver que tal
  const [LaptopList, setLaptopsList] = useState([]);
  let LAPTOPS = user ? user.updateLaptops : [];

  useEffect(() => {
    getAllLaptops(fnRefreshList);
  }, []);

  const actualizarUsuario = () => {
    console.log("asdasdasd  ", user?.updateLaptops);

    getAllLaptops(fnRefreshList);
  };

  fnRefreshList = (laptos) => {
    setLaptopsList(laptos);
    let updateLaptops = { ...user, updateLaptops: laptos };
    hanldeInformation(updateLaptops);
  };

  const ItemLaptops = ({ veamos }) => {

    return (
      <TouchableHighlight
        style={styles.containers}
        onPress={() => {
            navigation.navigate("ContactsFormNav", { contacParam: veamos });
        }}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>
              {veamos?.marca} {veamos?.procesador}
            </ListItem.Title>
            <ListItem.Subtitle>
              {veamos?.memoria} {veamos?.disco}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <Text>LISTA DE CONTACTOS!</Text>
      <Button title="Consultar" onPress={actualizarUsuario} />
      <View style={styles.containers}>
        <FlatList
          data={LAPTOPS}
          renderItem={({ item }) => {
            return <ItemLaptops veamos={item} />;
          }}
        />
      </View>

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
  body: {
    flex: 1,
    //backgroundColor: "red",
    flexDirection: "column", // Principal eje vertical
    alignItems: "stretch", // eje secundario
    justifyContent: "flex-start", // JP
  },
});
