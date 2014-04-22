require([
    'jquery',<% if (includeModernizr) { %>
    'modernizr',<% } %><% if (includeUnderscore) { %>
    'underscore',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
    'bootstrap'<% } %>
], function($) {
    'use strict';

    $(document).ready(function() {
        /* App Module */

    });
});
