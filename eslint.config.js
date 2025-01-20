// eslint.config.js
const node = require('eslint-plugin-node'); 

module.exports = [
    {
        files: ["**/*.js"],
        plugins: {
            "eslint-plugin-node": node
        }, 
        rules: {
            semi: "error",
            "prefer-const": "error"
        }
    }
];