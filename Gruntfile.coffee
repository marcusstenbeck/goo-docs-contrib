module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    assemble:
      options:
        layout: 'layouts/default.hbs'
        assets: '<%=pkg.siteConfig.publicDir%>/src/assets'
        helpers: ['src/helpers/helpers-*.js']
      root:
        options:
          ext: '.html'
          engine: 'handlebars'
        src: 'src/**/*.{hbs,md}'
        dest: '<%=pkg.siteConfig.publicDir%>/'

    copy:
      assets:
        files:
          [
            {expand: true, cwd: 'vendor/bootstrap/dist', src: ['**'], dest: '<%=pkg.siteConfig.publicDir%>/src/assets/'}
            {expand: true, cwd: 'vendor/jquery', src: ['jquery.js'], dest: '<%=pkg.siteConfig.publicDir%>/src/assets/js/'}
          ]
    
    watch:
      templates:
        files: ['src/**/*.*']
        tasks: ['assemble']


  grunt.loadNpmTasks 'assemble'
  grunt.loadNpmTasks 'assemble-less'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', [
      'copy'
      'assemble'
      'watch'
    ]