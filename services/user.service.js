var config = require('config.json');
var sql = require('mssql');
var Q = require('q');
// var connection = process.env.connectionStringV2 || config.connectionStringV2;
// var database = process.env.databaseV2 || config.databaseV2;

// var config = {
//     user = process.env.user,
//     password: process.env.password,
//     server: process.env.server,
//     database: process.env.database,
//     port: 1433
// }

// sql.connect(config).then(() => {
//     return sql.query`select * from mytable where id = ${value}`
// }).then(result => {
//     console.dir(result)
// }).catch(err => {
//     console.log(err)
// });

// sql.on('error', err => {
//     console.log(err)
// });

var service = {};
service.create = create;

module.exports = service;

function create(userParam) {
    var deferred = Q.defer();

    var users = global.conn.collection("users");

    users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Usuário "' + userParam.username + '" já cadastrado');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = lodash.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        users.insertOne(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve(user);
            });
    }

    return deferred.promise;
}