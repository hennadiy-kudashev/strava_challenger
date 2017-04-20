const ChallengeRepository = require('../repository/challengeRepository');

function wrap(promise, response) {
    promise.then(
        result=>{
            response.json(result);
        },
        error=>{
            response.status(500).send({error});
        });
}

module.exports.register = function (router, db) {
    const challengeRepository = new ChallengeRepository(db);
    router.route('/challenges')
        .get(function (request, response) {
            wrap(challengeRepository.getAll(), response);
        });
    router.route('/challenges/:challengeID')
        .get(function (request, response) {
            const challengeID = request.params.challengeID;
            wrap(challengeRepository.get(challengeID), response);
        })
        .post(function (request, response) {
            const challengeID = request.params.challengeID;
            const athlete = request.body;
            challengeRepository.addAthlete(challengeID, athlete);
            response.status(204).end();
        });
};