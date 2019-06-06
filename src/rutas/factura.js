const express = require('express');
const rutas = express.Router();

const mysqlConexion = require('./bdConexion.js')

//Rutas factura
//El id de factura es un valor entero de 11 caracteres no auto-incremental
//SELECT general de datos
rutas.get('/factura',(req, res)=>{
    mysqlConexion.query('SELECT * FROM factura',(err,filas,campos)=>{
        if(!err){
            res.json(filas);
        }else{
            console.log(err);
            res.status(500).json(err)
        }
    });
});


//Hacer select de factura por id de factura
rutas.get('/factura/:id',(req, res)=> {
    const id_Factura = req.params.id;
    mysqlConexion.query('SELECT * FROM factura WHERE id_Factura= ?',[id_Factura],(err,filas,campos)=>{
        if(!err){
            res.json(filas);
        }else{
            console.log(err);
            res.status(500).json(err)
        }
    })
})

//Hacer select de factura por id de cliente
rutas.get('/facturaRFC/:id',(req, res)=> {
    const id_RFC= req.params.id;
    mysqlConexion.query('SELECT * FROM factura WHERE id_RFC= ?',[id_RFC],(err,filas,campos)=>{
        if(!err){
            res.json(filas);
        }else{
            console.log(err);
            res.status(500).json(err)
        }
    })
})

//Insertar una nueva factura
rutas.post('/factura',(req,res)=>{
    const { id_Factura,Total,Fecha_Hora,id_RFC} = req.body;
    const query="INSERT INTO factura(id_Factura,Total,Fecha_Hora,id_RFC) VALUES(?,?,?,?)";
    mysqlConexion.query(query,[id_Factura,Total,Fecha_Hora,id_RFC],(err,filas,campos)=>{
        if(!err){
            res.json({estatus: 'Factura guardada'});
        }else{
            console.log(err)
            res.status(500).json(err)
        }
    })
})

//Actualizar factura por id de factura
rutas.put('/factura/:id',(req, res)=>{     
    const {Total,Fecha_Hora,id_RFC} = req.body;
    const {id} = req.params;
    const query = "UPDATE factura SET Total = ?, Fecha_Hora = ? , id_RFC = ? WHERE id_Factura = ?";
    mysqlConexion.query(query,[Total,Fecha_Hora,id_RFC,id],(err,filas,campos) => {
        if(!err){
            res.json({estatus: "Factura Actualizada",filas,campos});
        }else{
            console.log(err);
            res.status(500).json(err)
        }
    })

});

//Borrar una factura por id de factura
rutas.delete('/factura/:id',(req,res)=>{
    const {id} =req.params;
    const query = "DELETE FROM factura WHERE id_Factura = ?";
    mysqlConexion.query(query,[id],(err,filas,campos) => {
        if(!err){
            res.json({estatus: 'Factura eliminada'});
        }else{
            console.log(err);
            res.status(500).json(err)
        }
    })
})
//Borrar factura por id de cliente
rutas.delete('/facturaRFC/:id',(req,res)=>{
    const {id} =req.params;
    const query = "DELETE FROM factura WHERE id_RFC = ?";
    mysqlConexion.query(query,[id],(err,filas,campos) => {
        if(!err){
            res.json({estatus: 'Factura eliminada'});
        }else{
            console.log(err);
            res.status(500).json(err)
        }
    })
})



module.exports = rutas;