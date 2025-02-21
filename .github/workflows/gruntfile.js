module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["./css"]
                },
                files: {"./css/style.css": "./less/styles.less"}
            },
            production: {
                options: {
                    paths: ["./css"],
                    cleancss: true
                },
                files: {"./css/style.css": "./less/styles.less"}
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'css/style.min.css': ['css/style.css']
                }
            }
        },
        clean: ['css/style.css', 'css/style.css.map'],
        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['less/*.less'],
                tasks: ['less', 'cssmin', 'clean'],
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'cssmin', 'clean']);

};