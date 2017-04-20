import accessTokenStorage from "./accessTokenStorage";
import FetchApi from "./fetchApi";

class StravaApi extends FetchApi {
    constructor(accessToken = accessTokenStorage.get()) {
        super({
                'Authorization': `Bearer ${accessToken}`,
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, body=>Object.keys(body).map(key=> {
                return `${key}=${body[key]}`;
            }).join('&')//key1=value1&key2=value2)
        );
    }
}

export default StravaApi;
