module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        expand: true,
        cwd: "node_modules/",
        src: [
          "angular/angular.min.js",
          "angular-animate/angular-animate.min.js",
          "angular-aria/angular-aria.min.js",
          "angular-material/angular-material.min.js",
          "sortablejs/ng-sortable.js",
          "sortablejs/Sortable.js",
          "bootstrap/dist/css/bootstrap.css",
          "socket.io-client/socket.io.js"
        ],
        "dest": "public/vendors/"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['copy']);

};