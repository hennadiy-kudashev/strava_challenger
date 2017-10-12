const ChallengeRepository = require('../repository/challengeRepository');
const UserRepository = require('../repository/userRepository');
const StravaService = require('../service/stravaService');
function wrap(promise, response) {
    promise.then(
        result=> {
            response.json(result);
        },
        error=> {
            response.status(500).send({error});
        });
}

module.exports.register = function (router, db) {
    const challengeRepository = new ChallengeRepository(db);
    const userRepository = new UserRepository(db);
    const stravaService = new StravaService();

    router.route('/users/auth')
        .post(function (request, response) {
            const code = request.body.code;
            stravaService.getTokenWithAthlete(code).then(data=> {
                const athlete = data.athlete;
                const access_token = data.access_token;
                challengeRepository.updateUserToken(athlete.id, access_token).then(()=> {
                    response.status(201).send(data);
                }, error=> {
                    response.status(500).send({error});
                });
                // userRepository.create(athlete).then((user)=> {
                //     response.status(201).send(data);
                // }, error=> {
                //     response.status(500).send({error});
                // });
            }, error=> {
                response.status(500).send({error});
            });
        });

    router.route('/users')
        .put(function (request, response) {
            const user = request.body;
            userRepository.create(user).then((user)=> {
                response.status(201).send(user);
            }, error=> {
                response.status(500).send({error});
            });
        });

    router.route('/users/:userID')
        .get(function (request, response) {
            const userID = request.params.userID;
            wrap(userRepository.get(userID), response);
        })
        .post(function (request, response) {
            const userID = request.params.userID;
            const user = request.body;
            userRepository.update(userID, user).then(()=> {
                response.status(204).end();
            }, error=> {
                response.status(500).send({error});
            })
        });
};
