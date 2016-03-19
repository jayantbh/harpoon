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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};
