'use strict'
var express= require('express')
var bodyParser= require('body-parser')
var mongoose= require('mongoose')
var User= require('./models/user').User

var app= express()

var Schema= mongoose.Schema;

//Servir archivos estaticos
app.use('/static',express.static('public'))
app.use('/static',express.static('assets'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
//Leer parametros del cuerpo de la petición
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Enviando motor de plantilla jade
app.set('view engine','jade')


//Rutas
app.get('/',function (request,response) {
	// User.remove(function(){
	// 	console.log('Colección eliminada')
	// })
	User.find(function(err,doc){
	if (err) {
		throw err;
	}else{
		console.log('=== Colección de usuarios registrados      ===')
		console.log(doc)
		response.render('layouts/index')
	}})	
})
app.post('/',function (request,response) {
	var user= new User({
		name                 :request.body.name,
		username             :request.body.username,
		password             :request.body.password,
		passwordConfirmation :request.body.passwordConfimation,
		age                  :request.body.age,
		email                :request.body.email,
		birthdate            :request.body.birthdate,
		sex                  :request.body.sex,
	})
	user.save(function(err){
		if (err) {
			console.log(String(err))
			response.status(500).send({ error: 'Register Error' });
			// response.json({error : "Register Error", status : 400});
		}else{
			console.log('=== Registro exitoso                       ===')
			console.log(user)
			// response.status(200).send({ success: 'Register Successfully', data:user });
			response.json({success : "Register Successfully", status : 200, data:user});

		}
	})
})
// app.post('/users',function (request,response) {
// 	var user= new User({email:request.body.email,password:request.body.password})
// 	user.save(function(){
// 		console.log('=== Login exitoso                          ===')
// 		console.log(user)	
// 		response.send('Datos obtenidos satisfactoriamente')
// 	})
// })
app.get('/foto',function (request,response) {
	response.render('photo/index')
})

console.log('=== Server running in https://localhost:80 ===')
app.listen(80)