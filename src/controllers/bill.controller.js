import axios from 'axios'

const host = "http://127.0.0.1:5000";

export const getAllBills = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${host}/bill/getAll`;
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
        let apiUrl = `${host}/bill/create`;
        try {
            let result = await axios.post(apiUrl, data);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}