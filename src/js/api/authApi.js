import ServerApi from "./serverApi";

class AuthApi extends ServerApi {
    constructor() {
        super();
    }

    getUrl() {
        return super.get(`/api/auth`);
    }
    
    auth(code) {
        return super.post(`/api/auth`, {code: code});
    }
}

export default AuthApi;
