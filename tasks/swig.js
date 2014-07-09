'use strict';

module.exports = function(grunt) {

    var fs = require('fs');
    var swig = require('swig');
    var path = require('path');

    grunt.registerMultiTask('swigLocalization', 'swig templater', function(taskConfig) {
        var outputDir = process.cwd() + '/' + this.data.outputDir;
        var templateDir = process.cwd() + '/' + this.data.templateDir;

        var templateData = {};
        var templates = {};

        this.filesSrc.forEach(function(file) {
            var matches = file.match(/([\w_\-]+)((\.html\.swig)|(\.json))/);
            if(matches && matches[1] && matches[2]) {
                var fileName = matches[1];
                var extension = matches[2];

                // Determine if it's an html.swig or .json file
                if(extension == '.html.swig') {
                    templates[fileName] = {
                        templateFile: file,
                        outputFile: outputDir + '/' + fileName
                    }
                }else if(extension == '.json') {
                    var subMatches = fileName.match(/([\w]+)--(\w+)/);
                    if(subMatches && subMatches[1] && subMatches[2]) {
                        var lang = subMatches[2];
                        fileName = subMatches[1];
                        templateData[fileName] = templateData[fileName] || {};

                        var langObject = grunt.file.readJSON(file);

                        templateData[fileName][lang] = langObject
                    }
                }
            }
        });
        // At this point we have an object containing our templates:
        // And an object containing our template data

        // Generate the html files and output them to the dist directory
        for(var fileName in templates) {
            var template = templates[fileName];

            for(var lang in templateData[fileName]) {
                var data = templateData[fileName][lang];
                var outputFile = template.outputFile + '.' + lang + '.html';
                grunt.file.write(outputFile, swig.renderFile(template.templateFile, data));
                grunt.log.writeln('Generated localized file: ' + outputFile);
            }
        }

    });
};
