'use strict'
var Transform = require('stream').Transform
var util = require('util')

/**
 * @module stream-via
 */
module.exports = via
via.async = viaAsync

function SimpleTransform (options) {
  if (!(this instanceof SimpleTransform)) return new SimpleTransform(options)
  Transform.call(this, options)
  this.buf = new Buffer(0)
}
util.inherits(SimpleTransform, Transform)

/**
 * @param {module:stream-via~throughFunction} - a function to process each chunk
 * @param [options] {object} - passed to the returned stream constructor
 * @return {external:Duplex}
 * @alias module:stream-via
 */
function via (throughFunction, options) {
  var stream = SimpleTransform(options)
  stream._transform = function (chunk, enc, done) {
    if (chunk) {
      try {
        this.push(throughFunction(chunk, enc))
      } catch (err) {
        stream.emit('error', err)
      }
    }
    done()
  }
  return stream
}

/**
 * @param {module:stream-via~throughFunction} - a function to process each chunk
 * @param [options] {object} - passed to the returned stream constructor
 * @return {external:Duplex}
 * @alias module:stream-via.async
 */
function viaAsync (throughFunction, options) {
  var stream = SimpleTransform(options)
  stream._transform = function (chunk, enc, done) {
    if (chunk) {
      try {
        throughFunction(chunk, enc, function (err, returnValue) {
          if (err) {
            stream.emit('error', err)
          } else {
            stream.push(returnValue)
          }
          done()
        })
      } catch (err) {
        stream.emit('error', err)
        done()
      }
    }
  }
  return stream
}

/**
 * @external Duplex
 * @see https://nodejs.org/api/stream.html#stream_class_stream_duplex
 */

/**
 * @typedef throughFunction
 * @type function
 * @param chunk {buffer|string}
 * @param enc {string}
 * @param done {function} - only used in `via.async`, call it like so: `done(err, returnValue)`.
 */
