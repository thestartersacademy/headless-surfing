/*
Highlights
-form handling
-evaluate as gate
-__utils__
*/

var casper = require("casper").create({
		verbose: true
});

casper.start('http://www.thestartersacademy.com/register.html', function() {
		this.echo('filling out the form');
		//add test to check if the button is disabled
		this.fill('form#regForm', {
				'registration[webAppDev]': '1',
				'registration[feBeg]': '1',
				'registration[mvc]': '1',
				'registration[firstName]': 'Your',
				'registration[lastName]': 'Name',
				'registration[email]': 'you@email.com',
				'registration[phone]': '858-876-CODE',
				'registration[promocode]': 'sandiegojs'//,
				//'attachment': '/Users/chuck/roundhousekick.doc'
		}, false);

		//Check if the button was enabled properly
		var enabled = this.evaluate(function(){
			return $('#submit').is(':enabled')
		});
		this.test.assert(enabled, 'submit button is enabled');

		//Submit
		this.click('#submit');

});

casper.then(function() {
		this.echo('evaluating result');
		this.captureSelector('screenshots/formresult.png', 'html');
		this.evaluateOrDie(function() {

				return /Thanks for getting started\./.test(__utils__.findOne('#notice').innerText);
		}, 'registration failed');
});

casper.run(function() {
		this.echo('registered').exit();
});

