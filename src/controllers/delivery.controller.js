import axios from 'axios'
import Config from './config.json'

export const getAllDeliveries = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/delivery/getAll`;
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
        let apiUrl = `${Config.host}/delivery/get/${id}`;
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
        let apiUrl = `${Config.host}/delivery/update/${id}`;
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
        let apiUrl = `${Config.host}/delivery/create`;
        try {
            let result = await axios.post(apiUrl, data);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}