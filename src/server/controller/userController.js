const ChallengeRepository = require('../repository/challengeRepository');

module.exports.register = function (router, db) {
    const challengeRepository = new ChallengeRepository(db);

    router.route('/users/:userID/change_token')
        .post(function (request, response) {
            const userID = request.params.userID;
            const token = request.body.token;
            challengeRepository.updateUserToken(userID, token).then(()=> {
                response.status(204).end();
            }, error=> {
                response.status(500).send({error});
            });
        });
};
