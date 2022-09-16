const express = require('express');
require('dotenv').config();
const path = require('path'); 
const hbs = require('hbs'); 
const mysql = require('mysql2'); 
const nodemailer = require('nodemailer'); 
const { get } = require('http');

const app = express(); 
const PORT = process.env.PORT || 8080; 

const conexion = mysql.createConnection ({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

//Conexión a DataBase
/*conexion.connect((err) => {
    if(err){
    console.error(`Error en la conexion: ${err.stack}`);
    return;
}
    console.log(`Conectado a base de datos ${process.env.DATABASE}`);
});*/

//Middelwares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))

//configuración del motor de plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// conexion con partes de la pagina
app.get('/', (req, res, next)=>{
    res.render('index', {
        style: 'index.css'
        
    })
})
app.get('/Nosotros', (req, res) =>{
    res.render('Nosotros', {
        titulo: 'Sobre Nosotros',
        style: 'index.css'
      
    })
});
app.get('/Chef', (req, res) =>{
    res.render('Chef', {
        titulo: 'Chef',
       style: 'index.css'
        
    })
});

app.get('/Contacto', (req, res) =>{
    res.render('Contacto', {
        titulo: 'Contacto',
        style:'index.css'
    })
});
app.get('/Menu', (req, res) =>{
    res.render('Menu', {
        titulo: 'Menu',
        style: 'index.css'
        
    })
});

app.post('/Contacto', (req, res) =>{
    const {Nombre, Apellido, Correo, Telefono, Mensaje}= req.body;
    //console.log(Nombre, Apellido, Correo, Telefono, Mensaje);

    let datos = {
        Nombre: Nombre,
        Apellido: Apellido,
        Correo: Correo,
        Telefono: Telefono,
        Mensaje: Mensaje,
    };
    let sql = 'INSERT INTO Contacto SET ?';
    conexion.query(sql, datos, (error, result)=>{
    
    res.render('Index',{
        titulo: 'Contacto',
        
    });
    });       
});


app.listen(PORT, () => {
    //console.log(`El servidor está trabajando en el Puerto ${PORT}`);
});






