import axios from 'axios'
import Config from './config.json'
import { getToken } from '../controllers/user.controller'

const config = {
    headers: { Authorization: `Bearer ${getToken()}` }
};

export const getAllCollectors = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/users/get/collectors`;
        try {
            let result = await axios.get(apiUrl, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/users/getall`;
        try {
            let result = await axios.get(apiUrl, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const getAllClients = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/clients/getAll`;
        try {
            let result = await axios.get(apiUrl, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}