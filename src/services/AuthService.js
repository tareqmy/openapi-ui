import {USER_LOGIN_URL} from "../helpers/Constant";
import {apiUserAuth} from "../helpers/Utils";
import publicAPI from "../rest_handlers/publicAPI";

export default class AuthService {

    static login(data) {
        let _data = new URLSearchParams();
        _data.append('grant_type', 'password');
        _data.append('username', data.username);
        _data.append('password', data.password);

        return publicAPI.post(USER_LOGIN_URL, _data, {headers: apiUserAuth()});
    }

    static async refreshToken(refreshToken) {
        let _data = new URLSearchParams();
        _data.append('grant_type', 'refresh_token');
        _data.append('refresh_token', refreshToken);

        try {
            const res = await publicAPI.post(USER_LOGIN_URL, _data, {headers: apiUserAuth()});
            return res.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

}