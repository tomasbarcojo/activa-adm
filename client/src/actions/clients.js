import IP from '../IP.js'

export const getClients = (token) => async dispatch => {
    try {
        await fetch(`http://${IP}:3001/clients`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        })
        .then(data => data.json())
        .then(res => {
            if (res.status === 200) {
                dispatch({
                    type: 'GET_CLIENTS',
                    payload: res.clients
                })
            } 
            // else {
            //     console.error('No clients')
            // }
        })
    } catch (err) {
        console.log(err)
    }
}

export const addClient = (token) => async dispatch => {
    try {
        await fetch(`http://${IP}:3001/clients`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        })
        .then(data => data.json())
        .then(res => {
            if (res.status === 200) {
                dispatch({
                    type: 'CREATE_CLIENT',
                    payload: res.client
                })
            } 
            // else {
            //     console.error('No suppliers')
            // }
        })
    } catch (err) {
        console.log(err)
    }
}