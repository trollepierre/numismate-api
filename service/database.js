var mysql = require('mysql');

var connection = mysql.createConnection({
    // host: 'mysql-recontact.alwaysdata.net',
    // port: 8889,
    // user: 'recontact',
    // password: 'kit',
    // database: 'recontact_numismate',
    host: 'mysql1.alwaysdata.com',
    // port: 8889,
    user: 'recontact',
    password: 'kit',
    database: 'recontact_world_articles'
});

var solution = ["Pas de solution"];

module.exports = {
    doQuery() {
        connection.connect(function(err, onSuccess){
            if(!err) {
                solution = "Database is connected ";
                console.log("Log :Database is connected ... nn");
            } else {
                solution = "Error connecting database ... nn";
                console.log("Log :Error connecting database ... nn");
                connection.end();
            }
            return solution;
            onSuccess;
        });
        return solution;
        connection.end();
    },

    onSuccess(){
        connection.query('SELECT * FROM coins WHERE id = 1 AS solution', function (err, rows, fields) {
            if (err) throw err;
            solution = rows[0].solution;
            solution = 4;
            console.log('The selected coin is: ', rows[0].solution);
        });

        connection.end();
        return solution;
    }
};


// la table coins
// int id
// int id_owner
// txt value
// txt country
// int year
// var post  = {id: 1, title: 'Hello MySQL'};
// var query = connection.query('INSERT INTO posts SET ?', post, function(err, result) {
//     // Neat!
// });
// console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'

