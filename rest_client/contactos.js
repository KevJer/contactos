//const IP = "192.168.1.5";
const IP = "192.168.68.100";
const PORT = 3001;
const URL = "http://" + IP + ":" + PORT + "/";


// http://192.168.100.32:3001/contactos

export const getAllContacts = (fnRefreshList) => {
    console.log("getAllContacts..");
    // fetch(
    //     URL + "contactos"
    // ).then(
    //     (repsonse => repsonse.json())
    // ).then(
    //     (body) => {
    //         console.log(body);
    //     }
    // )
    fetch(URL + "contactos")
        .then((response) => {
            console.log("ssssssssssssss");
            return response.json();
        })
        .then((body) => {
            console.log(body);
            fnRefreshList(body);
        });
};

export const saveContactRest = (contac, fnShowMessage) => {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: contac.name,
            apellido: contac.surname,
            celular: contac.phoneNumber,
        }),
    };
    fetch(URL + "contactos", config)
        .then(repsonse => repsonse.json())
        .then(body => {
            fnShowMessage("Se ha creado el mensaje");
            console.log(body);
        });
};
export const updateContactRest = (contac, fnShowMessage) => {
    const config = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: contac.id,
            nombre: contac.name,
            apellido: contac.surname,
            celular: contac.phoneNumber,
        }),
    };
    fetch(URL + "contactos/" + contac.id, config)
        .then((repsonse) => repsonse.json())
        .then((body) => {
            fnShowMessage("Contacto Actualizado");
            console.log(body);
        });
};

export const deleteContactRest = (contac, fnShowMessage) => {
    const config = {
        method: "DELETE",
    };
    fetch(URL + "contactos/" + contac.id, config)
        .then((repsonse) => repsonse.json())
        .then((body) => {
            fnShowMessage("Contacto Eliminado");
            console.log(body);
        });
};
