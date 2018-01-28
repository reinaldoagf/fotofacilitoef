var express= require('express')
var bodyParser= require('body-parser')
var mongoose= require('mongoose')

var app= express()

var Schema= mongoose.Schema;

//Servir archivos estaticos
app.use('/static',express.static('public'))
//Leer parametros del cuerpo de la petición
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Enviando motor de plantilla jade
app.set('view engine','jade')

//Definiendo esquema y creando modelo
var userSchemaJSON={
	email:String,
	password:String
}
var userSchema= new Schema(userSchemaJSON)
var User= mongoose.model('User',userSchema)

//Conexión a base de datos
mongoose.connect('mongodb://localhost/fotofacilito', {
  useMongoClient: true
})
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Rutas
app.get('/',function (request,response) {
	User.find(function(err,doc){
		if (err) {
			throw err;
		}else{
			// console.log(doc)
			response.render('layouts/login')
		}
	})
})
app.post('/users',function (request,response) {
	var user= new User({email:request.body.email,password:request.body.password})
	user.save(function(){
		console.log('=== Registro guardado exitosamente '+ user)		
		response.send('Datos obtenidos satisfactoriamente')
	})
})
app.get('/foto',function (request,response) {
	response.render('photo/index')
})

console.log('=== Server running in https://localhost:80')
app.listen(80)