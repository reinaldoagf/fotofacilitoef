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
	if (request.route.methods.post) {
		response.render('layouts/index')
		console.log('redireccionado')
	}else{
		User.find(function(err,doc){
		if (err) {
			throw err;
		}else{
			console.log('=== Colección de usuarios registrados      ===')
			console.log(doc)
			response.render('layouts/index')
		}
		})	
	}	
})
app.post('/',function (request,response) {
	var user= new User({
		email                :request.body.email,
		password             :request.body.password,
		passwordConfirmation :request.body.passwordConfimation
	})
	user.save(function(){
		console.log('=== Registro exitoso                       ===')
		console.log(user)
	})
	response.send({partials:{part:'part'}});
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