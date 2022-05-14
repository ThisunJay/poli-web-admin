import axios from 'axios'
import Config from './config.json'
import { getToken } from '../controllers/user.controller'

const config = {
    headers: { Authorization: `Bearer ${getToken()}` }
};

export const createUserAPI = async (data) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/users/create`;
        try {
            let result = await axios.post(apiUrl, data);
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

export const resetPassword = async (data) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/users/password/reset`;
        try {
            let result = await axios.patch(apiUrl, data, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}