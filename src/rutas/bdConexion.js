const mysql = require('mysql');
const mysqlConexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'   
},'single');

mysqlConexion.connect(function(err){


    if(err){
        console.log(err);
        return;
    }else{
        console.log('Base de datos conectada');
    }
});


module.exports = mysqlConexion;