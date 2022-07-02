# node.js server 
Server purpuse is handling:
- adding new users
- delete users
- get user details by ID
- get all users

# Run
To run this project execute following commands:
- npm install express - install express library
- node server.js - run server

# Postman collection 
Import postman collection to see sample usage

# Structure requirements:
- Main structure is User
- Mandatory fields are:
	- `User.id`
		- Automatically created when creating new user with Date.now()
		- As parameter for delete method or get user details