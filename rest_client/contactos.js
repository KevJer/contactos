const IP = "192.168.100.16";
const PORT = 3001;
const URL = "http://" + IP + ":" + PORT + "/";

export const getAllContacts = (fnRefreshList) => {
    console.log("getAllContacts..");
    fetch(
        URL + "contactos"
    ).then(
        (response) => { return response.json() }
    ).then(
        (body) => {
            console.log(body);
            fnRefreshList(body);
        }
    )
}


export const saveContactRest = (contac, fnShowMessage) => {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            nombre: contac.name,
            apellido: contac.surname,
            celular: contac.phoneNumber

        })
    }
    fetch(
        URL + "contactos", config
    )
        .then(repsonse => repsonse.json())
        .then(body => {
            fnShowMessage();
            console.log(body)
        })
}