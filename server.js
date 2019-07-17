// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
//mongoose 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors');
// create the express app
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.json());
// MiddleWare: Session and Flash 
var session = require('express-session');
app.use(session({
	secret: 'cam_god',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
const flash = require('express-flash');
app.use(flash());
// static content
// app.use(express.static(path.join(__dirname, './public/dist')));
app.use(express.static( __dirname + '/public/dist/public' ));


// // Get sockets
// const server = app.listen(8000);
// const io = require('socket.io')(server);
// var counter = 0;

// io.on('connection', function (socket) { //2
// 	  //Insert SOCKETS 
// });

// Mongoose Schema Authors
var AuthorsSchema = new mongoose.Schema({
	name: {type: String, required: [true, "Must have name"], minlength: [3, "Name must be longer than 2 characters"]},
}, {timestamps: true})
mongoose.model('Authors', AuthorsSchema); // We are setting this Schema in our Models as 'Authors'
var Author = mongoose.model('Authors') // We are retrieving this Schema from our Models, named 'User'

// // ...delete all records of the User Model
// User.deleteMany({}, function(err){
// 	// This code will run when the DB has attempted to remove all matching records to {}
//    })

// root route to render the index.ejs view
//app.get('/')
app.get('/authors',(req, res)=>{
	Author.find({}, (err, Authors_array)=>{
		if (err) {
			console.log("Error finding Tasks")
			res.json({message: "Error", error: err})
		}else {
			console.log(Authors_array)
			res.json({message: "Success", data: Authors_array})
		}
	})
} )
// show person 
app.get('/authors/:id', (req, res)=> {
	Author.findOne({_id: req.params.id}, (err, author_arr)=> {
		if (err) {
			console.log("Error finding author")
			res.json({message: "Error", error: err})
		}else {
			console.log(author_arr)
			res.json({message: "Success", data: author_arr})
		}
	})
})
app.post('/authors', (req, res)=>{
	Author.create(req.body, (err, new_author_array)=>{
		if (err) {
			console.log("Error creating author")
			res.json({message: "Error", error: err})	
		}else {
			console.log(new_author_array)
			res.json({message: "Success", data: new_author_array})
		}
	})
})
app.delete('/authors/:id', (req, res)=>{
	Author.findByIdAndDelete(req.params.id, (err)=>{
		if (err) {
			console.log("Error deleting author by ID")
			res.json({message: "Error", error: err})	
		} else {
			res.json({message: "Success : deleted author!"})
		}
	})
} )

app.put('/authors/:id', (req,res)=> {
	Author.findOneAndUpdate({_id: req.params.id}, req.body,{runValidators: true, new: true}, (err, new_author_arr)=>{
		if (err) {
			console.log("Error updating author by ID")
			res.json({message: "Error", error: err})	
		} else {
			console.log(new_author_arr)
			res.json({message: "Success", data: new_author_arr})
		}
	})
})
// this route will be triggered if any of the routes above did not matchcopy
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});
//The 404 Route (ALWAYS Keep this as the last route)
//app.get('*', function(request, response){
	//response.send("404")
//});

// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});