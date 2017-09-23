module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  }
};
