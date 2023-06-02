
const connect = async () => {
    console.log('Mocked connect');
   
}

const disconnect = async() =>{
    console.log('Mocked disconnect');
}

const findUser = async (obj) => {
    return Promise.resolve(
        {
           
            firstName: "Jhurs",
            lastName: "Magsayo",
            address: "Iba",
            city: "Iba",
            state: "Zambales",
            zipCode: "2201",
            email: "jhurs@gmmail.com",
            password: "123",
        }
    )
};

const saveUser = async (newUser) => {
    return Promise.resolve(
        {
           
            firstName: "Jhurs",
            lastName: "Magsayo",
            address: "Iba",
            city: "Iba",
            state: "Zambales",
            zipCode: "2201",
            email: "jhurs@gmmail.com",
            password: "123",
        }
    )
};
module.exports = {connect, disconnect, findUser, saveUser}