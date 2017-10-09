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
        return this._db.collection('challenges').updateOne({_id: ObjectId(challengeID)}, {$push: {athletes: athlete}});
    }

    updateUserToken(userID, token) {
        return this._db.collection('challenges').updateMany({athletes: {$elemMatch: {id: parseInt(userID)}}}, {
            $set: {
                "athletes.$.token": token
            }
        });
    }

    create(challenge) {
        challenge.athletes=[];
        return this._db.collection('challenges').insertOne(challenge).then(item=> {
            challenge._id = item.insertedId;
            return challenge;
        });
    }

    update(challenge) {
        const challengeID = challenge._id;
        delete challenge._id;
        return this._db.collection('challenges').findOneAndUpdate({_id: ObjectId(challengeID)}, {$set: challenge},{returnOriginal:false})
            .then(item=>item.value);
    }

    remove(challengeID) {
        return this._db.collection('challenges').removeOne({_id: ObjectId(challengeID)});
    }
}
module.exports = ChallengeRepository;
