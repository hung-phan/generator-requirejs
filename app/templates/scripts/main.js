define('main', [], function() {
    requirejs.config({
        paths: {<% if (includeModernizr) { %>
            'modernizr': '../bower_components/modernizr/modernizr',<% } %>
            'jquery': '../bower_components/jquery/dist/jquery',<% if (includeUnderscore) { %>
            'underscore': '../bower_components/underscore/underscore',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
            'bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap'<% } %>
        },
        shim: {
            'bootstrap': ['jquery']
        }
    });

    Window.name = 'NG_DEFER_BOOTSTRAP!';

    requirejs([
        'jquery',<% if (includeModernizr) { %>
        'modernizr',<% } %><% if (includeUnderscore) { %> 
        'underscore',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
        'bootstrap'<% } %>
    ], function($) {
        'use strict';
        /* App Module */
    });
});
