const express = require('express');
const rutas = express.Router();

const mysqlConexion = require('./bdConexion.js')


//Rutas mesas por cliente
//Selecciona todos los elementos de la tabla
//Put al no tener identificador propio por fila, si queremos cambiar algun campo por rfc, 
//o idmesa puede cambiar multiples a la vez  , los valores no son unicos asi que se pueden crear multiples relaciones identicas
rutas.get('/cliente_mesa',(req, res)=>{
    mysqlConexion.query('SELECT * FROM cliente_mesa',(err,filas,campos)=>{
        if(!err){
            res.json(filas);
        }else{
            console.log(err);
            res.status(500).json(err);
        }
    });
});


//Busca las mesas que tenga cierto cliente por su rfc
rutas.get('/cliente_mesa/:id',(req, res)=> {
    const id_Mesa = req.params.id;
    mysqlConexion.query('SELECT * FROM cliente_mesa WHERE id_RFC= ?',[id_Mesa],(err,filas,campos)=>{
        if(!err){
            res.json(filas);
        }else{
            console.log(err);
            res.status(500).json(err)
        }
    })
})
//busca todos los clientes en una mesa por su id de mesa
rutas.get('/cliente_mesaidm/:id',(req, res)=> {
    const id_Mesa = req.params.id;
    mysqlConexion.query('SELECT * FROM cliente_mesa WHERE id_Mesa= ?',[id_Mesa],(err,filas,campos)=>{
        if(!err){
            res.json(filas);
        }else{
            console.log(err);
            res.status(500).json(err)
        }
    })
})


//Inserta una nueva relacion mesa cliente
rutas.post('/cliente_mesa',(req,res)=>{
    const { id_RFC,id_Mesa} = req.body;
    const query="INSERT INTO cliente_mesa(id_RFC,id_Mesa) VALUES(?,?)";
    mysqlConexion.query(query,[id_RFC,id_Mesa],(err,filas,campos)=>{
        if(!err){
            res.json({estatus: 'Relacion Cliente_Mesa guardada'});
        }else{
            console.log(err)
            res.status(500).json(err)
        }
    })
})

//Consulta update
//update por id de mesa
rutas.put('/cliente_mesaidm/:id',(req, res)=>{     
    const {id_RFC} = req.body;
    const {id} = req.params;
    const query = "UPDATE cliente_mesa SET id_RFC = ? WHERE id_Mesa = ?";
    mysqlConexion.query(query,[id_RFC,id],(err,filas,campos) => {
        if(!err){
            res.json({estatus: "Relacion cliente_mesa actualizada",filas,campos});
        }else{
            console.log(err);
            res.status(500).json(err);
        }
    })

});
rutas.put('/cliente_mesa/:id',(req, res)=>{     
    const {id_Mesa} = req.body;
    const {id} = req.params;
    const query = "UPDATE cliente_mesa SET id_Mesa = ? WHERE id_RFC = ?";
    mysqlConexion.query(query,[id_Mesa,id],(err,filas,campos) => {
        if(!err){
            res.json({estatus: "Relacion cliente_mesa actualizada",filas,campos});
        }else{
            console.log(err);
            res.status(500).json(err);
        }
    })

});


//Elimina una relacion cliente-mesa por rfc
rutas.delete('/cliente_mesa/:id',(req,res)=>{
    const {id} =req.params;
    const query = "DELETE FROM cliente_mesa WHERE id_RFC = ?";
    mysqlConexion.query(query,[id],(err,filas,campos) => {
        if(!err){
            res.json({estatus: 'Relacion cliente_mesa eliminada'});
        }else{
            console.log(err);
            res.status(500).json(err)
        }
    })
})
//Elimina una relacion cliente-mesa por id de mesa
rutas.delete('/cliente_mesaidm/:id',(req,res)=>{
    const {id} =req.params;
    const query = "DELETE FROM cliente_mesa WHERE id_Mesa = ?";
    mysqlConexion.query(query,[id],(err,filas,campos) => {
        if(!err){
            res.json({estatus: 'Relacion cliente mesa eliminada'});
        }else{
            console.log(err);
            res.status(500).json(err)
        }
    })
})




module.exports = rutas;