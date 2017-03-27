const challenges = [{
    id: '0',
    displayName: '2017 km in 2017 year',
    athletes: [
        {
            id: 18192624,
            token: '2d86cee021852379115518352e9f9596eed897e6'
        },
        {
            id: 14419142,
            token: 'd7b559ae4e23f2e5eac0f47b9871a0c3f69bb4b3'
        }
    ],
    criteria: {
        datetime: {
            after: '2017-01-01T00:00:00Z',
            before: '2017-12-31T23:59:59Z'
        },
        threshold: {
            distance: 2017000
        }
    },
    views: ['total', 'monthDistance', 'monthDistanceChart']
}, {
    id: '1',
    displayName: 'March Distance Challenge',
    athletes: [
        {
            id: 18192624,
            token: '2d86cee021852379115518352e9f9596eed897e6'
        },
        {
            id: 14419142,
            token: 'd7b559ae4e23f2e5eac0f47b9871a0c3f69bb4b3'
        }
    ],
    criteria: {
        datetime: {
            after: '2017-03-01T00:00:00Z',
            before: '2017-03-31T23:59:59Z'
        },
        threshold: {
            distance: 200000
        }
    },
    views: ['total']
}, {
    id: '2',
    displayName: 'Climb 24 km in 2017 year',
    athletes: [
        {
            id: 18192624,
            token: '2d86cee021852379115518352e9f9596eed897e6'
        },
        {
            id: 14419142,
            token: 'd7b559ae4e23f2e5eac0f47b9871a0c3f69bb4b3'
        }
    ],
    criteria: {
        datetime: {
            after: '2017-01-01T00:00:00Z',
            before: '2017-12-31T23:59:59Z'
        },
        threshold: {
            total_elevation_gain: 24000
        }
    },
    views: ['total']
}, {
    id: '3',
    displayName: 'March Climb Challenge',
    athletes: [
        {
            id: 18192624,
            token: '2d86cee021852379115518352e9f9596eed897e6'
        }
    ],
    criteria: {
        datetime: {
            after: '2017-03-01T00:00:00Z',
            before: '2017-03-31T23:59:59Z'
        },
        threshold: {
            total_elevation_gain: 2000
        }
    },
    views: ['total']
}];
class ChallengeApi {
    getAll() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], challenges));
            }, 1000);
        });
    }
}

export default ChallengeApi;
