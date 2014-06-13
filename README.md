# generator-requirejs

A generator for [Yeoman](http://yeoman.io).


## Getting Started

To run this version of yeoman generator. First, make sure that you have already installed yeoman

```bash
$ npm install -g yo
$ npm -g install hung-phan/generator-requirejs
```

Finally, initiate the generator:

```bash
$ yo requirejs
```

Other dependencies

1. [Bower] (http://bower.io/)

2. [Grunt] (http://gruntjs.com/)

3. SASS (gem install sass)

4. Compass (gem install compass)

## Usage

The version of generator uses SASS Bootstrap as its main theme. If you want to use Compass framework, make sure that you
view their docs to know what to include [Compass](http://compass-style.org/reference/compass)

To run the serve, and start building your application
```bash
$ grunt serve
```
It will automatically open the webpage on your localhost:9000, or you will have to do it manuallly

To build files for production
```bash
$ grunt build
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
