
const BASE_URL = 'http://127.0.0.1:4000';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            password,
            email
        })
    }).then(res => {
        if(res.ok) {
            return res.json();
        } else {
            console.log(res.status)
        }
    }).then(res => {
        return res;
    })
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            password,
            email
        })
    }).then(res => {
        if(res.status === 200) {
            return res.json();
        } else {
            console.log(res.status)
        }
    }).then(data => {
        if (data) {
            // localStorage.setItem('token', data.token);
            return data;
        } else {
            return;
        }
    })
}

export const getToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //  authorization: `Bearer ${token}`
        },
        credentials: 'include'
    }).then(res => {
        if(res.status === 200) {
            return res.json();
        } else {
            console.log(res.status)
        }
    }).then(data => {
        return data;
    })
}
