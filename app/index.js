'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');

var RequireJsGenerator = module.exports = function RequireJsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  
  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';
  this.coffee = options.coffee;

  // for hooks to resolve on mocha by default
  options['test-framework'] = this.testFramework;

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', {
    as: 'app',
    options: {
      options: {
        'skip-install': options['skip-install-message'],
        'skip-message': options['skip-install']
      }
    }
  });

  this.options = options;

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(RequireJsGenerator, yeoman.generators.Base);

RequireJsGenerator.prototype.askForCSSFramework = function askForCSSFramework() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'list',
    name: 'cssFramework',
    message: 'What CSS framework would you like to include?',
    choices: [{
      name: 'SASS Bootstrap with Font-Awesome',
      value: 'SASSBootstrap'
    }, {
      name: 'SASS Compass framework',
      value: 'CompassFramework'
    }]
  }];

  this.prompt(prompts, function (props) {
    this.cssFramework = props.cssFramework;
    cb();
  }.bind(this));
};

RequireJsGenerator.prototype.askForJSFile = function askForJSFile() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'jsFile',
    message: 'What utils would you like to include?',
    choices: [{
      name: 'Underscore.js',
      value: 'includeUnderscore',
      checked: true
    }, {
      name: 'Jasmine Testing framework',
      value: 'includeJasmine',
      checked: true
    }]
  }];

  this.prompt(prompts, function (props) {
    function includeJS(js) { return props.jsFile.indexOf(js) !== -1; }

    // JS
    this.includeUnderscore = includeJS('includeUnderscore');
    this.includeJasmine = includeJS('includeJasmine');

    if (this.includeJasmine) { this.testFramework = 'jasmine'; }
    
    cb();
  }.bind(this));
};

RequireJsGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

RequireJsGenerator.prototype.packageJSON= function packageJSON() {
  this.template('_package.json', 'package.json');
};

RequireJsGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

RequireJsGenerator.prototype.jshint = function jshint() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

RequireJsGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'app/favicon.ico');
  this.copy('404.html', 'app/404.html');
  this.copy('robots.txt', 'app/robots.txt');
  this.copy('htaccess', 'app/.htaccess');
  this.template('index.html', 'app/index.html');
};

RequireJsGenerator.prototype.mainStylesheet = function mainStylesheet() {
  var cssFile = 'style.scss', header = '',
      content = this.readFileAsString(path.join(this.sourceRoot(), 'main.scss'));

  if (this.cssFramework === 'SASSBootstrap' || this.cssFramework === 'NativeBootstrap') {
      content += this.readFileAsString(path.join(this.sourceRoot(), 'bootstrap.css'));
  }

  switch(this.cssFramework) {
    case 'CompassFramework':
      header += "@import 'compass';\n" + 
        "@import 'compass/reset';\n";
      break;
    case 'SASSBootstrap':
      header += "$icon-font-path: '../bower_components/sass-bootstrap/fonts/';\n" +
          "$fa-font-path: '../bower_components/font-awesome/fonts';\n" +
          "@import '../bower_components/sass-bootstrap/lib/bootstrap';\n" +
          "@import '../bower_components/font-awesome/scss/font-awesome';\n";
      break;
  }
  header += "@import 'custom_mixins.scss';\n";
  this.copy('_custom_mixins.scss', 'app/styles/_custom_mixins.scss');
  this.write('app/styles/' + cssFile, header + content);
};

RequireJsGenerator.prototype.jsFile = function jsFile() {
  var prefix = 'app/scripts';
  this.mkdir(prefix);
  this.copy('scripts/main.js', prefix + '/main.js');
};

RequireJsGenerator.prototype.app = function app() {
  this.mkdir('app/images');
  this.mkdir('app/partials');
  this.mkdir('app/scripts/vendor');
  this.mkdir('config');
  this.mkdir('test');
};

RequireJsGenerator.prototype.install = function install() {
  if (this.options['skip-install']) {
    return;
  }

  var done = this.async();
  this.installDependencies({
    skipMessage: this.options['skip-install-message'],
    skipInstall: this.options['skip-install'],
    callback: function() {
      var projectDir = process.cwd() + '/app';
      fs.exists(projectDir + '/scripts/vendor/require.js', function(exists) {
        if (!exists) {
          fs.createReadStream(projectDir + '/bower_components/requirejs/require.js')
          .pipe(fs.createWriteStream(projectDir + '/scripts/vendor/require.js'));
        }
      });
    }
  });
};

