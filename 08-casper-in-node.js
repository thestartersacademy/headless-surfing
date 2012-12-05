/*
casper as child process in node
*/

var exec = require('child_process').exec;

var child = exec('casperjs 01-responsive-screenshot.js', function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
});