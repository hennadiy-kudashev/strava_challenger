import FetchApi from './fetchApi';

class ChallengeApi extends FetchApi{
    getAll() {
        return super.get('/api');
    }
}

export default ChallengeApi;
