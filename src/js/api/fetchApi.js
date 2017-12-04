function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        throw {
            response
        };
    }
}

function json(response) {
    if (response.status != 204) {
        return response.json();
    }
}

class FetchApi {
    constructor(headers = {}, bodyConverter=body=>body) {
        this.headers = headers;
        this.bodyConverter = bodyConverter;
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
            headers: this.headers,
            body: this.bodyConverter(body)
        }).then(status).then(json);
    }

    /**
     * Make PUT ajax request.
     * @param url - requested url
     * @param body - object {key: value}
     * @returns {Promise.<TResult>}
     */
    put(url, body) {
        return fetch(url, {
            method: 'put',
            headers: this.headers,
            body: this.bodyConverter(body)
        }).then(status).then(json);
    }
    
    /**
     * Make DELETE ajax request.
     * @param url - requested url
     * @param body - object {key: value}
     * @returns {Promise.<TResult>}
     */
    remove(url, body = {}) {
        return fetch(url, {
            method: 'delete',
            headers: this.headers,
            body: this.bodyConverter(body)
        }).then(status).then(json);
    }
}

export default FetchApi;
