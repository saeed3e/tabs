module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/j/<%= pkg.name %>.js',
                dest: 'gen/j/<%= pkg.name %>.min.js'
            }
        },
        jasmine: {
            coverage: {
                src: 'src/**/*.js',
                options: {
                    specs: 'spec/**/*.js',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'src/coverage/coverage.json',
                        //report: 'src/coverage',
                        report: {
                            type: 'cobertura',
                            options: {
                                dir: 'src/coverage'
                            }
                        },
                        report: {
                            type: 'lcov',
                            options: {
                                dir: 'src/coverage'
                            }
                        },
                        thresholds: {
                            lines: 5,
                            statements: 5,
                            branches: 5,
                            functions: 5
                        }
                    }
                }
            },
        },
        coveralls: {
            // Options relevant to all targets
            options: {
                // When true, grunt-coveralls will only print a warning rather than
                // an error, to prevent CI builds from failing unnecessarily (e.g. if
                // coveralls.io is down). Optional, defaults to false.
                force: false
            },
            your_target: {
                // LCOV coverage file (can be string, glob or array)
                src: 'src/coverage/lcov.info'
            },
        },
    });


    grunt.file.expand('./../node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
    require('./../node_modules/grunt-config-merge')(grunt);

    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('test', ['jasmine']);

};
