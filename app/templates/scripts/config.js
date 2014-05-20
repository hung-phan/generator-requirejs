requirejs.config({
    baseUrl: './scripts',
    paths: {<% if (includeModernizr) { %>
        'modernizr': '../bower_components/modernizr/modernizr',<% } %>
        'jquery': '../bower_components/jquery/dist/jquery',<% if (includeLodash) { %>
        'lodash': '../bower_components/lodash/dist/lodash',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
        'bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap'<% } %>
    },
    shim: {<% if (includeLodash) { %>
        'lodash': {
            exports: '_'
        },<% } %>
        'bootstrap': ['jquery']
    }
});
