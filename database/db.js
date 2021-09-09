//conexion a base de datos mysql

const mysql=require('mysql')
const conexion=mysql.createConnection({
    host : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
   

})

conexion.connect((error)=>{
    if(error){
        console.log('El error de conexion es: '+error)
    }else{
        console.log('Conectado a la base de datos MySql')
    }
})



module.exports=conexion