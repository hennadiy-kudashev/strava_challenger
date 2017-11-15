import ServerApi from "./serverApi";

class UserApi extends ServerApi {
    constructor() {
        super();
    }

    getUrl() {
        return super.get(`/api/users/auth`);
    }
    
    auth(code) {
        return super.post(`/api/users/auth`, {code: code});
    }
}

export default UserApi;
