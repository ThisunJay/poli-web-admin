import axios from 'axios'
import Config from './config.json'

export const getAllBills = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/bill/getAll`;
        try {
            let result = await axios.get(apiUrl);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

export const createBill = async (data) => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/bill/create`;
        try {
            let result = await axios.post(apiUrl, data);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}