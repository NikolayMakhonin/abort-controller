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
    browsers: ["Chrome"],//, "Firefox", "Edge"],
    files: ["dist/browser/tests.js"],
    frameworks: ["mocha"],
    reporters: ["progress"],
  })
}
