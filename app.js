var express= require('express')
var app= express()
app.set('view engine','jade')
app.get('/',function (request,response) {
	response.render('layouts/login')
})
app.get('/foto',function (request,response) {
	response.render('photo/index')
})
console.log('Server running in https://localhost:80')
app.listen(80)