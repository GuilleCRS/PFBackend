const mysql = require('mysql');
var connectionString =
  'mysql://*root:*password@*localhost/*database?charset=utf8_general_ci&timezone=-0700';

const mysqlConexion = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'my-pw',
    database: 'mydb',
    insecureAuth: true,
  },

  'single',
);

mysqlConexion.connect(function(err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Base de datos conectada');
  }
});

module.exports = mysqlConexion;
