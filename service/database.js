var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypass',
    database: 'coins_collection'
});

var solution = ["Pas de solution"];

module.exports = {
    doQuery() {
        connection.connect(function(err, onSuccess){
            if(!err) {
                solution = ["Database is connected "];
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