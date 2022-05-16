import axios from 'axios'
import Config from './config.json'
import { getToken } from '../controllers/user.controller'

const config = {
    headers: { Authorization: `Bearer ${getToken()}` }
};

export const getAllLoans = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/loans/getall`;
        try {
            let result = await axios.get(apiUrl, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const createLoan = async (data) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/loans/create`;
        try {
            let result = await axios.post(apiUrl, data, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const getOneLoanDetails = async (id) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/loans/get/${id}`;
        try {
            let result = await axios.get(apiUrl, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const updateLoan = async (id, data) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/loans/update/${id}`;
        try {
            let result = await axios.patch(apiUrl, data, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const getLoanForClient = async (data) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/loans/getInfo`;
        try {
            let result = await axios.post(apiUrl, data, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const getByLoanId = async (id) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/collections/byloan/${id}`;
        try {
            let result = await axios.get(apiUrl, config);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}