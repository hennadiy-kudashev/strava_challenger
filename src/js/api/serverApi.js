import FetchApi from "./fetchApi";
import accessTokenStorage from "./accessTokenStorage";

class ServerApi extends FetchApi {
    constructor() {
        super({
            'x-access-token': `${accessTokenStorage.get()}`,
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }, body=> JSON.stringify(body));
    }
}

export default ServerApi;
