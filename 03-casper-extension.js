/*
Show how to extend casper

Highlights
-code separation
*/

/**
* Based on https://github.com/phase2/casperjs-responsive and 
* https://github.com/vranac/responsive-screenshots
*/


/**
CasperJS responsive size screenshots as an extension
====================================================

Simple script to help you out when working with responsive views.

When another CasperJS script gets to a page, it can take a series of screenshots of it. 
This will allow you to combine taking screenshots with your normal navigation testing.

The script will save to responsive-screenshots/DATE/SLUG-WIDTH-HEIGHT.png

The command takes a few options:
--group (string) Name you want to use to group the folders (prefixed to the optional date and time parameters)
--date (boolean) Use this to override the inclusion of date in the folder name
--time (boolean) Use this to override the inclusion of time in the folder name

Example:
var CasperWithCaptureShots = require('./casper-extension');

var casper = new CasperWithCaptureShots({
    verbose: false,
    logLevel: "debug",
    viewportSize: {
		width: 1900,
		height: 1080
	}
});

casper.start();

var links = {
    'http://edition.cnn.com/': 0,
    'http://www.nytimes.com/': 0
};

Object.keys(links).forEach(function(url) {
    casper.thenOpen(url, function() {
    	this.echo('GOING TO: ' + url);
        this.captureShots('multi-page',true,false);
    });
});

casper.run(function() {
	this.echo('All done.').exit();
});

Requirements
------------

[CasperJS](http://casperjs.org/)
*/

var Casper = require('casper').Casper,
	utils = require('utils');


//Add this
function CasperWithCaptureShots() {
	CasperWithCaptureShots.super_.apply(this, arguments);
}

//Inherit from Casper
utils.inherits(CasperWithCaptureShots, Casper);

//Add the method
CasperWithCaptureShots.prototype.captureShots = function(group, useDate, useTime){

	var responsiveSizes = [
		[1200, 1024],
		[980, 1280],
		[768, 1024],
		[767, 1024],
		[480, 320]
	],
	pathToSave = 'responsive-screenshot',
	groupName = group || '',
	//at least one of these must be true
	includeGroupInName = group || true,
	includeDateInName = typeof useDate !== 'undefined' ? useDate : true,
	includeTimeInName = typeof useTime !== 'undefined' ? useTime : true;


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


	var BASE_URL = this.getCurrentUrl();

	var slug = BASE_URL.replace(/[^a-zA-Z0-9]/gi, '-').replace(/^https?-+/, '');

	//Loop through the resolutions
	casper.each(responsiveSizes, function(self, responsiveSize, i) {
		var width = responsiveSize[0];
		var height = responsiveSize[1];

		this.viewport(width, height);
		var filename = pathToSave + '/' + current + '/' + slug + '-' + width + '-' + height + ".png";
		this.captureSelector(filename, 'body');
		this.echo(filename);
	});

	casper.then(function(){
		this.echo('Done with this page.');
		return true;
	});

};

//Export
module.exports = CasperWithCaptureShots;