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
var userSchema=new Schema({
	name:String,
	username:String,
	password:String,
	age:Number,
	email:String,
	date_of_birth: Date
})

var User=mongoose.model('User',userSchema)

module.exports.User= User;