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
                files: ['**/*.css', '**/*.js', '**/*.html'],
                options: {
                    livereload: true
                }
            },
            express: {
                files:  [ '**/*.js' ],
                tasks:  [ 'express:dev' ],
                options: {
                    spawn: false
                }
            }
        },
        open: {
            dev: {
                path: 'http://localhost:8080/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-express-server');

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

    grunt.registerTask('server', [ 'express:dev' ]);
    grunt.registerTask('default', ['server', 'open', 'watch']);
    grunt.registerTask('setup', ['install', 'default']);
};
