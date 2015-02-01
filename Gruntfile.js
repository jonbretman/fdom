module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({

        karma: {
            unit: {
                reporters: ['mocha', 'coverage'],
                browsers: ['PhantomJS'],
                singleRun: true,
                autoWatch: false,
                frameworks: ['mocha', 'expect', 'sinon'],
                preprocessors: {
                    'src/**/*.js': ['coverage']
                },
                coverageReporter: {
                    type: 'html'
                },
                files: [
                    {
                        pattern: 'src/fdom.js'
                    },
                    {
                        pattern: 'test/test-fdom.js'
                    }
                ]
            }
        }

    });

    grunt.registerTask('default', ['karma']);

};
