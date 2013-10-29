module.exports = function(grunt) {

  var config = {
    theme: '_themes/modus'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: config,
    watch: {
      sass: {
        files: ['<%= config.theme %>/scss/**/*.{scss,sass}'],
        tasks: ['sass:dist']
      },
      livereload: {
        files: ['*.html', '*.php', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
        options: {
          livereload: true
        }
      }
    },
    sass: {
      dist: {
        files: {
          '<%= config.theme %>/css/modus.css': '<%= config.theme %>/scss/modus.scss'
        }
      }
    }
  });
  grunt.registerTask('default', ['sass:dist', 'watch']);
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
};