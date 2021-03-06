'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getValue = require('./getValue');

var _getValue2 = _interopRequireDefault(_getValue);

var _isReactNative = require('../isReactNative');

var _isReactNative2 = _interopRequireDefault(_isReactNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timer = 0;

var createOnChange = function createOnChange(change) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var after = _ref.after;
  var parse = _ref.parse;
  var normalize = _ref.normalize;
  return function (event) {
    // read value from input
    var value = (0, _getValue2.default)(event, _isReactNative2.default);

    // parse value if we have a parser
    if (parse) {
      value = parse(value);
    }

    // normalize value
    if (normalize) {
      value = normalize(value);
    }

    // dispatch change action
    change(value);

    // call after callback
    if (after) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        after(value, 'change');
      }, 300);
    }
  };
};

exports.default = createOnChange;