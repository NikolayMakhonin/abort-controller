"use strict"

// const babel = require("rollup-plugin-babel")
// const commonjs = require("rollup-plugin-commonjs")
// // const json = require("rollup-plugin-json")
// const resolve = require("rollup-plugin-node-resolve")
// const sourcemaps = require("rollup-plugin-sourcemaps")
// const typescript = require("rollup-plugin-typescript")
// const builtins = require("rollup-plugin-node-builtins")
// const globals = require("rollup-plugin-node-globals")

module.exports = function(config) {
  config.set({
    browsers: ["ChromeLatest", "Chromium39"],//, "Firefox", "Edge"],
    files: ["dist/browser/tests.js"],
    frameworks: ["mocha"],
    reporters: ["progress"],
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-edge-launcher',
      'karma-mocha',
      'karma-coverage',
      require('./modules/karma-custom-launcher'),
    ],
    customLaunchers: {
      Chromium33: {
        base       : 'Custom',
        parent     : 'ChromiumHeadless',
        displayName: 'Chromium 33.0.1750.170',
        flags      : [
          '--incognito',
          '--no-sandbox',
          '--disable-web-security',
          '--allow-cross-origin-auth-prompt',
          '--disable-site-isolation-trials',
        ],
        DEFAULT_CMD: {
          win32: 'E:/Program Files (x86)/Chromium/33.0.1750.170/chrome.exe',
        },
        ENV_CMD: null,
      },
      Chromium39: {
        base       : 'Custom',
        parent     : 'ChromiumHeadless',
        displayName: 'Chromium 39.0.2171.99',
        flags      : [
          '--incognito',
          '--no-sandbox',
          '--disable-web-security',
          '--allow-cross-origin-auth-prompt',
          '--disable-site-isolation-trials',
        ],
        DEFAULT_CMD: {
          win32: 'E:/Program Files (x86)/Chromium/39.0.2171.99/chrome.exe',
        },
        ENV_CMD: null,
      },
      Chromium44: {
        base       : 'Custom',
        parent     : 'ChromiumHeadless',
        displayName: 'Chromium 44.0.2403.119',
        flags      : [
          '--incognito',
          '--no-sandbox',
          '--disable-web-security',
          '--allow-cross-origin-auth-prompt',
          '--disable-site-isolation-trials',
        ],
        DEFAULT_CMD: {
          win32: 'E:/Program Files (x86)/Chromium/44.0.2403.119/chrome.exe',
        },
        ENV_CMD: null,
      },
      ChromiumLatest: {
        base  : 'Custom',
        parent: 'ChromiumHeadless',
        flags : [
          '--incognito',
          '--no-sandbox',
          '--disable-web-security',
          '--allow-cross-origin-auth-prompt',
          '--disable-site-isolation-trials',
        ],
        DEFAULT_CMD: {
          win32: 'E:/Program Files (x86)/Chromium/44.0.2403.119/chrome.exe',
        },
        ENV_CMD: null,
      },
      ChromeLatest: {
        base  : 'Custom',
        parent: 'ChromeHeadless',
        flags : [
          '--incognito',
          '--no-sandbox',
          '--disable-web-security',
          '--allow-cross-origin-auth-prompt',
          '--disable-site-isolation-trials',
        ],
        // DEFAULT_CMD: {
        //   win32: 'E:/Program Files (x86)/Google/Chrome Dev/Application/chrome.exe',
        // },
        ENV_CMD: null,
      },
    },
  })
}
