function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response.statusText);
    }
}

function json(response) {
    return response.json();
}

class StravaApi {
    constructor(accessToken){
        this.accessToken = accessToken;
    }

    request(url) {
        return fetch(url, {
            method: 'get',
            headers: {
                "Authorization": `Bearer ${this.accessToken}`
            }
        }).then(status).then(json);
    }
}

export default StravaApi;