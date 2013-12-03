var LIVERELOAD_PORT = 35729;

module.exports = function(grunt) {
  grunt.initConfig({
    
    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        /* need to use the theme name as the css file for statamic includes */
        files: {
          'css/build/modus.css': 'scss/app.scss'
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      css: {
        files: ['css/build/modus.css'],
        tasks: ['autoprefixer']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '/{,*/}*.html',
          'css/modus.css',
          'js/{,*/}*.js',
          'img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    autoprefixer: {
      // just prefix the specified file
      single_file: {
        src: 'css/build/modus.css',
        dest: 'css/modus.css'
      }
    }

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass', 'autoprefixer']);
  grunt.registerTask('default', ['build','watch']);
}