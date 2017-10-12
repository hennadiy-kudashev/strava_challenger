import StravaApi from "./stravaApi";

const clientID = 15685;

class OauthApi extends StravaApi {
    constructor() {
        super();
    }

    static getAuthorizeURL() {
        const redirectURL = `${window.location.origin}/code_receiver`;
        return `https://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURL}`;
    }
}

export default OauthApi;