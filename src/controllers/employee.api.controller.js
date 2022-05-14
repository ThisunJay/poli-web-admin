import axios from 'axios'
import Config from './config.json'
import { getToken } from '../controllers/user.controller'

const config = {
    headers: { Authorization: `Bearer ${getToken()}` }
};

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

export const getAllEmployees = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/employees/getall`;
        try {
            let result = await axios.get(apiUrl, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const getOneEmployee = async (id) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/employees/get/${id}`;
        try {
            let result = await axios.get(apiUrl, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const deleteOneEmployee = async (id) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/employees/delete/${id}`;
        try {
            let result = await axios.delete(apiUrl, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const createEmployee = async (data) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/employees/create`;
        try {
            let result = await axios.post(apiUrl, data, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const updateEmployee = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/employees/update/${id}`;
        try {
            let result = await axios.patch(apiUrl, data, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}