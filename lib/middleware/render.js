/**
 * Create middleware to render template.
 * @param {string} template
 * @returns {function}
 */
function render(template) {
    return function(req, res, next) {
        res.render(template);
    };
}

/** export middleware function */
module.exports = render;
