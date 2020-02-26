import axios from "axios";
import { API_URL} from "../../Constants"

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {
    createBasicAuthToken(username, password){
        return 'Basic ' + window.btoa(username + ":" + password)
    }
    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }
    
    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`,{
            username,
            password
        })
    }

    registerSuccesfullLoginForJwt(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setUpAxiosInterceptors(this.createJwtToken(token))
    }

    createJwtToken(token){
        return 'Bearer ' + token
    }

    registerSuccesfullLogin(username, password) {
        console.log("registerSuccesfullLogin");
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)

        this.setUpAxiosInterceptors(this.createBasicAuthToken(username, password))
    }
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return false;
        return true;
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return '';
        return user;
    }
    setUpAxiosInterceptors(basicAuthHeader) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }
}

export default new AuthenticationService()