import axios from 'axios'

const host = "http://127.0.0.1:5000";

export const getAllDeliveries = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${host}/delivery/getAll`;
        try {
            let result = await axios.get(apiUrl);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const getDeliveryByBillID = async (id) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${host}/delivery/get/${id}`;
        try {
            let result = await axios.get(apiUrl);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const updateDeliveryState = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${host}/delivery/update/${id}`;
        try {
            let result = await axios.patch(apiUrl, data);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const createDelivery = async (data) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${host}/delivery/create`;
        try {
            let result = await axios.post(apiUrl, data);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}