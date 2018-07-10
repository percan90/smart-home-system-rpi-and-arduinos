/*
* Project name:  Smart home system - Graduate thesis
* Author: Ivan Percan
* Author URL: https://github.com/percan90
* Project URL: https://github.com/percan90/smart-home-system-rpi-and-arduinos
* Description: Smart home system using Raspberry Pi 3 and Arduino boards + NodeJS and ExpressJS
* Version: 1.0
* This project is under  development. Use it to make something cool, have fun, and share what you've learned with others.
*/
var five = require("johnny-five");
var SerialPort = require('serialport');

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
        res.send("Hello from index.js!"); 
    });

    var led0 = new five.Led({
    	pin: 13,
    	board: this.byId("A")
    });

    /* Go to 127.0.0.1:3000/led/off or 127.0.0.1:3000/led/on to toggle LED */
    app.get('/led/off', function(req, res) {
        console.log("Led off");
        led0.stop().off();
        res.send("Now the LED for pin 13 should be off.");
    });

    app.get('/led/on', function(req, res) {
        console.log("Led on");
        led0.on();
        res.send("Now the LED for pin 13 should be on.");
	});


    // Just for testing purpose
	console.log("EOF");
});