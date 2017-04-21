const KEY = 'accessToken';

class AssessTokenStorage {
    static isExist(){
        return !!this.get();
    }

    static get() {
        return sessionStorage.getItem(KEY);
    }

    static set(accessToken) {
        sessionStorage.setItem(KEY, accessToken);
    }

    static remove() {
        sessionStorage.removeItem(KEY);
    }
}

export default AssessTokenStorage;
