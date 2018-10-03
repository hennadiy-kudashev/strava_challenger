const KEY = 'accessToken';

class AssessTokenStorage {
    static isExist(){
        return !!this.get();
    }

    static get() {
        return localStorage.getItem(KEY);
    }

    static set(accessToken) {
      localStorage.setItem(KEY, accessToken);
    }

    static remove() {
      localStorage.removeItem(KEY);
    }
}

export default AssessTokenStorage;
