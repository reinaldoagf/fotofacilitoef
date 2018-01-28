var express= require('express')
var bodyParser= require('body-parser')
var mongoose= require('mongoose')

var app= express()

app.use('/static',express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','jade')

app.get('/',function (request,response) {
	response.render('layouts/login')
})
app.post('/users',function (request,response) {
	response.send('Datos obtenidos satisfactoriamente')
	console.log('Email: '+request.body.email)
	console.log('Password: '+request.body.password)
})
app.get('/foto',function (request,response) {
	response.render('photo/index')
})

console.log('Server running in https://localhost:80')
app.listen(80)