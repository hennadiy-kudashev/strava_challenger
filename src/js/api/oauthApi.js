import StravaApi from "./stravaApi";

const clientID = 15685;
const clientSecret = 'd3f4e396495ae1f84389594b49505ef2abe52557';

class OauthApi extends StravaApi {
    constructor() {
        super();
    }

    static getAuthorizeURL() {
        const redirectURL = `${window.location.origin}/code_receiver`;
        return `https://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURL}`;
    }

    getToken(code) {
        return super.post('https://www.strava.com/oauth/token',
            {
                'client_id': clientID,
                'client_secret': clientSecret,
                'code': code
            });
    }
}

export default OauthApi;