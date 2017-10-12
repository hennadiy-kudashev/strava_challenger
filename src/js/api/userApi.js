import ServerApi from "./serverApi";

class UserApi extends ServerApi {
    constructor() {
        super();
    }

    auth(code) {
        return super.post(`/api/users/auth`, {code: code});
    }
}

export default UserApi;
