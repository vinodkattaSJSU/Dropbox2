const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';


const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log("jkadhkjasckjnacadlvndslzmlz"+res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doSignup = (payload) =>
    fetch(`${api}/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log("fffffffffffffffffff"+res);
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const logout = () =>
    fetch(`${api}/logout`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials:'include'
    }).then(res => {
        return res.status;
        //res.data;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });



export const uploadFile = (payload) =>
    fetch(`${api}/upload`, {
        method: 'POST',
            body:payload,
            credentials:'include'

    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });
export const getImages = () =>
    fetch(`${api}/display`,{credentials:'include'})
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });
