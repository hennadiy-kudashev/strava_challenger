const ChallengeRepository = require('../repository/challengeRepository');
const challengeDTO = require('../dto/challengeDTO');
const StravaService = require('../service/stravaService');
const UserRepository = require('../repository/userRepository');
const ActivityDTO = require('../dto/activityDTO');
const AthleteInfoDTO = require('../dto/athleteInfoDTO');
const ChallengeRequestDTO = require('../dto/challengeRequestDTO');
const { canCreateChallenge } = require('../lib/admin');

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
    .get(async (request, response) => {
      try {
        const userID = request.userID;
        const user = await userRepository.get(userID);
        const athleteID = request.strava.athleteID;
        const challenges = await challengeRepository.getAll();
        const visibleChallenges = challenges
          .filter(item => {
            //to filter out private challenges requested by other user.
            if (item.private && item.createdBy !== athleteID) {
              return false;
            }
            //to filter out challenges with club restriction
            if (item.club && !(user.clubs || []).includes(item.club.id)) {
              return false;
            }
            return true;
          })
          .map(item => challengeDTO.create(athleteID, item));
        response.json(visibleChallenges);
      } catch (error) {
        response.status(500).send({ error });
      }
    })
    .put(function (request, response) {
      const challenge = request.body;
      const athleteID = request.strava.athleteID;
      if (!canCreateChallenge(athleteID)) {
        return response.status(403).send({
          message: 'You don not have permission to create challenge.'
        });
      }
      wrap(challengeRepository.create(ChallengeRequestDTO.create(athleteID, challenge)).then(item => challengeDTO.create(athleteID, item)), response);
    });
  router.route('/challenges/:challengeID')
    .get(function (request, response) {
      const challengeID = request.params.challengeID;
      wrap(challengeRepository.get(challengeID), response);
    })
    .post(async (request, response) => {
      try {
        const challengeID = request.params.challengeID;
        const challenge = request.body;
        const athleteID = request.strava.athleteID;

        const existedChallenge = await challengeRepository.get(challengeID);
        if (existedChallenge.createdBy !== athleteID) {
          return response.status(403).send({
            message: 'You don not have permission to edit challenge.'
          });
        }
        const challengeToSave = ChallengeRequestDTO.create(athleteID, challenge);
        const updatedChallenge = await challengeRepository.update(challengeID, challengeToSave);
        response.json(challengeDTO.create(athleteID, updatedChallenge));
      } catch (error) {
        response.status(500).send({ error });
      }
    })
    .delete(async (request, response) => {
      try {
        const challengeID = request.params.challengeID;
        const athleteID = request.strava.athleteID;
        const existedChallenge = await challengeRepository.get(challengeID);
        if (existedChallenge.createdBy !== athleteID) {
          return response.status(403).send({
            message: 'You don not have permission to remove challenge.'
          });
        }
        await challengeRepository.remove(challengeID, athleteID);
        response.status(204).end();
      } catch (error) {
        response.status(500).send({ error });
      }
    });

  const getActivities = (user, criteria) => {
    return new StravaService(user.accessToken).getActivities(
      new Date(criteria.datetime.after),
      new Date(criteria.datetime.before),
      criteria.types || [criteria.type])
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
                return getActivities(updatedUser, criteria);
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
    })
    .delete(async (request, response) => {
      try {
        const challengeID = request.params.challengeID;
        const athleteId = request.strava.athleteID;
        await challengeRepository.removeAthlete(challengeID, { id: athleteId });
        response.json({ athleteId });
      } catch (error) {
        response.status(500).send({ error });
      }
    });
};
