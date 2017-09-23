const path = require('path');

module.exports = {
    plugins: {
        'postcss-import': {
            // Allows Post-CSS to search src directory for modules so syntax
            // like @import 'common/variables.css' is legal
            path: [
                path.resolve(__dirname, '..', 'src')
            ]
        },
        // Allows for sass-like syntax
        'precss': {},
        'autoprefixer': {}
    }
}
