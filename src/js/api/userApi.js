import ServerApi from "./serverApi";

class UserApi extends ServerApi {
    constructor() {
        super();
    }

    updateToken(athlete) {
        return super.post(`/api/user/change_token/${athlete.id}`, athlete);
    }
}

export default UserApi;
