/*
Define a navigation sequence and capture screenshots at each step

Highlights:
-recording with resurrectio
-callback flattening
-navigation steps
-test methods
-page interaction
*/

var x = require('casper').selectXPath;
var casper = require('casper').create();
ERROR: the recorded sequence does not start with a url openning.  //Will need to comment this and add casper.start("http://localhost:8080/index.html", function() {});
casper.then(function() {
    this.test.assertUrlMatch(/^http:\/\/localhost:8080\/index.html$/);
});
casper.then(function() {
    this.mouse.click(311, 303);
});
casper.then(function() {
    this.test.assertTitle('');
});
casper.wait(1000);
casper.then(function() {
    this.captureSelector("screenshot1.png", "html");
});
casper.waitForSelector(x("//*[contains(text(), 'Home')]"),
    function success() {
        this.test.assertExists(x("//*[contains(text(), 'Home')]"));
      },
    function fail() {
        this.test.assertExists(x("//*[contains(text(), 'Home')]"));
});
casper.waitForSelector(x("//a[normalize-space(text())='About']"),
    function success() {
        this.test.assertExists(x("//a[normalize-space(text())='About']"));
        this.click(x("//a[normalize-space(text())='About']"));
    },
    function fail() {
        this.test.assertExists(x("//a[normalize-space(text())='About']"));
});
casper.then(function() {
    this.test.assertTitle('');
});
casper.wait(1000);
casper.then(function() {
    this.captureSelector("screenshot2.png", "html");
});
casper.waitForSelector(x("//*[contains(text(), 'About')]"),
    function success() {
        this.test.assertExists(x("//*[contains(text(), 'About')]"));
      },
    function fail() {
        this.test.assertExists(x("//*[contains(text(), 'About')]"));
});
casper.waitForSelector(x("//a[normalize-space(text())='Contact']"),
    function success() {
        this.test.assertExists(x("//a[normalize-space(text())='Contact']"));
        this.click(x("//a[normalize-space(text())='Contact']"));
    },
    function fail() {
        this.test.assertExists(x("//a[normalize-space(text())='Contact']"));
});
casper.then(function() {
    this.test.assertUrlMatch(/^http:\/\/localhost:8080\/contact.html$/);
});
casper.then(function() {
    this.test.assertTitle('');
});
casper.wait(1000);
casper.then(function() {
    this.captureSelector("screenshot3.png", "html");
});
casper.waitForSelector(x("//*[contains(text(), 'Contact')]"),
    function success() {
        this.test.assertExists(x("//*[contains(text(), 'Contact')]"));
      },
    function fail() {
        this.test.assertExists(x("//*[contains(text(), 'Contact')]"));
});

casper.run(function() {this.test.renderResults(true);});