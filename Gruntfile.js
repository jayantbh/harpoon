/**
 * Created by Jayant Bhawal on 19-03-2016.
 */
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		express: {
			options: {
				port: process.env.port || 8080
			},
			dev: {
				options: {
					script: 'index.js'
				}
			}
		},
		watch: {
			assets: {
				files: ['app/**/*.css', 'app/**/*.js', 'app/**/*.html'],
				options: {
					livereload: true
				}
			},
			express: {
				files: ['index.js','Gruntfile.js'],
				tasks: ['express:dev'],
				options: {
					spawn: false
				}
			},
			includeSource: {
				// Watch for added and deleted scripts to update index.html
				files: ['app/**/*.js','app/**/*.css'],
				tasks: ['includeSource'],
				options: {
					event: ['added', 'deleted']
				}
			}
		},
		open: {
			dev: {
				path: 'http://localhost:8080/'
			}
		},
		includeSource: {
			options: {
				basePath: 'app',
				baseUrl: '',
				ordering: 'top-down'
			},
			app: {
				files: {
					'app/index.html': 'app/index.html'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-include-source');

	grunt.registerTask('install', 'install npm and bower dependencies', function () {
		var exec = require('child_process').exec;
		var cb = this.async();
		exec('npm install', {cwd: '/'}, function (err, stdout, stderr) {
			console.log(stdout);
			cb();
		});
		exec('bower install', {cwd: '/'}, function (err, stdout, stderr) {
			console.log(stdout);
			cb();
		});
	});
	grunt.registerTask('serve', 'launch server', function () {
		var exec = require('child_process').exec;
		var cb = this.async();
		exec('npm start', {cwd: '/'}, function (err, stdout, stderr) {
			console.log(stdout);
			cb();
		});
	});

	grunt.registerTask('server', ['express:dev']);
	grunt.registerTask('default', ['includeSource', 'server', 'open', 'watch']);
	grunt.registerTask('setup', ['install', 'default']);
};
