module.exports = {
  "extends": ["standard"],
  "plugins": [
    "standard",
    "promise"
  ],
  "rules": {
    "no-return-assign": "off",
    "object-property-newline": "off",
    "object-curly-spacing": [ "error", "always" ],
    "array-bracket-spacing": [ "error", "always" ],
    "space-in-parens": [ "error", "always" ],
    "no-new": "off"
  },
  "root": true,
  "env": {
    browser: true,
    es6: true
  },
  "parser": "babel-eslint",
  "globals": {
    "ENV": false,
    "Back": false,
    "Bounce": false,
    "Circ": false,
    "Cubic": false,
    "Ease": false,
    "EaseLookup": false,
    "Elastic": false,
    "Expo": false,
    "Linear": false,
    "Power0": false,
    "Power1": false,
    "Power2": false,
    "Power3": false,
    "Power4": false,
    "Quad": false,
    "Quart": false,
    "Quint": false,
    "RoughEase": false,
    "Sine": false,
    "SlowMo": false,
    "SteppedEase": false,
    "Strong": false,
    "Draggable": false,
    "SplitText": false,
    "VelocityTracker": false,
    "CSSPlugin": false,
    "ThrowPropsPlugin": false,
    "BezierPlugin": false
  }
};