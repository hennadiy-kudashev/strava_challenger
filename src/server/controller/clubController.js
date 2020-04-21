const StravaService = require('../service/stravaService');
const ClubDTO = require('../dto/clubDTO');

module.exports.register = function (router, db) {
  router.route('/clubs')
    .get(async (request, response) => {
      try {
        const accessToken = request.strava.accessToken;
        const stravaService = new StravaService(accessToken);
        const clubs = await stravaService.getAthleteClubs();
        response.status(200).send(clubs.map(club => ClubDTO.create(club)));
      } catch (error) {
        response.status(500).send({ error });
      }
    });
};
