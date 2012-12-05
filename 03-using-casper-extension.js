/*
Refactored multi-page test
*/

//Next two lines are different than normal
var CasperWithCaptureShots = require('./03-casper-extension');

var casper = new CasperWithCaptureShots({
    clientScripts:  [
      'jquery.js'
  ],
	viewportSize: {
		width: 1900,
		height: 1080
	}
});

//Opens the URL to start
casper.start("http://localhost:8080/index.html", function() {
	this.test.assertUrlMatch(/^http:\/\/localhost:8080\/index.html$/);
	this.test.assertTitle('');
	//this.captureSelector("index.png", "html");
	//Modify call to capture
	this.captureShots('multi-page',true,false);
});

var select = {};

//Check the home link is there and has the right class
select.home = '.main-navigation ul li:first-child a';
casper.waitForSelector(select.home,
		function success() {
			this.test.assertSelectorHasText(select.home, 'Home');
			var parentClass = this.evaluate(function(selection){
					//__utils__.echo(selection);
					return $(selection).parent().attr('class');
				}, {
					selection: select.home
				});
			this.test.assertEquals(parentClass, 'current');
		},
		function fail() {
			this.test.assertExists(select.home );
		}
);

//Check the about link is there, is not highlighted, and navigates to the right page
select.about = '.main-navigation ul li:nth-child(2) a';
casper.waitForSelector(select.about,
		function success() {
			this.test.assertExists(select.about);
			this.test.assertSelectorHasText(select.about, 'About');
			this.test.assertNotEquals(this.getElementAttribute(select.about, 'class'), 'current');
			this.click(select.about);
		},
		function fail() {
				this.test.assertExists(select.about);
		}
);
casper.then(function(){
	this.test.assertUrlMatch(/^http:\/\/localhost:8080\/about.html$/);
	this.test.assertTitle('');
	//this.captureSelector("about.png", "html");
	this.captureShots('multi-page',true,false);
});

//Check the contact link is there, is not highlighted, and navigates to the right page
select.contact = '.main-navigation ul li:nth-child(3) a';
casper.waitForSelector(select.contact,
		function success() {
			this.test.assertExists(select.contact);
			this.test.assertSelectorHasText(select.contact, 'Contact');
			this.test.assertNotEquals(this.getElementAttribute(select.contact, 'class'), 'current');
			this.click(select.contact);
		},
		function fail() {
				this.test.assertExists(select.contact);
});
casper.then(function(){
	this.test.assertUrlMatch(/^http:\/\/localhost:8080\/contact.html$/);
	this.test.assertTitle('');
	//this.captureSelector("contact.png", "html");
	this.captureShots('multi-page',true,false);
});

casper.run(function() {this.test.renderResults(true);});
