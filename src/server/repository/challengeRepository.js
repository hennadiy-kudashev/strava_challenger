'use strict';

const ObjectId = require('mongodb').ObjectId;

class ChallengeRepository {
    constructor(db) {
        this._db = db;
    }

    getAll() {
        return this._db.collection('challenges').find().toArray().then(items=> {
            return items.map(item=> {
                //UI uses id
                item.id = item._id;
                return item;
            });
        });
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
}
module.exports = ChallengeRepository;
