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
    let passwordEncriptada=await bcryptjs.hash(pass,8)//encriptando la pass que llega,el 8 es el nivel de encriptamiento, va hasta 12

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
  
   if(!user || !pass){//si no hay datos ingresado en el login entonces manda alerta:
    res.render('login',{
        //datos de la alerta
        alerta:true,
        titulo:"Advertencia",
        mensaje:"Ingrese un usuario y pass",
        alertIcon:'info',
        showConfirmButton:true,
        tiempo:false,
        ruta:'login'

    })
   }else{
       //en caso de que si se ingreso un usuario:

   }

        
    } catch (error) {
        
    }

}
