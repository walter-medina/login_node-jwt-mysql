const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
//const conexion=require('../database/db')


//promesas:
const {promisify}=require('util')
const conexion = require('../database/db')

//registrar:se crea un metodo un poco distinto para registrar
exports.register=async(req,res)=>{
    
   try {
       //atrapo el contenido del formulario
    const name=req.body.nombre
    const user=req.body.usuario
    const pass=req.body.password  
    let passwordEncriptada=await cbcryptjs.hash(pass,8)//encriptando la pass que llega,el 8 es el nivel de encriptamiento, va hasta 12

    //una vez atrape los datos del formulario lo ingreso a la bd
    conexion.query('INSERT INTO usuario SET ?',{user:user,name:name,pass:passwordEncriptada},(error,results)=>{
        if(error){
            console.log(error)
        }
        res.redirect('/')

    })
       
   } catch (error) {
       console.log(error)
       
   }  
    
}

//metodo login

exports.login=async (req,res)=>{
    try {
       
    const user=req.body.usuario
    const pass=req.body.pass
    console.log(user+"  "+pass)
        
    } catch (error) {
        
    }

}
