const ChallengeRepository = require('../repository/challengeRepository');
const challengeDTO = require('../dto/challengeDTO');
const StravaService = require('../service/stravaService');
const UserRepository = require('../repository/userRepository');
const ActivityDTO = require('../dto/activityDTO');
const AthleteInfoDTO = require('../dto/athleteInfoDTO');
const ChallengeRequestDTO = require('../dto/challengeRequestDTO');

function wrap(promise, response) {
  promise.then(
    result => {
      response.json(result);
    },
    error => {
      response.status(500).send({ error });
    });
}

module.exports.register = function (router, db) {
  const challengeRepository = new ChallengeRepository(db);
  const userRepository = new UserRepository(db);
  router.route('/challenges')
    .get(function (request, response) {
      const athleteID = request.strava.athleteID;
      wrap(challengeRepository.getAll().then(items => items.map(item => challengeDTO.create(athleteID, item)).filter(t => !!t)), response);
    })
    .put(function (request, response) {
      const challenge = request.body;
      const athleteID = request.strava.athleteID;
      wrap(challengeRepository.create(ChallengeRequestDTO.create(athleteID, challenge)).then(item => challengeDTO.create(athleteID, item)), response);
    });
  router.route('/challenges/:challengeID')
    .get(function (request, response) {
      const challengeID = request.params.challengeID;
      wrap(challengeRepository.get(challengeID), response);
    })
    .post(function (request, response) {
      const challengeID = request.params.challengeID;
      const challenge = request.body;
      const athleteID = request.strava.athleteID;
      wrap(challengeRepository.update(challengeID, ChallengeRequestDTO.create(athleteID, challenge)).then(item => challengeDTO.create(athleteID, item)), response);
    })
    .delete(function (request, response) {
      const challengeID = request.params.challengeID;
      const athleteID = request.strava.athleteID;
      challengeRepository.remove(challengeID, athleteID).then(() => {
        response.status(204).end();
      }, error => {
        response.status(500).send({ error });
      });
    });

  const getActivities = (user, criteria) => {
    return new StravaService(user.accessToken).getActivities(
      new Date(criteria.datetime.after),
      new Date(criteria.datetime.before),
      criteria.type)
      .then(activities => {
        return {
          info: AthleteInfoDTO.create(user),
          activities: activities.map(activity => ActivityDTO.create(activity))
        };
      }).catch(error => {
        //error in case of after datetime criterion is bigger than now
        console.error(error);
        return {
          info: AthleteInfoDTO.create(user),
          activities: []
        };
      });
  };
  const getUsersWithActivities = async (athletes, criteria) => {
    const users = await Promise.all(athletes.map(athlete => userRepository.getByAthleteID(athlete.id)));
    return await Promise.all(users.map(user => {
      if (!user.expiresAt || new Date(user.expiresAt * 1000) < Date.now()) {
        return StravaService.refreshToken(user.refreshToken || user.accessToken)
          .then(data => {
            const accessToken = data.access_token;
            const refreshToken = data.refresh_token;
            const expiresAt = data.expires_at;
            return userRepository.update(user._id, { accessToken, refreshToken, expiresAt })
              .then(updatedUser => {
                return  getActivities(updatedUser, criteria);
              });
          }).catch(error => {
            console.error(`Token for athlete '${user.firstname} ${user.lastname}' is not refreshable`);
            return {
              info: AthleteInfoDTO.create(user),
              activities: []
            };
          });
      }
      return getActivities(user, criteria);
    }));
  };
  router.route('/challenges/:challengeID/athletes')
    .get(async (request, response) => {
      try {
        const challengeID = request.params.challengeID;
        const { athletes = [], criteria } = await challengeRepository.get(challengeID);
        const usersWithActivities = await getUsersWithActivities(athletes, criteria);
        response.status(200).send(usersWithActivities);
      } catch (error) {
        response.status(500).send({ error });
      }
    })
    .put(async (request, response) => {
      try {
        const challengeID = request.params.challengeID;
        const athleteID = request.strava.athleteID;
        const { criteria } = await challengeRepository.addAthlete(challengeID, { id: athleteID });
        const usersWithActivities = await getUsersWithActivities([{ id: athleteID }], criteria);
        response.status(200).send(usersWithActivities[0]);
      } catch (error) {
        response.status(500).send({ error });
      }
    });
};
