var isTouchDevice = window.matchMedia
  ? window.matchMedia("(pointer: coarse)").matches
  : "ontouchstart" in document.documentElement;
var isSmallScreen = window.matchMedia
  ? window.matchMedia("(max-width: 600px)").matches
  : true;

(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object")
    module.exports = factory();
  else if (typeof define === "function" && define.amd) define([], factory);
  else if (typeof exports === "object") exports["Fluid"] = factory();
  else root["Fluid"] = factory();
})(window, function () {
  return (function (modules) {
    // webpackBootstrap
    // The module cache
    var installedModules = {};

    // The require function
    function __webpack_require__(moduleId) {
      // Check if module is in cache
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      // Create a new module (and put it into the cache)
      var module = (installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {},
      });

      // Execute the module function
      modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );

      // Flag the module as loaded
      module.l = true;

      // Return the exports of the module
      return module.exports;
    }

    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;

    // expose the module cache
    __webpack_require__.c = installedModules;

    // define getter function for harmony exports
    __webpack_require__.d = function (exports, name, getter) {
      if (!__webpack_require__.o(exports, name)) {
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter,
        });
      }
    };

    // define __esModule on exports
    __webpack_require__.r = function (exports) {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
      }
      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
    };

    // create a fake namespace object
    // mode & 1: value is a module id, require it
    // mode & 2: merge all properties of value into the ns
    // mode & 4: return value when already ns object
    // mode & 8|1: behave like require
    __webpack_require__.t = function (value, mode) {
      if (mode & 1) value = __webpack_require__(value);
      if (mode & 8) return value;
      if (mode & 4 && typeof value === "object" && value && value.__esModule)
        return value;
      var ns = Object.create(null);
      __webpack_require__.r(ns);
      Object.defineProperty(ns, "default", {
        enumerable: true,
        value: value,
      });
      if (mode & 2 && typeof value != "string")
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function (key) {
              return value[key];
            }.bind(null, key)
          );
      return ns;
    };

    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function (module) {
      var getter =
        module && module.__esModule
          ? function getDefault() {
              return module["default"];
            }
          : function getModuleExports() {
              return module;
            };
      __webpack_require__.d(getter, "a", getter);
      return getter;
    };

    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };

    // __webpack_public_path__
    __webpack_require__.p = "";

    // Load entry module and return exports
    return __webpack_require__((__webpack_require__.s = "./src/fluid.js"));
  })({
    "./assets/dither.png": function (module, exports) {
      module.exports =
        "data:image/png;base64,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";
    },

    "./src/defaults.js": function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.setBehaviors = setBehaviors;
      exports.SHADER_SOURCE =
        exports.DRAWING_PARAMS =
        exports.behavior =
          void 0;

      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          if (enumerableOnly)
            symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          keys.push.apply(keys, symbols);
        }
        return keys;
      }

      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          if (i % 2) {
            ownKeys(source, true).forEach(function (key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(
              target,
              Object.getOwnPropertyDescriptors(source)
            );
          } else {
            ownKeys(source).forEach(function (key) {
              Object.defineProperty(
                target,
                key,
                Object.getOwnPropertyDescriptor(source, key)
              );
            });
          }
        }
        return target;
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }

      var behavior = {
        sim_resolution: 128,
        dye_resolution: 512,
        paused: false,
        clamp_values: true,
        embedded_dither: true,

        /* Fluid Dissipation Behaviors*/
        dissipation: 0.97,
        velocity: 0.98,
        pressure: 0.8,
        pressure_iteration: 20,

        /* Fluid Color */
        fluid_color: [
          [0, 0, 0],
          [0.4, 0.2, 0],
        ],

        /* Characteristics */
        curl: 0,
        emitter_size: 0.5,
        render_shaders: true,
        multi_color: true,

        /* Bloom */
        render_bloom: false,
        bloom_iterations: 8,
        bloom_resolution: 256,
        intensity: 0.8,
        threshold: 0.6,
        soft_knee: 0.7,
        // bloom_resolution: 256*4,
        // bloom_iterations: 1,
        // intensity: 0.6,
        // threshold: 0.3,
        // soft_knee: 1.0,

        /* Background */
        background_color: {
          r: 15,
          g: 15,
          b: 15,
        },
        transparent: false,
      };
      exports.behavior = behavior;
      var DRAWING_PARAMS = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
        powerPreference: "default",
      };
      exports.DRAWING_PARAMS = DRAWING_PARAMS;
      var SHADER_SOURCE = {
        blank: "",
        vertex:
          "\n                  precision highp float;\n              \n                  attribute vec2 aPosition;\n                  varying vec2 vUv;\n                  varying vec2 vL;\n                  varying vec2 vR;\n                  varying vec2 vT;\n                  varying vec2 vB;\n                  uniform vec2 texelSize;\n              \n                  void main () {\n                      vUv = aPosition * 0.5 + 0.5;\n                      vL = vUv - vec2(texelSize.x, 0.0);\n                      vR = vUv + vec2(texelSize.x, 0.0);\n                      vT = vUv + vec2(0.0, texelSize.y);\n                      vB = vUv - vec2(0.0, texelSize.y);\n                      gl_Position = vec4(aPosition, 0.0, 1.0);\n                  }",
        clear:
          "\n                  precision mediump float;\n                  precision mediump sampler2D;\n              \n                  varying highp vec2 vUv;\n                  uniform sampler2D uTexture;\n                  uniform float value;\n              \n                  void main () {\n                      gl_FragColor = value * texture2D(uTexture, vUv);\n                  }\n              ",
        color:
          "\n                  precision mediump float;\n              \n                  uniform vec4 color;\n              \n                  void main () {\n                      gl_FragColor = color;\n                  }\n              ",
        background:
          "\n                    void main() { \n                        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); \n                    } \n            ",
        display:
          "\n                  precision highp float;\n                  precision highp sampler2D;\n              \n                  varying vec2 vUv;\n                  uniform sampler2D uTexture;\n              \n                  void main () {\n                      vec3 C = texture2D(uTexture, vUv).rgb;\n                      float a = max(C.r, max(C.g, C.b));\n                      gl_FragColor = vec4(C, a);\n                  }\n              ",
        displayBloom:
          "\n          precision highp float;\n          precision highp sampler2D;\n      \n          varying vec2 vUv;\n          uniform sampler2D uTexture;\n          uniform sampler2D uBloom;\n          uniform sampler2D uDithering;\n          uniform vec2 ditherScale;\n      \n          void main () {\n              vec3 C = texture2D(uTexture, vUv).rgb;\n              vec3 bloom = texture2D(uBloom, vUv).rgb;\n              vec3 noise = texture2D(uDithering, vUv * ditherScale).rgb;\n              noise = noise * 2.0 - 1.0;\n              bloom += noise / 800.0;\n              bloom = pow(bloom.rgb, vec3(1.0 / 2.2));\n              C += bloom;\n              float a = max(C.r, max(C.g, C.b));\n              gl_FragColor = vec4(C, a);\n          }\n      ",
        displayShading:
          "\n          precision highp float;\n          precision highp sampler2D;\n      \n          varying vec2 vUv;\n          varying vec2 vL;\n          varying vec2 vR;\n          varying vec2 vT;\n          varying vec2 vB;\n          uniform sampler2D uTexture;\n          uniform vec2 texelSize;\n      \n          void main () {\n              vec3 L = texture2D(uTexture, vL).rgb;\n              vec3 R = texture2D(uTexture, vR).rgb;\n              vec3 T = texture2D(uTexture, vT).rgb;\n              vec3 B = texture2D(uTexture, vB).rgb;\n              vec3 C = texture2D(uTexture, vUv).rgb;\n      \n              float dx = length(R) - length(L);\n              float dy = length(T) - length(B);\n      \n              vec3 n = normalize(vec3(dx, dy, length(texelSize)));\n              vec3 l = vec3(0.0, 0.0, 1.0);\n      \n              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\n              C.rgb *= diffuse;\n      \n              float a = max(C.r, max(C.g, C.b));\n              gl_FragColor = vec4(C, a);\n          }\n      ",
        displayBloomShading:
          "\n          precision highp float;\n          precision highp sampler2D;\n      \n          varying vec2 vUv;\n          varying vec2 vL;\n          varying vec2 vR;\n          varying vec2 vT;\n          varying vec2 vB;\n          uniform sampler2D uTexture;\n          uniform sampler2D uBloom;\n          uniform sampler2D uDithering;\n          uniform vec2 ditherScale;\n          uniform vec2 texelSize;\n      \n          void main () {\n              vec3 L = texture2D(uTexture, vL).rgb;\n              vec3 R = texture2D(uTexture, vR).rgb;\n              vec3 T = texture2D(uTexture, vT).rgb;\n              vec3 B = texture2D(uTexture, vB).rgb;\n              vec3 C = texture2D(uTexture, vUv).rgb;\n      \n              float dx = length(R) - length(L);\n              float dy = length(T) - length(B);\n      \n              vec3 n = normalize(vec3(dx, dy, length(texelSize)));\n              vec3 l = vec3(0.0, 0.0, 1.0);\n      \n              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\n              C *= diffuse;\n      \n              vec3 bloom = texture2D(uBloom, vUv).rgb;\n              vec3 noise = texture2D(uDithering, vUv * ditherScale).rgb;\n              noise = noise * 2.0 - 1.0;\n              bloom += noise / 800.0;\n              bloom = pow(bloom.rgb, vec3(1.0 / 2.2));\n              C += bloom;\n      \n              float a = max(C.r, max(C.g, C.b));\n              gl_FragColor = vec4(C, a);\n          }\n      ",
        bloomPreFilter:
          "\n          precision mediump float;\n          precision mediump sampler2D;\n      \n          varying vec2 vUv;\n          uniform sampler2D uTexture;\n          uniform vec3 curve;\n          uniform float threshold;\n      \n          void main () {\n              vec3 c = texture2D(uTexture, vUv).rgb;\n              float br = max(c.r, max(c.g, c.b));\n              float rq = clamp(br - curve.x, 0.0, curve.y);\n              rq = curve.z * rq * rq;\n              c *= max(rq, br - threshold) / max(br, 0.0001);\n              gl_FragColor = vec4(c, 0.0);\n          }\n      ",
        bloomBlur:
          "\n          precision mediump float;\n          precision mediump sampler2D;\n      \n          varying vec2 vL;\n          varying vec2 vR;\n          varying vec2 vT;\n          varying vec2 vB;\n          uniform sampler2D uTexture;\n      \n          void main () {\n              vec4 sum = vec4(0.0);\n              sum += texture2D(uTexture, vL);\n              sum += texture2D(uTexture, vR);\n              sum += texture2D(uTexture, vT);\n              sum += texture2D(uTexture, vB);\n              sum *= 0.25;\n              gl_FragColor = sum;\n          }\n      ",
        bloomFinal:
          "\n          precision mediump float;\n          precision mediump sampler2D;\n      \n          varying vec2 vL;\n          varying vec2 vR;\n          varying vec2 vT;\n          varying vec2 vB;\n          uniform sampler2D uTexture;\n          uniform float intensity;\n      \n          void main () {\n              vec4 sum = vec4(0.0);\n              sum += texture2D(uTexture, vL);\n              sum += texture2D(uTexture, vR);\n              sum += texture2D(uTexture, vT);\n              sum += texture2D(uTexture, vB);\n              sum *= 0.25;\n              gl_FragColor = sum * intensity;\n          }\n      ",
        splat:
          "\n          precision highp float;\n          precision highp sampler2D;\n      \n          varying vec2 vUv;\n          uniform sampler2D uTarget;\n          uniform float aspectRatio;\n          uniform vec3 color;\n          uniform vec2 point;\n          uniform float radius;\n      \n          void main () {\n              vec2 p = vUv - point.xy;\n              p.x *= aspectRatio;\n              vec3 splat = exp(-dot(p, p) / radius) * color;\n              vec3 base = texture2D(uTarget, vUv).xyz;\n              gl_FragColor = vec4(base + splat, 1.0);\n          }\n      ",
        advectionManualFiltering:
          "\n          precision highp float;\n          precision highp sampler2D;\n      \n          varying vec2 vUv;\n          uniform sampler2D uVelocity;\n          uniform sampler2D uSource;\n          uniform vec2 texelSize;\n          uniform vec2 dyeTexelSize;\n          uniform float dt;\n          uniform float dissipation;\n      \n          vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\n              vec2 st = uv / tsize - 0.5;\n      \n              vec2 iuv = floor(st);\n              vec2 fuv = fract(st);\n      \n              vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\n              vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\n              vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\n              vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\n      \n              return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\n          }\n      \n          void main () {\n              vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\n              gl_FragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);\n              gl_FragColor.a = 1.0;\n          }\n      ",
        advection:
          "\n          precision highp float;\n          precision highp sampler2D;\n      \n          varying vec2 vUv;\n          uniform sampler2D uVelocity;\n          uniform sampler2D uSource;\n          uniform vec2 texelSize;\n          uniform float dt;\n          uniform float dissipation;\n      \n          void main () {\n              vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n              gl_FragColor = dissipation * texture2D(uSource, coord);\n              gl_FragColor.a = 1.0;\n          }\n      ",
        divergence:
          "\n          precision mediump float;\n          precision mediump sampler2D;\n      \n          varying highp vec2 vUv;\n          varying highp vec2 vL;\n          varying highp vec2 vR;\n          varying highp vec2 vT;\n          varying highp vec2 vB;\n          uniform sampler2D uVelocity;\n      \n          void main () {\n              float L = texture2D(uVelocity, vL).x;\n              float R = texture2D(uVelocity, vR).x;\n              float T = texture2D(uVelocity, vT).y;\n              float B = texture2D(uVelocity, vB).y;\n      \n              vec2 C = texture2D(uVelocity, vUv).xy;\n              if (vL.x < 0.0) { L = -C.x; }\n              if (vR.x > 1.0) { R = -C.x; }\n              if (vT.y > 1.0) { T = -C.y; }\n              if (vB.y < 0.0) { B = -C.y; }\n      \n              float div = 0.5 * (R - L + T - B);\n              gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n          }\n      ",
        curl: "\n          precision mediump float;\n          precision mediump sampler2D;\n      \n          varying highp vec2 vUv;\n          varying highp vec2 vL;\n          varying highp vec2 vR;\n          varying highp vec2 vT;\n          varying highp vec2 vB;\n          uniform sampler2D uVelocity;\n      \n          void main () {\n              float L = texture2D(uVelocity, vL).y;\n              float R = texture2D(uVelocity, vR).y;\n              float T = texture2D(uVelocity, vT).x;\n              float B = texture2D(uVelocity, vB).x;\n              float vorticity = R - L - T + B;\n              gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\n          }\n      ",
        vorticity:
          "\n          precision highp float;\n          precision highp sampler2D;\n      \n          varying vec2 vUv;\n          varying vec2 vL;\n          varying vec2 vR;\n          varying vec2 vT;\n          varying vec2 vB;\n          uniform sampler2D uVelocity;\n          uniform sampler2D uCurl;\n          uniform float curl;\n          uniform float dt;\n      \n          void main () {\n              float L = texture2D(uCurl, vL).x;\n              float R = texture2D(uCurl, vR).x;\n              float T = texture2D(uCurl, vT).x;\n              float B = texture2D(uCurl, vB).x;\n              float C = texture2D(uCurl, vUv).x;\n      \n              vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\n              force /= length(force) + 0.0001;\n              force *= curl * C;\n              force.y *= -1.0;\n      \n              vec2 vel = texture2D(uVelocity, vUv).xy;\n              gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);\n          }\n      ",
        pressure:
          "\n          precision mediump float;\n          precision mediump sampler2D;\n      \n          varying highp vec2 vUv;\n          varying highp vec2 vL;\n          varying highp vec2 vR;\n          varying highp vec2 vT;\n          varying highp vec2 vB;\n          uniform sampler2D uPressure;\n          uniform sampler2D uDivergence;\n      \n          vec2 boundary (vec2 uv) {\n              return uv;\n              // uncomment if you use wrap or repeat texture mode\n              // uv = min(max(uv, 0.0), 1.0);\n              // return uv;\n          }\n      \n          void main () {\n              float L = texture2D(uPressure, boundary(vL)).x;\n              float R = texture2D(uPressure, boundary(vR)).x;\n              float T = texture2D(uPressure, boundary(vT)).x;\n              float B = texture2D(uPressure, boundary(vB)).x;\n              float C = texture2D(uPressure, vUv).x;\n              float divergence = texture2D(uDivergence, vUv).x;\n              float pressure = (L + R + B + T - divergence) * 0.25;\n              gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n          }\n      ",
        gradientSubtract:
          "\n          precision mediump float;\n          precision mediump sampler2D;\n      \n          varying highp vec2 vUv;\n          varying highp vec2 vL;\n          varying highp vec2 vR;\n          varying highp vec2 vT;\n          varying highp vec2 vB;\n          uniform sampler2D uPressure;\n          uniform sampler2D uVelocity;\n      \n          vec2 boundary (vec2 uv) {\n              return uv;\n              // uv = min(max(uv, 0.0), 1.0);\n              // return uv;\n          }\n      \n          void main () {\n              float L = texture2D(uPressure, boundary(vL)).x;\n              float R = texture2D(uPressure, boundary(vR)).x;\n              float T = texture2D(uPressure, boundary(vT)).x;\n              float B = texture2D(uPressure, boundary(vB)).x;\n              vec2 velocity = texture2D(uVelocity, vUv).xy;\n              velocity.xy -= vec2(R - L, T - B);\n              gl_FragColor = vec4(velocity, 0.0, 1.0);\n          }\n      ",
      };
      exports.SHADER_SOURCE = SHADER_SOURCE;

      function setBehaviors(params) {
        exports.behavior = behavior = _objectSpread({}, behavior, {}, params);
      }
    },

    "./src/fluid.js": function (module, exports, __webpack_require__) {
      "use strict";

      var _defaults = __webpack_require__(
        /*! ./defaults */ "./src/defaults.js"
      );

      var _initializer = __webpack_require__(
        /*! ./initializer */ "./src/initializer.js"
      );

      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          if (enumerableOnly)
            symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          keys.push.apply(keys, symbols);
        }
        return keys;
      }

      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          if (i % 2) {
            ownKeys(source, true).forEach(function (key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(
              target,
              Object.getOwnPropertyDescriptors(source)
            );
          } else {
            ownKeys(source).forEach(function (key) {
              Object.defineProperty(
                target,
                key,
                Object.getOwnPropertyDescriptor(source, key)
              );
            });
          }
        }
        return target;
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      module.exports =
        /*#__PURE__*/
        (function () {
          function Fluid(canvas, eventTarget) {
            _classCallCheck(this, Fluid);

            this.PARAMS = _defaults.behavior;
            /* Set canvas to desired width and height
                      TODO: Change to dynamic sizing  */

            this.eventTarget = eventTarget;

            this.canvas = canvas;
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;

            var _initWebGL = (0, _initializer.initWebGL)(this.canvas),
              programs = _initWebGL.programs,
              webGL = _initWebGL.webGL,
              colorFormats = _initWebGL.colorFormats,
              pointers = _initWebGL.pointers;

            this.programs = programs;
            this.webGL = webGL;
            this.colorFormats = colorFormats;
            this.pointers = pointers;
          }
          /**
           * Activate Fluid Canvas
           *  Initiates WebGL fluid loop.
           *
           *  TODO: Finish commenting
           *
           */

          _createClass(Fluid, [
            {
              key: "activate",
              value: function activate() {
                (0, _initializer.activator)(
                  this.canvas,
                  this.webGL,
                  this.colorFormats,
                  this.programs,
                  this.pointers,
                  this.eventTarget
                );
              },
              /**
               * Deactivate Fluid Canvas
               *  Notifies active fluid canvas to clear buffers and erase fluid from call stack.
               *
               */
            },
            {
              key: "deactivate",
              value: function deactivate() {},
              /**
               * Reset Fluid Simulation
               *  Re-initializes WebGL context and activates simulation based on new context.
               *
               */
            },
            {
              key: "reset",
              value: function reset() {
                (0, _initializer.initWebGL)(this.canvas);
                this.activate();
              },
              /**
               * Map Fluid Behaviors
               *  Uses spread operators to add parameter values only in the places specified.
               *
               * @param params: specific parameter value.
               *
               */
            },
            {
              key: "mapBehaviors",
              value: function mapBehaviors(params) {
                this.PARAMS = _objectSpread({}, this.PARAMS, {}, params);
                (0, _defaults.setBehaviors)(this.PARAMS);
              },
              /**
               * Set Fluid as Background
               *  Pushes canvas back in z space and absolutely positions it.
               *
               * @param shouldSet: true sets it, false un-sets it. Defaults to true.
               *
               */
            },
            {
              key: "setAsBackground",
              value: function setAsBackground() {
                var shouldSet =
                  arguments.length > 0 && arguments[0] !== undefined
                    ? arguments[0]
                    : true;

                /* Pushes back in Z Index */
                this.canvas.style.zIndex = shouldSet ? "-99" : "0";
                /* Position Absolutely */
                this.canvas.style.position = shouldSet
                  ? "absolute"
                  : "relative";
              },
              /**
               * Apply Background
               *  Sets fluid canvas's background and resets view.
               *
               * @param type: Image, Gradient, or Solid. The type of background to be applied.
               * @param value: The value to apply to the image type.
               * @param options: Additional options to configure background (optional)
               *
               * @param canvas
               */
            },
            {
              key: "applyBackground",
              value: function applyBackground(type, value) {
                var options =
                  arguments.length > 2 && arguments[2] !== undefined
                    ? arguments[2]
                    : null;
                var canvas =
                  arguments.length > 3 && arguments[3] !== undefined
                    ? arguments[3]
                    : this.canvas;
                type = type.toLowerCase();
                /* Make transparent */

                this.PARAMS.transparent = true;
                /* Check for Background Type */

                switch (type) {
                  case "gradient":
                    gradient();
                    break;

                  case "image":
                    image();
                    break;

                  case "solid":
                  /* Make Opaque Background and Set Color
                   *  value must be in { r: red, b: blue, g: green } format
                   *
                   *  Best way to change background color:
                   *
                   *  yourFluid.PARAM.BACK_COLOR.R = red;
                   *  yourFluid.PARAM.BACK_COLOR.G = blue;
                   *  yourFluid.PARAM.BACK_COLOR.B = green;
                   *
                   *  or
                   *
                   *  let color = {
                   *       r: red,
                   *       b: blue,
                   *       g: green
                   *   };
                   *
                   *   yourFluid.PARAM.BACK_COLOR = color;
                   * */

                  default:
                    this.PARAMS.transparent = false;
                    this.PARAMS.background_color = value;
                }
                /* Reset WebGL */

                this.reset();
                /** Set to Gradient
                 *  Sets canvas background value to desired gradient.
                 */

                function gradient() {
                  /** Gradient
                   *  Holds the gradient css statement.
                   *
                   * @type {string}
                   */
                  var gradient = "";
                  /* Configure Gradient to Options */

                  switch (options) {
                    case "radial":
                      gradient = "radial-gradient(" + value + ")";
                      break;

                    case "conic":
                      gradient = "conic-gradient(" + value + ")";
                      break;

                    case "repeating-linear":
                      gradient = "repeating-linear-gradient(" + value + ")";
                      break;

                    case "repeating-radial":
                      gradient = "repeating-radial-gradient(" + value + ")";
                      break;

                    case "linear":
                    default:
                      gradient = "linear-gradient(" + value + ")";
                  }
                  /* Set Gradient Dom Style */

                  canvas.style.backgroundImage = gradient;
                }
                /** Set to Image
                 *  Sets canvas background image value to desired image and configure styles.
                 */

                function image() {
                  /* Set background image to desired URL, throw error if invalid URL */
                  canvas.style.backgroundImage = "url('" + value + "')";
                  /* Modify CSS Properties */

                  if (options) {
                    /* Set Repeat */
                    canvas.style.backgroundRepeat = options.repeat
                      ? "repeat"
                      : "no-repeat";
                    /* Set Position */

                    canvas.style.backgroundPosition = options.position
                      ? options.position
                      : "center";
                    /* Set Size */

                    canvas.style.backgroundSize = options.size
                      ? options.size
                      : "contain";
                    /* Set Color */

                    canvas.style.backgroundColor = options.color
                      ? options.color
                      : "none";
                  }
                }
              },
              /**
               * Set Dither URL
               *  Sets the URL to an image to be used for dithering. This method is only responsible for calling
               *  the action in the initializer. The dither will not be applied until the next activation call.
               *
               * @param url: Path to dither in root directory.
               */
            },
            {
              key: "setDitherURL",
              value: function setDitherURL(url) {
                (0, _initializer.setDitherURL)(url);
              },
            },
          ]);

          return Fluid;
        })();
    },

    "./src/initializer.js": function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });
      exports.initWebGL = initWebGL;
      exports.activator = activator;
      exports.setDitherURL = setDitherURL;

      var defaults = _interopRequireWildcard(
        __webpack_require__(/*! ./defaults */ "./src/defaults.js")
      );

      var dither = _interopRequireWildcard(
        __webpack_require__(/*! ../assets/dither.png */ "./assets/dither.png")
      );

      function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
          return obj;
        } else {
          var newObj = {};
          if (obj != null) {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                var desc =
                  Object.defineProperty && Object.getOwnPropertyDescriptor
                    ? Object.getOwnPropertyDescriptor(obj, key)
                    : {};
                if (desc.get || desc.set) {
                  Object.defineProperty(newObj, key, desc);
                } else {
                  newObj[key] = obj[key];
                }
              }
            }
          }
          newObj["default"] = obj;
          return newObj;
        }
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
      }

      var active = false;
      var cancel = false;
      var ditherURL = "./assets/dither.png";
      /**
       * Initiate WebGL Object
       *  Gets WebGL context and compiles shader programs.
       *
       */

      function initWebGL(canvas) {
        /* Add default pointer */
        var pointers = [];
        pointers.push(new Pointer());
        /* Get webGL context */

        var webGL = canvas.getContext("webgl2", defaults.DRAWING_PARAMS);
        var isWebGL2 = !!webGL;
        if (!isWebGL2)
          webGL =
            canvas.getContext("webgl", defaults.DRAWING_PARAMS) ||
            canvas.getContext("experimental-webgl", defaults.DRAWING_PARAMS);
        /* Get color formats */

        var colorFormats = getFormats();
        /* Case support adjustments */

        if (isMobile()) defaults.behavior.render_shaders = false;

        if (!colorFormats.supportLinearFiltering) {
          defaults.behavior.render_shaders = false;
          defaults.behavior.render_bloom = false;
        }
        /* Make our shaders and shader programs */

        var SHADER = {
          baseVertex: compileShader(
            webGL.VERTEX_SHADER,
            defaults.SHADER_SOURCE.vertex
          ),
          clear: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.clear
          ),
          color: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.color
          ),
          background: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.background
          ),
          display: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.display
          ),
          displayBloom: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.displayBloom
          ),
          displayShading: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.displayShading
          ),
          displayBloomShading: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.displayBloomShading
          ),
          bloomPreFilter: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.bloomPreFilter
          ),
          bloomBlur: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.bloomBlur
          ),
          bloomFinal: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.bloomFinal
          ),
          splat: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.splat
          ),
          advectionManualFiltering: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.advectionManualFiltering
          ),
          advection: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.advection
          ),
          divergence: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.divergence
          ),
          curl: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.curl
          ),
          vorticity: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.vorticity
          ),
          pressure: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.pressure
          ),
          gradientSubtract: compileShader(
            webGL.FRAGMENT_SHADER,
            defaults.SHADER_SOURCE.gradientSubtract
          ),
        };
        var programs = formShaderPrograms(colorFormats.supportLinearFiltering);
        /* Worker Classes and Functions */

        /**
         *  Is It Mobile?:
         *  Detects whether or not a device is mobile by checking the user agent string
         *
         * @returns {boolean}
         */

        function isMobile() {
          return /Mobi|Android/i.test(navigator.userAgent);
        }
        /**
         *  Get Formats:
         *  Enable color extensions, linear filtering extensions, and return usable color formats RGBA,
         *  RG (Red-Green), and R (Red).
         *
         * @returns {{formatRGBA: {internalFormat, format}, supportLinearFiltering: OES_texture_half_float_linear,
         * formatR: {internalFormat, format}, halfFloatTexType: *, formatRG: {internalFormat, format}}}
         */

        function getFormats() {
          /* Color Formats */
          var formatRGBA;
          var formatRG;
          var formatR;
          var halfFloat;
          var supportLinearFiltering;
          /* Enables webGL color extensions and get linear filtering extension*/

          if (isWebGL2) {
            webGL.getExtension("EXT_color_buffer_float");
            supportLinearFiltering = webGL.getExtension(
              "OES_texture_float_linear"
            );
          } else {
            halfFloat = webGL.getExtension("OES_texture_half_float");
            supportLinearFiltering = webGL.getExtension(
              "OES_texture_half_float_linear"
            );
          }

          var HALF_FLOAT_TEXTURE_TYPE = isWebGL2
            ? webGL.HALF_FLOAT
            : halfFloat.HALF_FLOAT_OES;
          /* Set color to black for when color buffers are cleared */

          webGL.clearColor(0.0, 0.0, 0.0, 1.0);
          /* Retrieve color formats */

          if (isWebGL2) {
            formatRGBA = getSupportedFormat(
              webGL.RGBA16F,
              webGL.RGBA,
              HALF_FLOAT_TEXTURE_TYPE
            );
            formatRG = getSupportedFormat(
              webGL.RG16F,
              webGL.RG,
              HALF_FLOAT_TEXTURE_TYPE
            );
            formatR = getSupportedFormat(
              webGL.R16F,
              webGL.RED,
              HALF_FLOAT_TEXTURE_TYPE
            );
          } else {
            formatRGBA = getSupportedFormat(
              webGL.RGBA,
              webGL.RGBA,
              HALF_FLOAT_TEXTURE_TYPE
            );
            formatRG = getSupportedFormat(
              webGL.RGBA,
              webGL.RGBA,
              HALF_FLOAT_TEXTURE_TYPE
            );
            formatR = getSupportedFormat(
              webGL.RGBA,
              webGL.RGBA,
              HALF_FLOAT_TEXTURE_TYPE
            );
          }
          /** Get Supported Format
           *  Using the specified internal format, we retrieve and return the desired color format to be
           *  rendered with
           *
           * @param internalFormat: A GLenum that specifies the color components within the texture
           * @param format: Another GLenum that specifies the format of the texel data.
           * @returns {{internalFormat: *, format: *}|null|({internalFormat, format}|null)}
           */

          function getSupportedFormat(internalFormat, format, type) {
            var isSupportRenderTextureFormat;
            var texture = webGL.createTexture();
            /* Set texture parameters */

            webGL.bindTexture(webGL.TEXTURE_2D, texture);
            webGL.texParameteri(
              webGL.TEXTURE_2D,
              webGL.TEXTURE_MIN_FILTER,
              webGL.NEAREST
            );
            webGL.texParameteri(
              webGL.TEXTURE_2D,
              webGL.TEXTURE_MAG_FILTER,
              webGL.NEAREST
            );
            webGL.texParameteri(
              webGL.TEXTURE_2D,
              webGL.TEXTURE_WRAP_S,
              webGL.CLAMP_TO_EDGE
            );
            webGL.texParameteri(
              webGL.TEXTURE_2D,
              webGL.TEXTURE_WRAP_T,
              webGL.CLAMP_TO_EDGE
            );
            /* Specify a 2D texture image */

            webGL.texImage2D(
              webGL.TEXTURE_2D,
              0,
              internalFormat,
              4,
              4,
              0,
              format,
              type,
              null
            );
            /* Attach texture to frame buffer */

            var fbo = webGL.createFramebuffer();
            webGL.bindFramebuffer(webGL.FRAMEBUFFER, fbo);
            webGL.framebufferTexture2D(
              webGL.FRAMEBUFFER,
              webGL.COLOR_ATTACHMENT0,
              webGL.TEXTURE_2D,
              texture,
              0
            );
            /* Check if current format is supported */

            var status = webGL.checkFramebufferStatus(webGL.FRAMEBUFFER);
            isSupportRenderTextureFormat =
              status === webGL.FRAMEBUFFER_COMPLETE;
            /* If not supported use fallback format, until we have no fallback */

            if (!isSupportRenderTextureFormat) {
              switch (internalFormat) {
                case webGL.R16F:
                  return getSupportedFormat(webGL.RG16F, webGL.RG, type);

                case webGL.RG16F:
                  return getSupportedFormat(webGL.RGBA16F, webGL.RGBA, type);

                default:
                  return null;
              }
            }

            return {
              internalFormat: internalFormat,
              format: format,
            };
          }

          return {
            formatRGBA: formatRGBA,
            formatRG: formatRG,
            formatR: formatR,
            halfFloatTexType: HALF_FLOAT_TEXTURE_TYPE,
            supportLinearFiltering: supportLinearFiltering,
          };
        }
        /**
         *  Compile Shader:
         *  Makes a new webGL shader of type `type` using the provided GLSL source. The `type` is either of
         *  `VERTEX_SHADER` or `FRAGMENT_SHADER`
         *
         * @param type: Passed to `createShader` to define the shader type
         * @param source: A GLSL source script, used to define the shader properties
         * @returns {WebGLShader}: A webGL shader of the parameterized type and source
         */

        function compileShader(type, source) {
          /* Create shader, link the source, and compile the GLSL*/
          var shader = webGL.createShader(type);
          webGL.shaderSource(shader, source);
          webGL.compileShader(shader);
          /* TODO: Finish error checking */

          if (!webGL.getShaderParameter(shader, webGL.COMPILE_STATUS))
            throw webGL.getShaderInfoLog(shader);
          return shader;
        }
        /**
         *  Form Shader Programs:
         *  Assembles shaders into a webGl program we can use to write to our context
         *
         * @param supportLinearFiltering: A bool letting us know if we support linear filtering
         * @returns {{displayBloomProgram: GLProgram, vorticityProgram: GLProgram, displayShadingProgram: GLProgram,
         * displayBloomShadingProgram: GLProgram, gradientSubtractProgram: GLProgram, advectionProgram: GLProgram,
         * bloomBlurProgram: GLProgram, colorProgram: GLProgram, divergenceProgram: GLProgram, clearProgram: GLProgram,
         * splatProgram: GLProgram, displayProgram: GLProgram, bloomPreFilterProgram: GLProgram, curlProgram: GLProgram,
         * bloomFinalProgram: GLProgram, pressureProgram: GLProgram, backgroundProgram: GLProgram}}: Programs used to
         * render shaders
         *
         */

        function formShaderPrograms(supportLinearFiltering) {
          return {
            clearProgram: new GLProgram(SHADER.baseVertex, SHADER.clear, webGL),
            colorProgram: new GLProgram(SHADER.baseVertex, SHADER.color, webGL),
            backgroundProgram: new GLProgram(
              SHADER.baseVertex,
              SHADER.background,
              webGL
            ),
            displayProgram: new GLProgram(
              SHADER.baseVertex,
              SHADER.display,
              webGL
            ),
            displayBloomProgram: new GLProgram(
              SHADER.baseVertex,
              SHADER.displayBloom,
              webGL
            ),
            displayShadingProgram: new GLProgram(
              SHADER.baseVertex,
              SHADER.displayShading,
              webGL
            ),
            displayBloomShadingProgram: new GLProgram(
              SHADER.baseVertex,
              SHADER.displayBloomShading,
              webGL
            ),
            bloomPreFilterProgram: new GLProgram(
              SHADER.baseVertex,
              SHADER.bloomPreFilter,
              webGL
            ),
            bloomBlurProgram: new GLProgram(
              SHADER.baseVertex,
              SHADER.bloomBlur,
              webGL
            ),
            bloomFinalProgram: new GLProgram(
              SHADER.baseVertex,
              SHADER.bloomFinal,
              webGL
            ),
            splatProgram: new GLProgram(SHADER.baseVertex, SHADER.splat, webGL),
            advectionProgram: new GLProgram(
              SHADER.baseVertex,
              supportLinearFiltering
                ? SHADER.advection
                : SHADER.advectionManualFiltering,
              webGL
            ),
            divergenceProgram: new GLProgram(
              SHADER.baseVertex,
              SHADER.divergence,
              webGL
            ),
            curlProgram: new GLProgram(SHADER.baseVertex, SHADER.curl, webGL),
            vorticityProgram: new GLProgram(
              SHADER.baseVertex,
              SHADER.vorticity,
              webGL
            ),
            pressureProgram: new GLProgram(
              SHADER.baseVertex,
              SHADER.pressure,
              webGL
            ),
            gradientSubtractProgram: new GLProgram(
              SHADER.baseVertex,
              SHADER.gradientSubtract,
              webGL
            ),
          };
        }

        return {
          programs: programs,
          webGL: webGL,
          colorFormats: colorFormats,
          pointers: pointers,
        };
      }

      function activator(
        canvas,
        webGL,
        colorFormat,
        PROGRAMS,
        pointers,
        eventTarget
      ) {
        if (active) {
          var nPointers = [];
          nPointers.push(new Pointer());
          pointers = nPointers;
        }

        active = true;
        /* TODO: Retrieve haul style */

        var PARAMS = defaults.behavior;
        var bloomFrameBuffers = [];
        var splatStack = [];
        var simWidth;
        var simHeight;
        var dyeWidth;
        var dyeHeight;
        var density;
        var velocity;
        var divergence;
        var curl;
        var pressure;
        var bloom;

        var blit = (function () {
          webGL.bindBuffer(webGL.ARRAY_BUFFER, webGL.createBuffer());
          webGL.bufferData(
            webGL.ARRAY_BUFFER,
            new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
            webGL.STATIC_DRAW
          );
          webGL.bindBuffer(webGL.ELEMENT_ARRAY_BUFFER, webGL.createBuffer());
          webGL.bufferData(
            webGL.ELEMENT_ARRAY_BUFFER,
            new Uint16Array([0, 1, 2, 0, 2, 3]),
            webGL.STATIC_DRAW
          );
          webGL.vertexAttribPointer(0, 2, webGL.FLOAT, false, 0, 0);
          webGL.enableVertexAttribArray(0);
          return function (destination) {
            webGL.bindFramebuffer(webGL.FRAMEBUFFER, destination);
            webGL.drawElements(webGL.TRIANGLES, 6, webGL.UNSIGNED_SHORT, 0);
          };
        })();
        /** Dithering Texture
         *  Initialize fluid overlay/dither
         *
         * @type {{texture: WebGLTexture, width: number, attach(*): *, height: number}}
         */

        var ditheringTexture = PARAMS.embedded_dither
          ? createTextureAsync(dither["default"])
          : createTextureAsync(ditherURL);

        /* Initialize Fluid */
        init();

        // NOTE: Initial splat
        // multipleSplats(parseInt(Math.random() * 20) + 5);
        /* Game Loop */

        var lastColorChangeTime = Date.now();
        update();
        /* Game Loop */

        /**
         * Initialize Fluid
         *  Prepares frame buffers for rendering
         *
         */

        function init() {
          /* Color Formats */
          var texType = colorFormat.halfFloatTexType;
          var rgba = colorFormat.formatRGBA;
          var rg = colorFormat.formatRG;
          var r = colorFormat.formatR;
          var filtering = colorFormat.supportLinearFiltering
            ? webGL.LINEAR
            : webGL.NEAREST;
          /* Set simulation and pointer width and height */

          var simRes = getResolution(PARAMS.sim_resolution);
          var dyeRes = getResolution(PARAMS.dye_resolution);
          var bloomRes = getResolution(PARAMS.bloom_resolution);
          simWidth = simRes.width;
          simHeight = simRes.height;
          dyeWidth = dyeRes.width;
          dyeHeight = dyeRes.height;
          /* Density, Velocity, and Bloom Double Frame Buffers */

          density = !density
            ? createDoubleFBO(
                dyeWidth,
                dyeHeight,
                rgba.internalFormat,
                rgba.format,
                texType,
                filtering
              )
            : resizeDoubleFBO(
                density,
                dyeWidth,
                dyeHeight,
                rgba.internalFormat,
                rgba.format,
                texType,
                filtering
              );
          velocity = !velocity
            ? createDoubleFBO(
                simWidth,
                simHeight,
                rg.internalFormat,
                rg.format,
                texType,
                filtering
              )
            : resizeDoubleFBO(
                velocity,
                simWidth,
                simHeight,
                rg.internalFormat,
                rg.format,
                texType,
                filtering
              );
          bloom = createFBO(
            bloomRes.width,
            bloomRes.height,
            rgba.internalFormat,
            rgba.format,
            texType,
            filtering
          );
          /* Divergence, Curl, and Pressure Frame Buffers */

          divergence = createFBO(
            simWidth,
            simHeight,
            r.internalFormat,
            r.format,
            texType,
            webGL.NEAREST
          );
          curl = createFBO(
            simWidth,
            simHeight,
            r.internalFormat,
            r.format,
            texType,
            webGL.NEAREST
          );
          pressure = createDoubleFBO(
            simWidth,
            simHeight,
            r.internalFormat,
            r.format,
            texType,
            webGL.NEAREST
          );
          /* Populate bloom's frame buffer stack by iterating through bloom iterations
           *  Each iteration, we offset the scale linearly at a constant rate*/

          bloomFrameBuffers.length = 0;

          for (var i = 0; i < PARAMS.bloom_iterations; i++) {
            /* Offset scale by a factor of 1 plus our current iteration*/
            var width = bloomRes.width >> (i + 1);
            var height = bloomRes.height >> (i + 1);
            /* Don't create frame buffer */

            if (width < 2 || height < 2) break;
            /* Create Frame Buffer for Bloom iterations */

            var fbo = createFBO(
              width,
              height,
              rgba.internalFormat,
              rgba.format,
              texType,
              filtering
            );
            bloomFrameBuffers.push(fbo);
          }
        }
        /**
         * Create Double Frame Buffer Object
         *  Creates an object with 2 frame buffers, one for reads and one for writes
         *
         * @param w: Width
         * @param h: Height
         * @param internalFormat: Internal color formats
         * @param format: Color format
         * @param type: Texture type
         * @param param: Extra parameters
         */

        function createDoubleFBO(w, h, internalFormat, format, type, param) {
          /* Create frame buffer objects */
          var fbo1 = createFBO(w, h, internalFormat, format, type, param);
          var fbo2 = createFBO(w, h, internalFormat, format, type, param);

          return {
            /* Get and set Buffer Data */
            get read() {
              return fbo1;
            },

            set read(value) {
              fbo1 = value;
            },

            get write() {
              return fbo2;
            },

            set write(value) {
              fbo2 = value;
            },

            /* Swap data between buffers */
            swap: function swap() {
              var temp = fbo1;
              fbo1 = fbo2;
              fbo2 = temp;
            },
          };
        }

        function createFBO(w, h, internalFormat, format, type, param) {
          webGL.activeTexture(webGL.TEXTURE0);
          var texture = webGL.createTexture();
          webGL.bindTexture(webGL.TEXTURE_2D, texture);
          webGL.texParameteri(
            webGL.TEXTURE_2D,
            webGL.TEXTURE_MIN_FILTER,
            param
          );
          webGL.texParameteri(
            webGL.TEXTURE_2D,
            webGL.TEXTURE_MAG_FILTER,
            param
          );
          webGL.texParameteri(
            webGL.TEXTURE_2D,
            webGL.TEXTURE_WRAP_S,
            webGL.CLAMP_TO_EDGE
          );
          webGL.texParameteri(
            webGL.TEXTURE_2D,
            webGL.TEXTURE_WRAP_T,
            webGL.CLAMP_TO_EDGE
          );
          webGL.texImage2D(
            webGL.TEXTURE_2D,
            0,
            internalFormat,
            w,
            h,
            0,
            format,
            type,
            null
          );
          var fbo = webGL.createFramebuffer();
          webGL.bindFramebuffer(webGL.FRAMEBUFFER, fbo);
          webGL.framebufferTexture2D(
            webGL.FRAMEBUFFER,
            webGL.COLOR_ATTACHMENT0,
            webGL.TEXTURE_2D,
            texture,
            0
          );
          webGL.viewport(0, 0, w, h);
          webGL.clear(webGL.COLOR_BUFFER_BIT);
          return {
            texture: texture,
            fbo: fbo,
            width: w,
            height: h,
            attach: function attach(id) {
              webGL.activeTexture(webGL.TEXTURE0 + id);
              webGL.bindTexture(webGL.TEXTURE_2D, texture);
              return id;
            },
          };
        }

        function resizeDoubleFBO(
          target,
          w,
          h,
          internalFormat,
          format,
          type,
          param
        ) {
          target.read = resizeFBO(
            target.read,
            w,
            h,
            internalFormat,
            format,
            type,
            param
          );
          target.write = createFBO(w, h, internalFormat, format, type, param);
          return target;
        }

        function resizeFBO(target, w, h, internalFormat, format, type, param) {
          var newFBO = createFBO(w, h, internalFormat, format, type, param);
          PROGRAMS.clearProgram.bind();
          webGL.uniform1i(
            PROGRAMS.clearProgram.uniforms.uTexture,
            target.attach(0)
          );
          webGL.uniform1f(PROGRAMS.clearProgram.uniforms.value, 1);
          blit(newFBO.fbo);
          return newFBO;
        }

        function createTextureAsync(url) {
          var texture = webGL.createTexture();
          webGL.bindTexture(webGL.TEXTURE_2D, texture);
          webGL.texParameteri(
            webGL.TEXTURE_2D,
            webGL.TEXTURE_MIN_FILTER,
            webGL.LINEAR
          );
          webGL.texParameteri(
            webGL.TEXTURE_2D,
            webGL.TEXTURE_MAG_FILTER,
            webGL.LINEAR
          );
          webGL.texParameteri(
            webGL.TEXTURE_2D,
            webGL.TEXTURE_WRAP_S,
            webGL.REPEAT
          );
          webGL.texParameteri(
            webGL.TEXTURE_2D,
            webGL.TEXTURE_WRAP_T,
            webGL.REPEAT
          );
          webGL.texImage2D(
            webGL.TEXTURE_2D,
            0,
            webGL.RGB,
            1,
            1,
            0,
            webGL.RGB,
            webGL.UNSIGNED_BYTE,
            new Uint8Array([255, 255, 255])
          );
          var obj = {
            texture: texture,
            width: 1,
            height: 1,
            attach: function attach(id) {
              webGL.activeTexture(webGL.TEXTURE0 + id);
              webGL.bindTexture(webGL.TEXTURE_2D, texture);
              return id;
            },
          };
          var image = new Image();
          image.src = url;

          image.onload = function () {
            obj.width = image.width;
            obj.height = image.height;
            webGL.bindTexture(webGL.TEXTURE_2D, texture);
            webGL.texImage2D(
              webGL.TEXTURE_2D,
              0,
              webGL.RGB,
              webGL.RGB,
              webGL.UNSIGNED_BYTE,
              image
            );
          };

          return obj;
        }

        function update() {
          resizeCanvas();
          input();
          if (!PARAMS.paused) step(0.016);
          render(null);
          var callback = requestAnimationFrame(update); // /* Destroys if Deactivated */
          // if (cancelled.is) {
          //     webGL.clear(webGL.COLOR_BUFFER_BIT);
          //     cancelAnimationFrame(callback);
          // }
        }

        function input() {
          if (splatStack.length > 0) multipleSplats(splatStack.pop());

          for (var i = 0; i < pointers.length; i++) {
            var p = pointers[i];

            if (p.moved) {
              splat(p.x, p.y, p.dx, p.dy, p.color);
              if (i !== 1) p.moved = false;
            }
          }

          if (!PARAMS.multi_color) return;

          if (lastColorChangeTime + 100 < Date.now()) {
            lastColorChangeTime = Date.now();

            for (var _i = 0; _i < pointers.length; _i++) {
              var _p = pointers[_i];
              _p.color = generateColor();
            }
          }
        }

        function step(dt) {
          webGL.disable(webGL.BLEND);
          webGL.viewport(0, 0, simWidth, simHeight);
          PROGRAMS.curlProgram.bind();
          webGL.uniform2f(
            PROGRAMS.curlProgram.uniforms.texelSize,
            1.0 / simWidth,
            1.0 / simHeight
          );
          webGL.uniform1i(
            PROGRAMS.curlProgram.uniforms.uVelocity,
            velocity.read.attach(0)
          );
          blit(curl.fbo);
          PROGRAMS.vorticityProgram.bind();
          webGL.uniform2f(
            PROGRAMS.vorticityProgram.uniforms.texelSize,
            1.0 / simWidth,
            1.0 / simHeight
          );
          webGL.uniform1i(
            PROGRAMS.vorticityProgram.uniforms.uVelocity,
            velocity.read.attach(0)
          );
          webGL.uniform1i(
            PROGRAMS.vorticityProgram.uniforms.uCurl,
            curl.attach(1)
          );
          webGL.uniform1f(PROGRAMS.vorticityProgram.uniforms.curl, PARAMS.curl);
          webGL.uniform1f(PROGRAMS.vorticityProgram.uniforms.dt, dt);
          blit(velocity.write.fbo);
          velocity.swap();
          PROGRAMS.divergenceProgram.bind();
          webGL.uniform2f(
            PROGRAMS.divergenceProgram.uniforms.texelSize,
            1.0 / simWidth,
            1.0 / simHeight
          );
          webGL.uniform1i(
            PROGRAMS.divergenceProgram.uniforms.uVelocity,
            velocity.read.attach(0)
          );
          blit(divergence.fbo);
          PROGRAMS.clearProgram.bind();
          webGL.uniform1i(
            PROGRAMS.clearProgram.uniforms.uTexture,
            pressure.read.attach(0)
          );
          webGL.uniform1f(
            PROGRAMS.clearProgram.uniforms.value,
            PARAMS.pressure
          );
          blit(pressure.write.fbo);
          pressure.swap();
          PROGRAMS.pressureProgram.bind();
          webGL.uniform2f(
            PROGRAMS.pressureProgram.uniforms.texelSize,
            1.0 / simWidth,
            1.0 / simHeight
          );
          webGL.uniform1i(
            PROGRAMS.pressureProgram.uniforms.uDivergence,
            divergence.attach(0)
          );

          for (var i = 0; i < PARAMS.pressure_iteration; i++) {
            webGL.uniform1i(
              PROGRAMS.pressureProgram.uniforms.uPressure,
              pressure.read.attach(1)
            );
            blit(pressure.write.fbo);
            pressure.swap();
          }

          PROGRAMS.gradientSubtractProgram.bind();
          webGL.uniform2f(
            PROGRAMS.gradientSubtractProgram.uniforms.texelSize,
            1.0 / simWidth,
            1.0 / simHeight
          );
          webGL.uniform1i(
            PROGRAMS.gradientSubtractProgram.uniforms.uPressure,
            pressure.read.attach(0)
          );
          webGL.uniform1i(
            PROGRAMS.gradientSubtractProgram.uniforms.uVelocity,
            velocity.read.attach(1)
          );
          blit(velocity.write.fbo);
          velocity.swap();
          PROGRAMS.advectionProgram.bind();
          webGL.uniform2f(
            PROGRAMS.advectionProgram.uniforms.texelSize,
            1.0 / simWidth,
            1.0 / simHeight
          );
          if (!colorFormat.supportLinearFiltering)
            webGL.uniform2f(
              PROGRAMS.advectionProgram.uniforms.dyeTexelSize,
              1.0 / simWidth,
              1.0 / simHeight
            );
          var velocityId = velocity.read.attach(0);
          webGL.uniform1i(
            PROGRAMS.advectionProgram.uniforms.uVelocity,
            velocityId
          );
          webGL.uniform1i(
            PROGRAMS.advectionProgram.uniforms.uSource,
            velocityId
          );
          webGL.uniform1f(PROGRAMS.advectionProgram.uniforms.dt, dt);
          webGL.uniform1f(
            PROGRAMS.advectionProgram.uniforms.dissipation,
            PARAMS.velocity
          );
          blit(velocity.write.fbo);
          velocity.swap();
          webGL.viewport(0, 0, dyeWidth, dyeHeight);
          if (!colorFormat.supportLinearFiltering)
            webGL.uniform2f(
              PROGRAMS.advectionProgram.uniforms.dyeTexelSize,
              1.0 / dyeWidth,
              1.0 / dyeHeight
            );
          webGL.uniform1i(
            PROGRAMS.advectionProgram.uniforms.uVelocity,
            velocity.read.attach(0)
          );
          webGL.uniform1i(
            PROGRAMS.advectionProgram.uniforms.uSource,
            density.read.attach(1)
          );
          webGL.uniform1f(
            PROGRAMS.advectionProgram.uniforms.dissipation,
            PARAMS.dissipation
          );
          blit(density.write.fbo);
          density.swap();
        }

        function render(target) {
          if (PARAMS.render_bloom) applyBloom(density.read, bloom);

          if (target == null || !PARAMS.transparent) {
            webGL.blendFunc(webGL.ONE, webGL.ONE_MINUS_SRC_ALPHA);
            webGL.enable(webGL.BLEND);
          } else {
            webGL.disable(webGL.BLEND);
          }

          var width = target == null ? webGL.drawingBufferWidth : dyeWidth;
          var height = target == null ? webGL.drawingBufferHeight : dyeHeight;
          webGL.viewport(0, 0, width, height);

          if (!PARAMS.transparent) {
            PROGRAMS.colorProgram.bind();
            var bc = PARAMS.background_color;
            webGL.uniform4f(
              PROGRAMS.colorProgram.uniforms.color,
              bc.r / 255,
              bc.g / 255,
              bc.b / 255,
              1
            );
            blit(target);
          }

          if (target == null && PARAMS.transparent) {
            PROGRAMS.backgroundProgram.bind();
            webGL.uniform1f(
              PROGRAMS.backgroundProgram.uniforms.aspectRatio,
              canvas.width / canvas.height
            );
            blit(null);
          }

          if (PARAMS.render_shaders) {
            var program = PARAMS.render_bloom
              ? PROGRAMS.displayBloomShadingProgram
              : PROGRAMS.displayShadingProgram;
            program.bind();
            webGL.uniform2f(
              program.uniforms.texelSize,
              1.0 / width,
              1.0 / height
            );
            webGL.uniform1i(program.uniforms.uTexture, density.read.attach(0));

            if (PARAMS.render_bloom) {
              webGL.uniform1i(program.uniforms.uBloom, bloom.attach(1));
              webGL.uniform1i(
                program.uniforms.uDithering,
                ditheringTexture.attach(2)
              );
              var scale = getTextureScale(ditheringTexture, width, height);
              webGL.uniform2f(program.uniforms.ditherScale, scale.x, scale.y);
            }
          } else {
            var _program = PARAMS.render_bloom
              ? PROGRAMS.displayBloomProgram
              : PROGRAMS.displayProgram;

            _program.bind();

            webGL.uniform1i(_program.uniforms.uTexture, density.read.attach(0));

            if (PARAMS.render_bloom) {
              webGL.uniform1i(_program.uniforms.uBloom, bloom.attach(1));
              webGL.uniform1i(
                _program.uniforms.uDithering,
                ditheringTexture.attach(2)
              );

              var _scale = getTextureScale(ditheringTexture, width, height);

              webGL.uniform2f(
                _program.uniforms.ditherScale,
                _scale.x,
                _scale.y
              );
            }
          }

          blit(target);
        }

        function applyBloom(source, destination) {
          if (bloomFrameBuffers.length < 2) return;
          var last = destination;
          webGL.disable(webGL.BLEND);
          PROGRAMS.bloomPreFilterProgram.bind();
          var knee = PARAMS.threshold * PARAMS.soft_knee + 0.0001;
          var curve0 = PARAMS.threshold - knee;
          var curve1 = knee * 2;
          var curve2 = 0.25 / knee;
          webGL.uniform3f(
            PROGRAMS.bloomPreFilterProgram.uniforms.curve,
            curve0,
            curve1,
            curve2
          );
          webGL.uniform1f(
            PROGRAMS.bloomPreFilterProgram.uniforms.threshold,
            PARAMS.threshold
          );
          webGL.uniform1i(
            PROGRAMS.bloomPreFilterProgram.uniforms.uTexture,
            source.attach(0)
          );
          webGL.viewport(0, 0, last.width, last.height);
          blit(last.fbo);
          PROGRAMS.bloomBlurProgram.bind();

          for (var i = 0; i < bloomFrameBuffers.length; i++) {
            var dest = bloomFrameBuffers[i];
            webGL.uniform2f(
              PROGRAMS.bloomBlurProgram.uniforms.texelSize,
              1.0 / last.width,
              1.0 / last.height
            );
            webGL.uniform1i(
              PROGRAMS.bloomBlurProgram.uniforms.uTexture,
              last.attach(0)
            );
            webGL.viewport(0, 0, dest.width, dest.height);
            blit(dest.fbo);
            last = dest;
          }

          webGL.blendFunc(webGL.ONE, webGL.ONE);
          webGL.enable(webGL.BLEND);

          for (var _i2 = bloomFrameBuffers.length - 2; _i2 >= 0; _i2--) {
            var baseTex = bloomFrameBuffers[_i2];
            webGL.uniform2f(
              PROGRAMS.bloomBlurProgram.uniforms.texelSize,
              1.0 / last.width,
              1.0 / last.height
            );
            webGL.uniform1i(
              PROGRAMS.bloomBlurProgram.uniforms.uTexture,
              last.attach(0)
            );
            webGL.viewport(0, 0, baseTex.width, baseTex.height);
            blit(baseTex.fbo);
            last = baseTex;
          }

          webGL.disable(webGL.BLEND);
          PROGRAMS.bloomFinalProgram.bind();
          webGL.uniform2f(
            PROGRAMS.bloomFinalProgram.uniforms.texelSize,
            1.0 / last.width,
            1.0 / last.height
          );
          webGL.uniform1i(
            PROGRAMS.bloomFinalProgram.uniforms.uTexture,
            last.attach(0)
          );
          webGL.uniform1f(
            PROGRAMS.bloomFinalProgram.uniforms.intensity,
            PARAMS.intensity
          );
          webGL.viewport(0, 0, destination.width, destination.height);
          blit(destination.fbo);
        }

        function splat(x, y, dx, dy, color) {
          webGL.viewport(0, 0, simWidth, simHeight);
          PROGRAMS.splatProgram.bind();
          webGL.uniform1i(
            PROGRAMS.splatProgram.uniforms.uTarget,
            velocity.read.attach(0)
          );
          webGL.uniform1f(
            PROGRAMS.splatProgram.uniforms.aspectRatio,
            canvas.width / canvas.height
          );
          webGL.uniform2f(
            PROGRAMS.splatProgram.uniforms.point,
            x / canvas.width,
            1.0 - y / canvas.height
          );
          webGL.uniform3f(PROGRAMS.splatProgram.uniforms.color, dx, -dy, 1.0);
          webGL.uniform1f(
            PROGRAMS.splatProgram.uniforms.radius,
            PARAMS.emitter_size / 100.0
          );
          blit(velocity.write.fbo);
          velocity.swap();
          webGL.viewport(0, 0, dyeWidth, dyeHeight);
          webGL.uniform1i(
            PROGRAMS.splatProgram.uniforms.uTarget,
            density.read.attach(0)
          );
          webGL.uniform3f(
            PROGRAMS.splatProgram.uniforms.color,
            color.r,
            color.g,
            color.b
          );
          blit(density.write.fbo);
          density.swap();
        }

        function multipleSplats(amount) {
          var color = {
            r: 255,
            b: 0,
            g: 0,
          };
          splat(500, 500, 100, 0, color);
        }

        function resizeCanvas() {
          if (
            canvas.width != canvas.clientWidth ||
            canvas.height != canvas.clientHeight
          ) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            init();
          }
        }

        function generateColor() {
          // if (Math.random() > 0.5) {
          //   return window.mana_fluid
          //     ? window.mana_fluid.color_1_hue
          //     : { r: 0, g: 255, b: 255 }; // cyan
          // } else {
          //   return window.mana_fluid
          //     ? window.mana_fluid.color_2_hue
          //     : { r: 255, g: 0, b: 255 }; // purple
          // }

          // var c =
          //   Math.random() > 0.5
          //     ? { r: 100, g: 0, b: 100 }
          //     : { r: 0, g: 100, b: 100 };

          var hue_1 =
            window.mana_fluid && "color_1_hue" in window.mana_fluid
              ? window.mana_fluid.color_1_hue
              : 0.85; // cyan
          var hue_2 =
            window.mana_fluid && "color_2_hue" in window.mana_fluid
              ? window.mana_fluid.color_2_hue
              : 0.51; // purple
          var hue = Math.random() > 0.5 ? hue_1 : hue_2;

          var c = HSVtoRGB(hue, 1.0, 1.0);
          // var c = HSVtoRGB(Math.random(), 1.0, 1.0);
          c.r *= 0.15;
          c.g *= 0.15;
          c.b *= 0.15;
          return c;
        }

        function HSVtoRGB(h, s, v) {
          var r, g, b, i, f, p, q, t;
          i = Math.floor(h * 6);
          f = h * 6 - i;
          p = v * (1 - s);
          q = v * (1 - f * s);
          t = v * (1 - (1 - f) * s);

          switch (i % 6) {
            case 0:
              (r = v), (g = t), (b = p);
              break;

            case 1:
              (r = q), (g = v), (b = p);
              break;

            case 2:
              (r = p), (g = v), (b = t);
              break;

            case 3:
              (r = p), (g = q), (b = v);
              break;

            case 4:
              (r = t), (g = p), (b = v);
              break;

            case 5:
              (r = v), (g = p), (b = q);
              break;
          }

          return {
            r: r,
            g: g,
            b: b,
          };
        }

        function getResolution(resolution) {
          var aspectRatio =
            webGL.drawingBufferWidth / webGL.drawingBufferHeight;
          if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
          var max = Math.round(resolution * aspectRatio);
          var min = Math.round(resolution);
          if (webGL.drawingBufferWidth > webGL.drawingBufferHeight)
            return {
              width: max,
              height: min,
            };
          else
            return {
              width: min,
              height: max,
            };
        }

        function getTextureScale(texture, width, height) {
          return {
            x: width / texture.width,
            y: height / texture.height,
          };
        }

        // When mouse is in move at that time if initialization, it may not complete
        // setTimeout(99) helps with that. (20ms does not work)
        setTimeout(function () {
          eventTarget = eventTarget || canvas;

          function onPointerMove(e) {
            var o = isTouchDevice ? e.touches[0] : e;
            var offsetX = o.clientX;
            var offsetY = o.clientY;

            if (
              isTouchDevice ||
              pointers[0].down ||
              offsetX < 0.1 * window.innerWidth ||
              offsetX > 0.9 * window.innerWidth ||
              offsetY < 0.1 * window.innerHeight ||
              offsetY > 0.9 * window.innerHeight
            ) {
              pointers[0].moved = true;
            }

            pointers[0].dx = (offsetX - pointers[0].x) * 5.0;
            pointers[0].dy = (offsetY - pointers[0].y) * 5.0;
            pointers[0].x = offsetX;
            pointers[0].y = offsetY;
          }
          eventTarget.addEventListener(
            isTouchDevice ? "touchmove" : "mousemove",
            onPointerMove
          );

          function onPointerDown() {
            pointers[0].down = true;
            pointers[0].color = generateColor();
          }
          eventTarget.addEventListener(
            isTouchDevice ? "touchstart" : "mousedown",
            onPointerDown
          );

          function onPointerUp() {
            pointers[0].down = false;
          }
          eventTarget.addEventListener(
            isTouchDevice ? "touchend" : "mouseup",
            onPointerUp
          );

          /*
          eventTarget.addEventListener("keydown", function (e) {
            if (e.code === "KeyP") PARAMS.paused = !PARAMS.paused;
            if (e.key === " ")
              splatStack.push(parseInt(Math.random() * 20) + 5);
          });
          */
        }, 333);
      }

      function setDitherURL(url) {
        ditherURL = url;
      }

      var GLProgram =
        /*#__PURE__*/
        (function () {
          function GLProgram(vertexShader, fragmentShader, webGL) {
            _classCallCheck(this, GLProgram);

            this.uniforms = {};
            this.webGL = webGL;
            this.program = webGL.createProgram();
            webGL.attachShader(this.program, vertexShader);
            webGL.attachShader(this.program, fragmentShader);
            webGL.linkProgram(this.program);
            if (!webGL.getProgramParameter(this.program, webGL.LINK_STATUS))
              throw webGL.getProgramInfoLog(this.program);
            var uniformCount = webGL.getProgramParameter(
              this.program,
              webGL.ACTIVE_UNIFORMS
            );

            for (var i = 0; i < uniformCount; i++) {
              var uniformName = webGL.getActiveUniform(this.program, i).name;
              this.uniforms[uniformName] = webGL.getUniformLocation(
                this.program,
                uniformName
              );
            }
          }

          _createClass(GLProgram, [
            {
              key: "bind",
              value: function bind() {
                this.webGL.useProgram(this.program);
              },
            },
          ]);

          return GLProgram;
        })();

      var Pointer = function Pointer() {
        _classCallCheck(this, Pointer);

        /** Identifier for the pointer object
         *
         *  @type {number} valid IDs are always either zero or a positive integer (-1 is invalid and should
         *  be managed upon creation of a new pointer object.)
         */
        this.id = -1;
        /** Horizontal (x) and vertical (y) position of the pointer
         *
         *  @type {number}
         */

        this.x = 0;
        this.y = 0;
        /** Velocity data describing the positional change in the horizontal (x) and vertical (y) axis of
         *  this pointer
         *
         * @type {number}
         */

        this.dx = 0;
        this.dy = 0;
        /** Boolean data member used to store whether or not the pointer is in a clicked state and/or a
         *  moving state
         *
         *  @type {boolean}
         */

        this.down = false;
        this.moved = false;
        /** The color the pointer will render as
         *
         * @type {number[]}
         */

        this.color = [30, 0, 300];
      };
    },
  });
});

(function () {
  var canvas = document.createElement("canvas");
  var style = canvas.style;
  // style.zIndex = "-1"; // No, we want the canvas to be above the container background
  style.position = "fixed";
  style.top = "0";
  style.left = "0";
  style.width = "100lvw";
  style.height = "100lvh";

  var container = window.mana_fluid?.container || document.body;
  container.insertBefore(canvas, container.firstChild);

  var fluid = new Fluid(canvas, container); // window

  fluid.PARAMS.transparent = true;
  // fluid.PARAMS.background_color = window.mana_fluid
  //   ? window.mana_fluid.background_color
  //   : { r: 0, g: 0, b: 0 };
  // fluid.PARAMS.fluid_color = [];

  /* Fluid Dissipation Behaviors*/
  fluid.PARAMS.dissipation = isSmallScreen ? 0.99 : 0.97; // 0.97 // "mushroomness"
  // fluid.PARAMS.velocity = isSmallScreen ? 0.98 : 0.99; // 0.98
  // fluid.PARAMS.pressure = 0.99; // 0.80 // counter-movement
  // fluid.PARAMS.pressure_iteration = 10; // 20

  // fluid.PARAMS.curl = isSmallScreen ? 0 : 0.5; // 0
  fluid.PARAMS.emitter_size = isSmallScreen ? 0.5 : 0.25; // 0.5

  fluid.activate();
})();
