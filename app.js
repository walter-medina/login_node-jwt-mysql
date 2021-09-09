const express=require('express')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')
const app=express()

//setear motor de plantilla ejs
app.set('view engine','ejs')


//seteando la carpeta public para archivos estaticos
app.use(express.static('public'))

//para procesar datos enviados desde los formularios

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//variables de entorno
dotenv.config({path:'./env/.env'})

//llamando a las rutas
app.use('/',require('./routes/router'))








//para poder trabajar con las cookies:

//app.use(cookieParser)


app.listen(4000, ()=>{
    console.log("servidor corriendo")
})

