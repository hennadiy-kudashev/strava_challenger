import accessTokenStorage from "../api/accessTokenStorage";

export default {
    auth: {
        code: '',
        error: '',
        access_token: accessTokenStorage.get()
    },
    user: {
        user_name: '',
        full_name: '',
        avatar: ''
    },
    club: {
        members:[]
    }
};
