var mongoose= require('mongoose')
var Schema= mongoose.Schema;

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

// Tipos de datos: String, Number, Date, Duffer, Boolean, Mixed, Objectid, Array
//validaciones
sexsValidate=['Masculino', 'Femenino']
emailValidate=[/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,'Coloca un email válido']
usernameValidate=[20,'El username lleva un limite de 20 caracteres']
passwordValidate=[8,'El password debe contar con al menos 8 caracteres']
var userSchema=new Schema({
	name:String,
	username:{
		type         :String,
		required     :'Debe registrar un nombre de usuario',
		maxlength    :usernameValidate},
	password:{
		type         :String,
		minlength    :passwordValidate,
		validate     :{
			validator:function(pass){
				return this.passwordConfirmation== pass;
			},
			message  :'Las contraseñas no son iguales'
		}},
	age:{
		type         :Number,
		min          :[5,'El minimo de edad permitido es 5'], 
		max          :[100,'El máximo de edad permitido son 100']},
	email:{
		type         :String,
		required     :'El correo es obligatorio',
		match        :emailValidate},
		birthdate    :Date,
	sex:{
		type         :String,
		enum         :{
			values:sexsValidate,
			message:'Opción no válida'
		}}
})

userSchema.virtual('passwordConfirmation').get(function() {
	return this.pass_conf;
}).set(function(passwordConfirmation){
	this.pass_conf=passwordConfirmation;
})

var User=mongoose.model('User',userSchema)

module.exports.User= User;