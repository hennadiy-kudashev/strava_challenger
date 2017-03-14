import accessTokenStorage from './accessTokenStorage';

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        throw {
            status:response.status, 
            text: response.statusText
        };
    }
}

function json(response) {
    return response.json();
}

class StravaApi {
    constructor() {
        this.headers = {};
        const accessToken = accessTokenStorage.get();
        if (accessToken) {
            this.headers['Authorization'] = `Bearer ${accessToken}`;
        }
    }

    /**
     * Make GET ajax request.
     * @param url - requested url
     * @returns {Promise.<TResult>}
     */
    get(url) {
        return fetch(url, {
            method: 'get',
            headers: this.headers
        }).then(status).then(json);
    }

    /**
     * Make POST ajax request.
     * @param url - requested url
     * @param body - object {key: value}
     * @returns {Promise.<TResult>}
     */
    post(url, body) {
        return fetch(url, {
            method: 'post',
            headers: Object.assign({
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }, this.headers),
            body: Object.keys(body).map(key=> {
                return `${key}=${body[key]}`;
            }).join('&')//key1=value1&key2=value2
        }).then(status).then(json);
    }
}

export default StravaApi;