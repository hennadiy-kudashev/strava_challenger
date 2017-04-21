const ChallengeRepository = require('../repository/challengeRepository');

module.exports.register = function (router, db) {
    const challengeRepository = new ChallengeRepository(db);

    router.route('/user/change_token/:userID')
        .post(function(request, response){
            const athlete = request.body;
            challengeRepository.updateUserToken(athlete);
            response.status(204).end();
        });
};
