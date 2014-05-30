require([
    'jquery',<% if (includeLodash) { %>
    'lodash',<% } %><% if (cssFramework === 'SASSBootstrap') { %>
    'bootstrap'<% } %>
], function($) {
    'use strict';

    $(document).ready(function() {
        /* App Module */

    });
});
