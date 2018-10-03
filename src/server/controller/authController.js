const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/userRepository');
const StravaService = require('../service/stravaService');
const config = require('../config');
const UserDTO = require('../dto/userDTO');

module.exports.register = function (router, db) {
    const userRepository = new UserRepository(db);
    
    router.route('/auth')
        .get(function (request, response) {
            StravaService.getRequestAccessURL().then(data=> {
                response.status(200).send(data);
            }, error=> {
                response.status(500).send({error});
            });
        })
        .post(function (request, response) {
            const code = request.body.code;
            StravaService.getTokenWithAthlete(code).then(data=> {
                const athlete = data.athlete;
                const accessToken = data.access_token;
                userRepository.createOrUpdate({accessToken, ...athlete}).then(user => {
                    const payload = {
                        accessToken,
                        athleteID : user.id,
                        userID: user._id
                    };
                    const token = jwt.sign(payload, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    response.status(201).send({ token, user: UserDTO.create(user)});
                 }, error=> {
                    response.status(500).send({error});
                 });
            }, error=> {
                response.status(500).send({error});
            });
        });
};
