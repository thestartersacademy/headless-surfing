/*
Highlights
-phantom's fs module

*/

/**
 * Translation using the Google Translate Service.
 *
 * Usage:
 *
 *     $ casperjs translate.js --target=fr "hello world"
 *     bonjour tout le monde
 */
var system = require('system'),
		fs = require('fs'),
		casper = require('casper').create({
			clientScripts:['jquery.js']
		}),
		format = require('utils').format,
		source = casper.cli.get('source') || 'auto',
		target = casper.cli.get('target'),
		text   = casper.cli.get(0),
		result,
		h1 = [];

if (!target) {
		casper.warn('The --target option is mandatory.').exit(1);
}

casper.start('http://localhost:8080/index.html', function() {

	h1 = casper.evaluate(function(){
		var titles = [];
		$('h1').each(function(i, el){
			titles.push($.trim($(el).text()));
		});
		return titles;
	});
	//this.echo(h1);
	//Loop through the titles
	result = '{';
	casper.each(h1, function(self, title) {
		
		self.thenOpen(format('http://translate.google.com/#%s/%s/%s', source, target, title)).then(function() {
				this.fill('form#gt-form', {text: text});
		}).waitForSelector('span.hps', function() {
				this.echo(title);
				result = result+'"'+title+'":';
				result = result+'"'+this.fetchText("#result_box")+'",';
		});

	}).then(function(){
		result = result+'"'+text+'":""}';
		this.echo(result);
		fs.write('translations/'+target+'-translation.json', result, 'w');
	});
	
});




casper.run();