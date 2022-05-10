import axios from 'axios'
import Config from './config.json'
import Cookies from "js-cookie";

//login
export const login = async (data) => {
    console.log(data);
    return new Promise(async (resolve, reject) => {
        let apiUrl = `${Config.host}/users/login`;
        try {
            let result = await axios.post(apiUrl, data);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
}

// set cookies
export const setCookies = (token, data) => {
    var secureState = false;
    Cookies.set("fullName", btoa(data.fullName), { expires: 30, secure: secureState });
    Cookies.set("email", btoa(data.email), { expires: 30, secure: secureState });
    Cookies.set("type", btoa(data.userType), { expires: 30, secure: secureState });
    Cookies.set("token", token, { expires: 30, secure: secureState });
    Cookies.set("con", btoa(data.contactNumber), { expires: 30, secure: secureState });

}

// check sign in
export const checkSignedIn = () => {
    if (
        Cookies.get("fullName") === undefined ||
        Cookies.get("email") === undefined ||
        Cookies.get("type") === undefined ||
        Cookies.get("token") === undefined ||
        Cookies.get("con") === undefined
    ) {
        return false;
    } else {

        return true;
    }
}

//sign out
export const signOut = () => {
    Cookies.remove("fullName");
    Cookies.remove("email");
    Cookies.remove("type");
    Cookies.remove("token");
    Cookies.remove("con");

}

// get token
export const getToken = () => {
    if (Cookies.get("token") != null || Cookies.get("token") != undefined) {
        return Cookies.get("token");
    }
    return false;
}

// get user
export const getUserdetails = () => {
    let user = {
        "fullName": atob(Cookies.get("fullName")),
        "email": atob(Cookies.get("email")),
        "type": atob(Cookies.get("type")),
        "con": atob(Cookies.get("con"))
    }
    return user
}