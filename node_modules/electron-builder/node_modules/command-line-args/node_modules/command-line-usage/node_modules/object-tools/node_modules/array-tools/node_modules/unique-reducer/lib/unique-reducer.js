'use strict'

/**
 * Reduce an array to one or more unique values.
 * 
 * @module unique-reducer
 * @example
 * > unique = require('unique-reducer')
 *
 * > var arr = [ 1, 3, 8, 3, 1, 2, 1, 9, 3, 3 ]
 *
 * > arr.reduce(unique)
 * [ 1, 3, 8, 2, 9 ]
 */
module.exports = uniqueReducer

function uniqueReducer (prev, curr) {
  if (!Array.isArray(prev)) prev = [ prev ]
  if (prev.indexOf(curr) === -1) prev.push(curr)
  return prev
}
