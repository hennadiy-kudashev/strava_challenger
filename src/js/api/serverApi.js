import FetchApi from "./fetchApi";

class ServerApi extends FetchApi {
    constructor() {
        super({
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }, body=> JSON.stringify(body));
    }
}

export default ServerApi;
