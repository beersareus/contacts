module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				newcap: false,
				es3: true,
				forin: true,
				indent: 4,
				unused: 'vars',
				strict: true,
				trailing: true,
				quotmark: 'single',
				latedef: true,
				globals: {
					jQuery: true
				}
			},
			files: {
				src: ['Gruntfile.js', 'js/src/*.js']
			}
		},
		watch: {
			jshint: {
				files: ['js/src/*.js'],
				tasks: ['jshint']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['jshint', 'watch:jshint']); //start by 'grunt'

	grunt.registerTask('my-task', 'My custom task.', function() { //custom task
		grunt.log.writeln('This is my custom task.');
	});
};
