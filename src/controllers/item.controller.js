import axios from 'axios'

import Config from './config.json'

export const getAllAvailableItems = async () => {
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/item/getAvail`;
        try {
            let result = await axios.get(apiUrl);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}