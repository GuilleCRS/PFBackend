const express = require('express');
const rutas = express.Router();

const mysqlConexion = require('./bdConexion.js')


//rutas de clientes
//RFC ES UN VALOR ENTERO DE 11 CARACTERES NO AUTO-INCREMENTAL
rutas.get('/cliente',(req, res)=>{
    mysqlConexion.query('SELECT * FROM cliente',(err,filas,campos)=>{
        if(!err){
            res.json(filas);
        }else{
            console.log(err);
        }
    });
});


//Select cliente por rfc
rutas.get('/cliente/:id',(req, res)=> {
    const id_RFC = req.params.id;
    mysqlConexion.query('SELECT * FROM cliente WHERE id_RFC = ?',[id_RFC],(err,filas,campos)=>{
        if(!err){
            res.json(filas);
        }else{
            console.log(err);
        }
    })
})
//Insert en la tabla de clientes, el rfc no puede ser nulo y es un valor int
rutas.post('/cliente',(req,res)=>{
    const { id_RFC,Nom_Cliente,Ap_Cliente} = req.body;
    const query="INSERT INTO cliente(id_RFC,Nom_Cliente,Ap_Cliente) VALUES(?,?,?)";
    mysqlConexion.query(query,[id_RFC,Nom_Cliente,Ap_Cliente],(err,filas,campos)=>{
        if(!err){
            res.json({estatus: 'Cliente guardado'});
        }else{
            console.log(err)
        }
    })
})

//Actualizacion de cliente mediante rfc
rutas.put('/cliente/:id',(req, res)=>{     
    const {Nom_Cliente,Ap_Cliente} = req.body;
    const {id} = req.params;
    const query = "UPDATE cliente SET Nom_Cliente = ?, Ap_Cliente = ? WHERE id_RFC = ?";
    mysqlConexion.query(query,[Nom_Cliente,Ap_Cliente,id],(err,filas,campos) => {
        if(!err){
            res.json({estatus: "Cliente actualizado"});
        }else{
            console.log(err);
        }
    })

});

//Borrar un cliente por rfc
rutas.delete('/cliente/:id',(req,res)=>{
    const {id} =req.params;
    const query = "DELETE FROM cliente WHERE id_RFC = ?";
    mysqlConexion.query(query,[id],(err,filas,campos) => {
        if(!err){
            res.json({estatus: 'Cliente borrado'});
        }else{
            console.log(err);
        }
    })
})

module.exports = rutas;