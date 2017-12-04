const UserRepository = require('../repository/userRepository');
const UserDTO = require('../dto/userDTO');

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
    const userRepository = new UserRepository(db);

    router.route('/users')
        .get(function (request, response) {
            const userID = request.userID;
            wrap(userRepository.get(userID).then(user=>UserDTO.create(user)), response);
        });
        /*.put(function (request, response) {
            const user = request.body;
            userRepository.create(user).then((user)=> {
                response.status(201).send(user);
            }, error=> {
                response.status(500).send({error});
            });
        });*/

    /*router.route('/users/:userID')
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
            });
        });*/
};
