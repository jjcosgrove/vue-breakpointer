// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

// 21.1.3.7 String.prototype.includes(searchString, position = 0)
var $export$1 = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export$1($export$1.P + $export$1.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators$1 = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators$1.Arguments = Iterators$1.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export$2 = require('./_export');

$export$2($export$2.S, 'Array', { isArray: require('./_is-array') });

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var $export$3 = require('./_export');
var $map = require('./_array-methods')(1);

$export$3($export$3.P + $export$3.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export$4 = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export$4($export$4.P + $export$4.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME$1 = 'name';

// 19.2.4.2 name
NAME$1 in FProto || require('./_descriptors') && dP(FProto, NAME$1, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

var breakpointNames = ['xs', 'sm', 'md', 'lg', 'xl'];
var breakpointDefaults = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

var generateMixin = function generateMixin(breakpoints) {
  return {
    data: function data() {
      return {
        windowDimensions: {
          width: 0,
          height: 0
        },
        breakpoints: breakpoints
      };
    },
    computed: {
      xs: function xs() {
        return this.windowDimensions.width < this.breakpoints.sm;
      },
      sm: function sm() {
        return this.windowDimensions.width >= this.breakpoints.sm && this.windowDimensions.width < this.breakpoints.md;
      },
      md: function md() {
        return this.windowDimensions.width >= this.breakpoints.md && this.windowDimensions.width < this.breakpoints.lg;
      },
      lg: function lg() {
        return this.windowDimensions.width >= this.breakpoints.lg && this.windowDimensions.width < this.breakpoints.xl;
      },
      xl: function xl() {
        return this.windowDimensions.width >= this.breakpoints.xl;
      },
      breakpoint: function breakpoint() {
        var _this = this;

        // find which breakpoints is currently active
        return breakpointNames.map(function (breakpointName) {
          return {
            name: breakpointName,
            active: _this[breakpointName]
          };
        }).find(function (breakpoint) {
          return breakpoint.active;
        }).name;
      }
    },
    methods: {
      updateWindowDimensions: function updateWindowDimensions() {
        this.windowDimensions.width = window.innerWidth;
        this.windowDimensions.height = window.innerHeight;
      }
    },
    mounted: function mounted() {
      // add listener
      window.addEventListener('resize', this.updateWindowDimensions); // initialize with values

      this.updateWindowDimensions();
    },
    beforeDestroy: function beforeDestroy() {
      // remove listener
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
  };
};

var VueBreakpointer = {
  install: function install(Vue, options) {
    // basic check for breakpoints
    var hasBreakpoints = options && options.breakpoints && _typeof(options.breakpoints) === 'object'; // only allow options to take effect when *all* breakpoints are provided

    var hasAllBreakpoints = hasBreakpoints && Object.keys(breakpointDefaults).every(function (breakpoint) {
      return Object.keys(options.breakpoints).includes(breakpoint);
    }); // show a warning for partial breakpoint configuration

    if (hasBreakpoints && !hasAllBreakpoints) {
      console.warn('VueBreakpointer: you must provide either all or no breakpoints');
    } // assign breakpoints


    var breakpoints = hasAllBreakpoints ? options.breakpoints : breakpointDefaults;
    Vue.mixin(generateMixin(breakpoints));
  }
};
var VueBreakpointerMixin = generateMixin(breakpointDefaults);

export default VueBreakpointer;
export { VueBreakpointerMixin };
