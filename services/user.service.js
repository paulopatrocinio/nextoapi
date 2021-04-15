var config = require('config.json');
var sql = require('mssql');
var q = require('q');

let databaseConfiguration = require('../dao/configuration/dbconfig');

var service = {};
service.createUser = createUser;
service.listUsers = listUsers;
service.getUserById = getUserById;
service.deleteUser = deleteUser;
service.updateUser = updateUser;

module.exports = service;

async function listUsers() {
    let deferred = q.defer();
    try {
        let pool = await sql.connect(databaseConfiguration);
        let users = await pool.request().query("select * from usuario");

        return users.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function getUserById(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let user = await pool.request()
            .input('userId', sql.Int, id)
            .query('select * from usuario where id = @userId');

        return user.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function createUser(user) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let user = await pool.request()
            .input('usuario', sql.VarChar, user.usuario)
            .input('senha', sql.VarChar, user.senha)
            .input('nome', sql.VarChar, user.nome)
            .input('telefone', sql.VarChar, user.telefone)
            .input('email', sql.VarChar, user.email)
            .input('cpf', sql.VarChar, user.cpf)
            .input('sexo', sql.VarChar, user.sexo)
            .input('estado', sql.VarChar, user.estado)
            .input('cidade', sql.VarChar, user.cidade)
            .input('perfil', sql.Int, user.perfil)
            .query('insert into usuario (usuario, senha, nome, telefone, email, cpf, sexo, estado, cidade, perfil) values (@usuario, @senha, @nome, @telefone, @email, @cpf, @sexo, @estado, @cidade, @perfil)');

        return user.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function updateUser(user) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let user = await pool.request()
            .input('id', sql.Int, user.id)
            .input('usuario', sql.VarChar, user.usuario)
            .input('senha', sql.VarChar, user.senha)
            .input('nome', sql.VarChar, user.nome)
            .input('telefone', sql.VarChar, user.telefone)
            .input('email', sql.VarChar, user.email)
            .input('cpf', sql.VarChar, user.cpf)
            .input('sexo', sql.VarChar, user.sexo)
            .input('estado', sql.VarChar, user.estado)
            .input('cidade', sql.VarChar, user.cidade)
            .input('perfil', sql.Int, user.perfil)
            .query('update usuario set usuario = @usuario, senha = @senha, nome = @nome, telefone = @telefone, email = @email, cpf = @cpf, sexo = @sexo, estado = @estado, cidade = @cidade, perfil = @perfil where id = @id');

        return user.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}

async function deleteUser(id) {
    let deferred = q.defer();

    try {
        let pool = await sql.connect(databaseConfiguration);
        let user = await pool.request()
            .input('id', sql.Int, id)
            .query('delete from usuario where id = @id');

        return user.recordsets;
    }
    catch (error) {
        console.log(error);
        deferred.resolve();
    }
}