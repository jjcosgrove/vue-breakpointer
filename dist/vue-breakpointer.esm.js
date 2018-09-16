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

// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

var $export = require('./_export');
var $map = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

var $export$1 = require('./_export');
var $filter = require('./_array-methods')(2);

$export$1($export$1.P + $export$1.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

var VueBreakpointer = {
  install: function install(Vue, options) {
    var defaults = {
      xs: 320,
      sm: 480,
      md: 720,
      lg: 1200
    };
    var breakpoints = options.breakpoints ? options.breakpoints : defaults;
    Vue.mixin('VueBreakpointer', {
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
          return this.windowDimensions.width <= 320;
        },
        sm: function sm() {
          return this.windowDimensions.width > this.breakpoints.xs && this.windowDimensions.width <= 480;
        },
        md: function md() {
          return this.windowDimensions.width > this.breakpoints.sm && this.windowDimensions.width <= 720;
        },
        lg: function lg() {
          return this.windowDimensions.width > this.breakpoints.md && this.windowDimensions.width <= 1200;
        },
        xl: function xl() {
          return this.windowDimensions.width > this.breakpoints.lg;
        },
        breakpoint: function breakpoint() {
          var _this = this;

          var bpd = Object.keys(this.breakpoints).map(function (bp) {
            return {
              breakpoint: bp,
              isActive: _this[bp]
            };
          }).filter(function (bp) {
            return bp.isActive;
          });
          return bpd.length ? bpd.pop().breakpoint : 'xl';
        }
      },
      methods: {
        updateWindowDimensions: function updateWindowDimensions() {
          this.windowDimensions.width = window.innerWidth;
          this.windowDimensions.height = window.innerHeight;
        }
      },
      mounted: function mounted() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
      },
      beforeDestroy: function beforeDestroy() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
    });
  }
};

export default VueBreakpointer;
