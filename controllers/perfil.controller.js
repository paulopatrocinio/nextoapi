const { response } = require('express');
var express = require('express');
var router = express.Router();
var perfilService = require('../services/perfil.service');

router.post('/', insertPerfil);
router.get('/', listPerfis);
router.get('/:id', listPerfilById);
router.put('/', updateExistingPerfil);

module.exports = router;

function listPerfis(request, response) {
    perfilService.getPerfil().then(result => {
        console.log(result);
        response.json(result[0]);
    });
}

function listPerfilById(request, response) {
    perfilService.getPerfilById(parseInt(request.params.id_perfil)).then(result => {
        response.json(result[0]);
    })
}

function insertPerfil(request, response) {
    let perfil = request.body;
    
    perfilService.addPerfil(perfil)
        .then(result => {
            response.status(201).send(result);
        })
        .catch(error => {
            console.log(error);
            response.status(400).send({
                errorMessage: 'Falha ao inserir um perfil'
            });
        });

    // response.status(200).send({
    //     mensagem: 'Insere um perfil'
    // });
}

function updateExistingPerfil(request, response) {
    let id = request.params.id_perfil;

    response.status(200).send({
        mensagem: 'Altera um perfil',
        id: 'Id alterado = ' + id
    });
}

function deletePerfil(request, response) {
    let id = request.params.id_perfil;

    response.status(200).send({
        mensagem: 'Exclui um perfil',
        id: 'Id excluido = ' + id
    });
}