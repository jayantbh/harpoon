/**
 * Created by Jayant Bhawal on 19-03-2016.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            assets: {
                files: ['**/*.css','**/*.js','**/*.html'],
                options: {
                    livereload: true
                }
            }
        },
        open : {
            dev: {
                path: 'http://localhost:8080/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('install', 'install npm and bower dependencies', function() {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('npm install', {cwd: '/'}, function(err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
        exec('bower install', {cwd: '/'}, function(err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
    });

    grunt.registerTask('default', ['open', 'watch']);
    grunt.registerTask('setup', ['install', 'default']);
};
