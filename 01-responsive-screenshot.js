/**
* Based on https://github.com/phase2/casperjs-responsive and 
* https://github.com/vranac/responsive-screenshots
*/


/**
CasperJS responsive size screenshots
====================================

Simple script to help you out when working with responsive views.

Just call casperjs responsive-screenshot.js --url from terminal/prompt,
where URL is the URL you want to screenshot.

The script will save to responsive-screenshots/DATE/SLUG-WIDTH-HEIGHT.png

The command line takes a few other parameters:
--url URL to the page you want to capture
--group Name you want to use to group the folders (prefixed to the optional date and time parameters)
--date Use this to override the inclusion of date in the folder name
--time Use this to override the inclusion of time in the folder name

Example:

$ casperjs responsive-screenshots.js --url=http://twitter.github.com/bootstrap/examples/fluid.html --group=fluid --date=false --time=false

Requirements
------------

[CasperJS](http://casperjs.org/)
*/

/*
Highlights:
-Create casper with options
-Viewport
-CLI
-start method
-run method
-event listening
*/


var casper = require("casper").create({
	logLevel: "debug",
	verbose: false,
	viewportSize: {
		width: 1900,
		height: 1080
	}
});


//Change these for your setup
var responsiveSizes = [
		[1200, 1024],
		[980, 1280],
		[768, 1024],
		[767, 1024],
		[480, 320]
	],
	pathToSave = 'responsive-screenshot',
	defaultURL = 'http://localhost:8080/index.html',
	groupName = casper.cli.get("group") || '',
	//at least one of these must be true
	includeGroupInName = casper.cli.has("group") || true,
	includeDateInName = typeof casper.cli.get("date") !== 'undefined' ? casper.cli.get("date") : true,
	includeTimeInName = typeof casper.cli.get("time") !== 'undefined' ? casper.cli.get("time") : true;

function logDefaults(option, defaultValue){
	if (!casper.cli.has(option) || casper.cli.get(option) === true) {
		casper
			.echo("No " + option + " option passed")
			.echo("Using default: " + defaultValue);
	}
}

//Echo what defaults are used
logDefaults("url", defaultURL);
logDefaults("group", groupName);
logDefaults("date", includeDateInName);
logDefaults("time", includeTimeInName);


//Set up time information for folder name
var d = new Date(),
	currentDate = d.getDate(),
	currentMonth = d.getMonth() + 1, //Months are zero based
	currentYear = d.getFullYear(),
	currentHour = d.getHours(),
	currentMinute = d.getMinutes(),
	currentSeconds = d.getSeconds(),
	current = '',
	date = '',
	time = '';

date = ' on ' + currentYear + '-' +
			(currentMonth < 10 ? '0' : '') + currentMonth + '-' +
			(currentDate < 10 ? '0' : '') + currentDate;
time = ' at ' +
			(currentHour < 10 ? '0' : '') + currentHour + '.' +
			(currentMinute < 10 ? '0' : '') + currentMinute + '.' +
			(currentSeconds < 10 ? '0' : '') + currentSeconds;


//Determine what the folder name will look like
if (includeGroupInName) current = groupName;
if (includeDateInName) current = current + date;
if (includeTimeInName) current = current + time;


var BASE_URL = casper.cli.get("url") || defaultURL;

var slug = BASE_URL.replace(/[^a-zA-Z0-9]/gi, '-').replace(/^https?-+/, '');


casper.start(BASE_URL, function() {

	//Handle when the viewport changes
	casper.on('viewport.changed', function(dim){
		var filename = pathToSave + '/' + current + '/' + slug + '-' + dim[0] + '-' + dim[1] + ".png";
		this.captureSelector(filename, 'body');
		this.echo(filename);
	});

	//Loop through the resolutions
	casper.each(responsiveSizes, function(self, responsiveSize, i) {
		var width = responsiveSize[0];
		var height = responsiveSize[1];

		this.viewport(width, height);
	});

});

casper.run(function() {
	this.echo('Done.').exit();
});