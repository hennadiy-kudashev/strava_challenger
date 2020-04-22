const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/userRepository');
const StravaService = require('../service/stravaService');
const config = require('../config');
const UserDTO = require('../dto/userDTO');

module.exports.register = function (router, db) {
  const userRepository = new UserRepository(db);

  router.route('/auth')
    .get(function (request, response) {
      StravaService.getRequestAccessURL().then(data => {
        response.status(200).send(data);
      }, error => {
        response.status(500).send({ error });
      });
    })
    .post(async (request, response) => {
      try {
        const code = request.body.code;

        const data = await StravaService.getTokenWithAthlete(code);
        const athlete = data.athlete;
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        const expiresAt = data.expires_at;
        const expiresIn = data.expires_in;

        const clubs = await new StravaService(accessToken).getAthleteClubs().map(club => club.id);
        const user = await userRepository.createOrUpdate({ accessToken, refreshToken, expiresAt, clubs, ...athlete });
        const payload = {
          accessToken,
          refreshToken,
          expiresAt,
          athleteID: user.id,
          userID: user._id
        };
        const token = jwt.sign(payload, config.secret, {
          expiresIn: expiresIn // expires in 24 hours
        });
        response.status(201).send({ token, user: UserDTO.create(user) });
      } catch (error) {
        response.status(500).send({ error });
      }
    });
};
