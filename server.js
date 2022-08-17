//npm install express
//npm install cors
//node server.js
var express = require('express');
var cors = require('cors');

var app = express();
app.use(
  express.urlencoded({
    extended: true,
  }),
  cors()
);
app.use(express.json());
var fs = require("fs");


app.get('/listUsers', function (req, res) {
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
		console.log( data );
		res.end( data );
   });
});

app.get('/user/:id', function (req, res, next) {
	
	var id = req.params.id;
	
	console.log("Get User with ID: " + id);
	
	var data = fs.readFileSync(__dirname + "/" + "users.json");
	var users = JSON.parse(data);
	var filtered = users.filter(function(el) { return el.id == id; });	
	var newData = JSON.stringify(filtered, null, 4);
	res.end(newData);
});

app.post('/editUser', function (req, res) {
	
	var data = fs.readFileSync(__dirname + "/" + "users.json");
	var users = JSON.parse(data);
	var user = req.body;
	
	var data = fs.readFileSync(__dirname + "/" + "users.json");
	var users = JSON.parse(data);
	var filtered = users.filter(function(el) { return el.id != user.id; });
	filtered.push(user);
	
	var newData = JSON.stringify(filtered, null, 4);
	fs.writeFile(__dirname + "/" + "users.json", newData, (err) => {
	  // Error checking
		if (err){
			throw err;
		}
		console.log("New data added");
	});
	
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, readData) {
		console.log( readData );
		res.end( readData );
	});
});

app.post('/addUser', function (req, res) {
	
	var data = fs.readFileSync(__dirname + "/" + "users.json");
	var users = JSON.parse(data);
	var newUser = req.body;
	newUser.id = Date.now();
	users.push(newUser);
	
	var newData = JSON.stringify(users, null, 4);
	fs.writeFile(__dirname + "/" + "users.json", newData, (err) => {
	  // Error checking
		if (err){
			throw err;
		}
		console.log("New data added");
	});
	
	fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, readData) {
		console.log( readData );
		res.end( readData );
	});
});

app.delete('/removeUser/:id', function (req, res, next) {
	
	var id = req.params.id;
	
	console.log("Delete User with ID: " + id);
	
	var data = fs.readFileSync(__dirname + "/" + "users.json");
	var users = JSON.parse(data);
	var filtered = users.filter(function(el) { return el.id != id; });
	
	var newData = JSON.stringify(filtered, null, 4);
	fs.writeFile(__dirname + "/" + "users.json", newData, (err) => {
	  // Error checking
		if (err){
			throw err;
		}
		console.log("User deleted");
	});
	res.end();
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example User APP listening at http://%s:%s", host, port)
})