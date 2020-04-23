'use strict';
const ObjectId = require('mongodb').ObjectId;

class ChallengeRepository {
    constructor(db) {
        this._db = db;
    }

    getAll() {
        return this._db.collection('challenges').find().toArray();
    }

    get(id) {
        return this._db.collection('challenges').findOne({_id: ObjectId(id)});
    }

    addAthlete(challengeID, athlete) {
        return this._db.collection('challenges').findOneAndUpdate(
            {_id: ObjectId(challengeID)},
            {$push: {athletes: athlete}},
            {returnOriginal: false}
        ).then(item=>item.value);
    }

    removeAthlete(challengeID, athlete) {
        return this._db.collection('challenges').updateOne(
          {_id: ObjectId(challengeID)},
          {$pull: {athletes: athlete}}
        );
    }

    create(challenge) {
        return this._db.collection('challenges').insertOne(challenge).then(item=> {
            challenge._id = item.insertedId;
            return challenge;
        });
    }

    update(id, challenge) {
        return this._db.collection('challenges').findOneAndUpdate(
            {_id: ObjectId(id)},
            {$set: challenge},
            {returnOriginal: false}
        ).then(item=>item.value);
    }

    remove(challengeID, athleteID) {
        return this._db.collection('challenges').removeOne({_id: ObjectId(challengeID), createdBy: athleteID});
    }
}
module.exports = ChallengeRepository;
