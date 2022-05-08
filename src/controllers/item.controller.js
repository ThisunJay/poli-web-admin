import axios from 'axios'

const host = "http://127.0.0.1:5000";

export const getAllAvailableItems = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${host}/item/getAvail`;
        try {
            let result = await axios.get(apiUrl);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}