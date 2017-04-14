import accessTokenStorage from './accessTokenStorage';
import FetchApi from './fetchApi';

class StravaApi extends FetchApi {
    constructor(accessToken = accessTokenStorage.get()) {
        super({'Authorization': `Bearer ${accessToken}`});
    }
}

export default StravaApi;
