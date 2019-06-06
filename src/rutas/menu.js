const express = require('express');
const rutas = express.Router();

const mysqlConexion = require('./bdConexion.js')

//Ruta menu
//Id_Item es un valor entero de 11 caracteres no auto-incremental se requiere que solo sean 6

//Selecciona todos los items del menu  PLATILLOS-BEBIDAS
rutas.get('/menu',(req, res)=>{
    mysqlConexion.query('SELECT * FROM menu',(err,filas,campos)=>{
        if(!err){
            res.json(filas);
        }else{
            console.log(err);
        }
    });
});


//Hacer select de mesa por id de mesa
rutas.get('/menu/:id',(req, res)=> {
    const id_Item = req.params.id;
    mysqlConexion.query('SELECT * FROM menu WHERE id_Item= ?',[id_Item],(err,filas,campos)=>{
        if(!err){
            res.json(filas);
        }else{
            console.log(err);
        }
    })
})
//SELECT  Y DESPLEGAR TODAS LAS BEBIDAS
rutas.get('/menu_be',(req, res)=> {
    const id_Item = req.params.id;
    mysqlConexion.query('SELECT * FROM menu WHERE Tipo_Item= "Bebida"',[id_Item],(err,filas,campos)=>{
        if(!err){
            res.json(filas);
        }else{
            console.log(err);
        }
    })
})
//SELECT Y DESPLEGAR TODOS LOS PLATILLOS
rutas.get('/menu_pl',(req, res)=> {
    const Tipo_Item = req.params.ti;
    mysqlConexion.query('SELECT * FROM menu WHERE Tipo_Item= "Platillo"',[Tipo_Item],(err,filas,campos)=>{
        if(!err){
            res.json(filas);
        }else{
            console.log(err);
        }
    })
})

//Agregar nuevo item al menu
rutas.post('/menu',(req,res)=>{
    const { id_Item,Tipo_Item,Desc_Item,Precio_Item} = req.body;
    const query="INSERT INTO menu(id_Item,Tipo_Item,Desc_Item,Precio_Item) VALUES(?,?,?,?)";
    mysqlConexion.query(query,[id_Item,Tipo_Item,Desc_Item,Precio_Item],(err,filas,campos)=>{
        if(!err){
            res.json({estatus: 'Item insertado en menu'});
        }else{
            console.log(err)
        }
    })
})

//Actualiza menu por id de item
rutas.put('/menu/:id',(req, res)=>{     
    const {Tipo_Item,Desc_Item,Precio_Item} = req.body;
    const {id} = req.params;
    const query = "UPDATE menu SET Tipo_Item = ?,Desc_Item = ?,Precio_Item = ? WHERE id_Item = ?";
    mysqlConexion.query(query,[Tipo_Item,Desc_Item,Precio_Item,id],(err,filas,campos) => {
        if(!err){
            res.json({estatus: "Item del menu actualizado"});
        }else{
            console.log(err);
        }
    })

});

//Borrar un item del menu
rutas.delete('/menu/:id',(req,res)=>{
    const {id} =req.params;
    const query = "DELETE FROM menu WHERE id_Item = ?";
    mysqlConexion.query(query,[id],(err,filas,campos) => {
        if(!err){
            res.json({estatus: 'Item del menu eliminado'});
        }else{
            console.log(err);
        }
    })
})


module.exports = rutas;