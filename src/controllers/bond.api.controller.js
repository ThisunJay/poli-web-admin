import axios from 'axios'
import Config from './config.json'
import { getToken } from '../controllers/user.controller'

const config = {
    headers: { Authorization: `Bearer ${getToken()}` }
};

export const getAllClients = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/clients/getall`;
        try {
            let result = await axios.get(apiUrl, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const getAllBonds = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/bonds/getall`;
        try {
            let result = await axios.get(apiUrl, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const getOneBond = async (id) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/bonds/get/${id}`;
        try {
            let result = await axios.get(apiUrl, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const createBond = async (data) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/bonds/create`;
        try {
            let result = await axios.post(apiUrl, data, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const updateBond = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/bonds/update/${id}`;
        try {
            let result = await axios.patch(apiUrl, data, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}