require([
    'jquery',<% if (includeModernizr) { %>
    'modernizr',<% } %><% if (includeLodash) { %>
    'lodash',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
    'bootstrap'<% } %>
], function($) {
    'use strict';

    $(document).ready(function() {
        /* App Module */

    });
});
