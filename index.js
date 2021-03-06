/*
* Project name:  Smart home system - Graduate thesis
* Author: Ivan Percan
* Author URL: https://github.com/percan90
* Project URL: https://github.com/percan90/smart-home-system-rpi-and-arduinos
* Description: Smart home system using Raspberry Pi 3 and Arduino boards + NodeJS and ExpressJS
* Version: 1.0
* This project is under  development. Use it to make something cool, have fun, and share what you've learned with others.
*/
var five 		= require("johnny-five");
var SerialPort 	= require('serialport');
var path		= require('path');
var handlebars  = require('express-handlebars');

/* Handlebars dummy data*/
var templateData = {
	year: new Date().getFullYear(),
	article: 'Lorem ipsum...'
};


// test your ports using https://github.com/percan90/test-Arduino-boards
var ports = [
  { id: "A", port: "/dev/ttyACM0" },
  { id: "B", port: "/dev/ttyUSB0" },
  { id: "C", port: "/dev/ttyUSB1" }
];

new five.Boards(ports).on("ready", function() {
	// Show when boards are ready to use
	console.log("READY!");

	/* Load and start express.js and server  */
	var express = require('express');
	var app = express();

	/* Console log if server is on*/
	app.listen(3000, function() {
	console.log("Server's up at 127.0.0.1:3000!");
	});

	/* Go to 127.0.0.1 an test your app*/
	app.get('/', function(req, res) { 
		// serve static files (css, img, etc...)
		//app.use(express.static(__dirname + "/web")); //deleted after use handlebars
	   	//res.sendFile(path.join(__dirname+'/web/index.html')); //deleted after use handlebars

	   	res.render('home', templateData); // handlebars
	});

	/* Include Handlebars*/
	app.engine('handlebars', handlebars({defaultLayout: 'main'}));
	app.set('view engine', 'handlebars');
	app.use(express.static(path.join(__dirname, '/web')));

	/* Define Leds*/
	var ledA = new five.Led({
		pin: 13,
		board: this.byId("A")
	});

	var ledB = new five.Led({
		pin: 13,
		board: this.byId("B")
	});

	var ledC = new five.Led({
		pin: 13,
		board: this.byId("C")
	});

	/* Go to 127.0.0.1:3000/led[letter]/toggle to toggle LED */
	/*app.get('/ledA/toggle', function(req, res) {
	console.log("Led A toggled");
	ledA.toggle();
		res.redirect('/');
	});

	app.get('/ledB/toggle', function(req, res) {
	console.log("Led B toggled");
	ledB.toggle();
		res.redirect('/');
	});

	app.get('/ledC/toggle', function(req, res) {
	console.log("Led C toggled");
	ledC.toggle();
		res.redirect('/');
	});*/

});