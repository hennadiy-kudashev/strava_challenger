import ServerApi from "./serverApi";

class UserApi extends ServerApi {
    constructor() {
        super();
    }

    updateToken(data) {
        const {athlete, access_token} = data;
        return super.post(`/api/users/${athlete.id}/change_token/`, {token: access_token});
    }
}

export default UserApi;
