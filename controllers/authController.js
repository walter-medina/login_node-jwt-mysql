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
        mensaje:"Usuario y/o password incorrectas",
        alertIcon:'info',
        showConfirmButton:true,
        tiempo:false,
        ruta:'login'

    })
   }else{
       //en caso de que si se ingreso un usuario, entonces se hace consulta a la base de datos
       conexion.query('SELECT * FROM usuario WHERE user=?',[user],async (error,results)=>{
           if(results.length==0 || !(await  bcryptjs.compare(pass,results[0].pass))){//comparando contraseñas,sino coinciden:
            res.render('login',{
                alerta:true,
                titulo:"Advertencia",
                mensaje:"Usuario y/o password incorrectas",
                alertIcon:'error',
                showConfirmButton:true,
                tiempo:false,
                ruta:'login'

            })

           }
           else{//si el inicio de sesion es el correcto entonces:
            const id=results[0].id
            const token=jwt.sign({id:id},process.env.JWT_SECRETO,{
                expiresIn:process.env.JWT_TIEMPO_EXPIRA
            })
            //otra forma de generar el token sin fecha de expiracion: 
            //const token =jwt.sign({id:id},process.env.JWT_SECRETO)
            console.log("token: "+token+" para el usuario "+user)

            //para las cookies:
            const cookiesOptions={
                expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 1000),
                httpOnly:true
            }
            res.cookie('jwt',token,cookiesOptions)

            res.render('login',{
                alerta:true,
                titulo:"Conexión Exitosa",
                mensaje:"Login Correcto !!",
                alertIcon:'success',
                showConfirmButton:false,
                tiempo:800,
                ruta:''

            })


           }


       })


   }

        
    } catch (error) {
        console.log(error)
        
    }

}
