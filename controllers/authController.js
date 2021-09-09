const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
//const conexion=require('../database/db')


//promesas:
const {promisify}=require('util')


//registrar:se crea un metodo un poco distinto para registrar
exports.register=async(req,res)=>{
    //atrapo el contenido del formulario
    const name=req.body.nombre
    const user=req.body.usuario
    const pass=req.body.password
    console.log(name+user+pass) 
    
}
