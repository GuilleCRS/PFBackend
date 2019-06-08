const express = require('express');
const rutas = express.Router();

const mysqlConexion = require('./bdConexion.js');

//Rutas Mesa
//El id de Mesa es un valor entero de 11 caracteres no auto-incremental
//No existe campo estado de Mesa en tabla por lo tanto no se puede hacer select por ese parametro RQF01-asana
rutas.get('/mesa', (req, res) => {
  mysqlConexion.query('SELECT * FROM Mesa', (err, filas, campos) => {
    if (!err) {
      res.json(filas);
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

//Hacer select de Mesa por id/numero de Mesa
rutas.get('/mesa/:id', (req, res) => {
  const id_Mesa = req.params.id;
  mysqlConexion.query(
    'SELECT * FROM Mesa WHERE id_Mesa= ?',
    [id_Mesa],
    (err, filas, campos) => {
      if (!err) {
        res.json(filas);
      } else {
        console.log(err);
        res.status(500).json(err);
      }
    },
  );
});

//Insertar nueva Mesa
rutas.post('/mesa', (req, res) => {
  const { id_Mesa, Desc_Mesa } = req.body;
  const query = 'INSERT INTO Mesa(id_Mesa,Desc_Mesa) VALUES(?,?)';
  mysqlConexion.query(query, [id_Mesa, Desc_Mesa], (err, filas, campos) => {
    if (!err) {
      res.json({ estatus: 'Mesa creada con exito' });
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

//Actualizar Mesa con nuevos valores mediante el id_mesa
rutas.put('/mesa/:id', (req, res) => {
  const { Desc_Mesa } = req.body;
  const { id } = req.params;
  const query = 'UPDATE Mesa SET Desc_Mesa = ? WHERE id_Mesa = ?';
  mysqlConexion.query(query, [Desc_Mesa, id], (err, filas, campos) => {
    if (!err) {
      res.json({ estatus: 'Mesa actualizada con exito' }, filas, campos);
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

//Borrar una Mesa por su id
rutas.delete('/mesa/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Mesa WHERE id_Mesa = ?';
  mysqlConexion.query(query, [id], (err, filas, campos) => {
    if (!err) {
      res.json({ estatus: 'Mesa eliminada con exito' });
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

module.exports = rutas;
