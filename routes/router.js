//aca vamos a colocar todas las rutas de la aplicacion:
const express=require('express')
const router=express.Router()




//llamando a la conexion de la bd
const conexion=require('../database/db')

const authController=require('../controllers/authController')//para poder llamar a los metodos creados en el authcontroller


//rutas para las vistas
router.get('/',(req,res)=>{
        
    res.render('index')
    
})

router.get('/login',(req,res)=>{
    res.render('login',{alerta:false})
})

router.get('/register',(req,res)=>{
    res.render('register')
})

//rutas para los metodos del controller, eventos del formulario
router.post('/register',authController.register)
router.post('/login',authController.login)
module.exports=router