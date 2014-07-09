# Grunt + Swig Static Localized Html Generator

Generates static html files using grunt and swig that are localized.

## Installation

### From command line

```
npm install grunt-swig-localization
```

### Using package.json

```
{
    dependencies: {
        "grunt-swig-localization": "~0.1.0"
    }
}
```

## Usage

To see an example project using this module check out [https://github.com/kengoldfarb/grunt-swig-localization-examples](https://github.com/kengoldfarb/grunt-swig-localization-examples)

### Example Gruntfile.js

```
module.exports = function(grunt) {

    grunt.initConfig({
        swigLocalization: {
			main: {
				src: ['templates/*.swig', 'templateData/*.json'],
	            outputDir: 'dist'
			}
        }
    });

    grunt.loadNpmTasks('grunt-swig-localization');

    grunt.registerTask('default', ['swigLocalization']);
};
```

### File naming conventions

Template files must follow the format ```[name].html.swig``` and data files must follow the format ```[name]--[lang].json```

Check out the examples for a typical file structure: https://github.com/kengoldfarb/grunt-swig-localization-examples

## Tests

TODO

## License

MIT
