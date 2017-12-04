import ServerApi from "./serverApi";

class UserApi extends ServerApi {
    constructor() {
        super();
    }

    getAuthUser() {
        return super.get(`/api/users`);
    }
}

export default UserApi;
