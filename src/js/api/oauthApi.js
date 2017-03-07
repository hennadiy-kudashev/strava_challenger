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

const clientID = 15685;
const clientSecret = 'd3f4e396495ae1f84389594b49505ef2abe52557';

class OauthApi {
    static getAuthorizeURL(redirectURL) {
        return `https://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURL}`;
    }
    
    static getToken(code) {
        const url = 'https://www.strava.com/oauth/token';
        const body = `client_id=${clientID}&client_secret=${clientSecret}&code=${code}`;
        return fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: body
        }).then(status).then(json);
    }
}

export default OauthApi;