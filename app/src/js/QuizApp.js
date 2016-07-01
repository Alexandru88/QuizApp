/**
 *  THE global Namespace.
 *
 *  @namespace
 */
var QUIZAPP = QUIZAPP || {};


/**
 *  Utility function, to extend the global namespace
 *
 *  @author Stoyan Stefanov, Addy Osmani (http://addyosmani.com/blog/essential-js-namespacing/)
 */
QUIZAPP.extend = function (ns, ns_string) {
    var parts = ns_string.split('.'),
        parent = ns,
        pl, i;

    // strip redundant leading global
    if (parts[0] === 'QUIZAPP') {
        parts = parts.slice(1);
    }

    pl = parts.length;

    for (i = 0; i < pl; i += 1) {
        // create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }

    return parent;
}



$(document).ready(function () {

    QUIZAPP.Quiz.init();

});