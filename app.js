
/***********************
 
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pug          - A view engine for dynamically rendering HTML pages
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database

***********************/

const express = require('express'); // Add the express framework has been added
var app = express();
const bodyParser = require('body-parser'); // Add the body-parser tool has been added
app.use(bodyParser.json());              // Add support for JSON encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Add support for URL encoded bodies


//Create Database Connection
const pgp = require('pg-promise')();

/**********************
  
  Database Connection information

  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!

**********************/
// REMEMBER to chage the password 

/** 
const dbConfig = {
	host: 'ec2-54-221-214-183.compute-1.amazonaws.com',
	port: 5432,
	database: 'dduosdsl53eu2b',
	user: 'cfbopxmzjrchow',
	password: '72765cb500d3817ba5706c05b7a01f9e5d9777b211307e272ee71c658722c0cc'
};
*/
const dbConfig = process.env.DATABASE_URL;

let db = pgp(dbConfig);

// set the view engine to ejs

app.use(express.static(__dirname + '/')); // This line is necessary for us to use relative paths and access our resources directory

app.get('/', (req,res)=>{
	return res.redirect('/HomePage/home');
});
app.get('/HomePage/home', function(req, res) {
	res.render('/HomePage/home',{
		my_title:"Home Page"
	});
});



app.get('/LoginPage/login', function(req, res) {
	res.render('/LoginPage/login',{
		local_css:"login.css", 
		my_title:"Login Page"
	});
});

//go to home 
//grab password associated to email if it exists
app.post('/LoginPage/login', function(req,res){
	console.log(req.body); 
	console.log('I WORK');

	var loginEmail = req.body.email;
	var loginPassword = req.body.password; 
	//res.render('pages/HomePage/home'); 
	var query = "select * from user_info where '"+loginEmail+"'=email AND '"+loginPassword+"'=password;";
	//query for questions join on user_info
	//query for answers join on user_info 


	db.any(query)
		.then(function(rows){
			res.render('/Profile/profile',{
				my_title: "Profile",
				data: rows,
			})
			console.log(rows);
		})
		

		.catch(function (err){
			request.flash('error', err);
			res.render('/LoginPage/login',{
				my_title: "Login Page",
				data: '',
			})
		})

});

app.get('/LoginPage/signup', function(req, res) {
	res.render('/LoginPage/signup',{
		local_css:"signup.css", 
		my_title:"Signup Page"
	});
});

app.post('/LoginPage/signup', function(req,res){
	//console.log('req.body');
	console.log(req.body);
	res.render('/LoginPage/login');
	

	db.query("INSERT INTO user_info(firstName,lastName,email,password) VALUES('"+req.body.firstName+"','"+req.body.lastName+"','"+req.body.email+"','"+req.body.password+"');", function(err,res){
		if(err) throw err;
	});

});

app.get('/Profile/profile', function(req,res){
	res.render('/Profile/profile',{
		my_title: "Profile Page"
	});

}); 

app.get('/QuestionPage/question', function(req,res){
	res.render('/QuestionPage/question', {
		local_css: "question.css",
		my_title: "Question"
	});
});

app.post('/QuestionPage/question', function(req,res){
	console.log(req.body);
	res.render('/ViewQuestion/viewquestion'); //posts question and redirects
	//inserts question into query
	db.query("INSERT INTO questions(question_ask, question_info, question_tag, user_email) VALUES('"+req.body.title+"','"+req.body.details+"','"+req.body.tag+"','"+req.body.email+"')", function (err,res){
		if(err) throw err;
	});
});

//match with title and topic for query 
app.get('/SearchPage/search', function(req,res){
	res.render('/SearchPage/search',{
		my_title: "Search"
	});
});
app.get('/SearchPage/resultPage',function(req,res){
	res.render('/SearchPage/resultPage',{
		my_title: "Search Result"
	});
});

app.get('/ViewQuestion/viewquestion', function(req,res){
	res.render('/ViewQuestion/viewquestion', {
		my_title: "View Question "
	});
});


app.listen(PORT, function(){

	console.log(PORT,' is the magic port');
});

