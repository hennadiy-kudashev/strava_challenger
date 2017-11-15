'use strict';

const ObjectId = require('mongodb').ObjectId;

class UserRepository {
    constructor(db) {
        this._db = db;
    }

    getUserCollection(){
        return this._db.collection('users');
    }

    getAll() {
        return this.getUserCollection().find().toArray();
    }

    get(id) {
        return this.getUserCollection.findOne({_id: ObjectId(id)});
    }

    create(user) {
        return this.getUserCollection().insertOne(user).then(item=> {
            user._id = item.insertedId;
            return user;
        });
    }

    update(userID, user) {
        delete user._id;
        return this.getUserCollection().findOneAndUpdate({_id: ObjectId(userID)}, {$set: user},{returnOriginal:false})
            .then(item=>item.value);
    }
}
module.exports = UserRepository;
