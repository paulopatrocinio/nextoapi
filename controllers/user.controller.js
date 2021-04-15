const { response } = require('express');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

router.post('/', registerUser);
router.get('/', listUsers);
router.get('/:id', listUserById);
router.put('/', updateUser);

module.exports = router;

function registerUser(request, response) {
   let user = { ...request.body }

   userService.createUser(request.body)
      .then(result => {
         response.status(201).send(result);
      })
      .catch(error => {
         console.log(error);
         response.status(400).send({
            errorMessage: 'Falha ao inserir um usuário'
         });
      });
}

function listUsers(request, response) {
   userService.listUsers()
      .then(result => {
         response.json(result[0]);
      })
      .catch(error => {
         console.log(error);
         response.status(404).send({
            errorMessage: 'Não foi possível encontrar os usuários cadastrados'
         });
      });
}

function listUserById(request, response) {
   let id = request.params.id;

   userService.listUserById(id)
      .then(result => {
         response.json(result[0]);
      })
      .catch(error => {
         console.log(error);
         response.status(404).send({
            errorMessage: 'Usuário não encontrado'
         });
      });
}

function updateUser(request, reponse) {
   let user = {...request.body}

   userService.updateUser(user)
      .then(result => {
         response.status(201).send(result);
      })
      .catch(error => {
         console.log(error);
         response.status(400).send({
            errorMessage: 'Falha ao alterar um usuário'
      });
   });
}