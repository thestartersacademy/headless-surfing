/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		lint: {
			files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
		},
		test: {
			files: ['test/**/*.js']
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'lint test'
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true
			},
			globals: {
				jQuery: true
			}
		},
		casperjs: {
				files: ['01-responsive-screenshot.js']
		},
		jasmine : {
			src : 'src/**/*.js',
			specs : 'specs/**/*Spec.js',
			helpers : 'specs/helpers/*.js',
			timeout : 10000,
			template : 'src/custom.tmpl',
			junit : {
				output : 'junit/'
			},
			phantomjs : {
				'ignore-ssl-errors' : true
			}
		},
		'jasmine-server' : {
			browser : false
		}
	});

	grunt.loadNpmTasks('grunt-casperjs');
	grunt.loadNpmTasks('grunt-jasmine-runner');

	// Default task.
	grunt.registerTask('default', 'casperjs');

};
