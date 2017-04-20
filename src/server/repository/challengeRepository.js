'use strict';

class ChallengeRepository {
    constructor(db) {
        this._db = db;
    }

    getAll() {
        return this._db.collection('challenges').find().toArray();
    }

    get(id) {
        return this._db.collection('challenges').findOne({id: id});
    }

    addAthlete(challengeID, athlete) {
        this._db.collection('challenges').updateOne({id: challengeID}, {$push: {athletes: athlete}});
    }
}
module.exports = ChallengeRepository;