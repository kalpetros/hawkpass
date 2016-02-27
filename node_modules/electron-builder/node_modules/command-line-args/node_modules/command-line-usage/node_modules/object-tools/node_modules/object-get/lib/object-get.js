'use strict'

/**
 * Access nested property values at any depth with a simple expression.
 *
 * @module object-get
 * @typicalname objectGet
 * @example
 * var objectGet = require('object-get')
 */
module.exports = objectGet

/**
 * Returns the value at the given property.
 *
 * @param {object} - the input object
 * @param {string} - the property accessor expression
 * @returns {*}
 * @alias module:object-get
 * @example
 * > objectGet({ animal: 'cow' }, 'animal')
 * 'cow'
 *
 * > objectGet({ animal: { mood: 'lazy' } }, 'animal')
 * { mood: 'lazy' }
 *
 * > objectGet({ animal: { mood: 'lazy' } }, 'animal.mood')
 * 'lazy'
 */
function objectGet (object, expression) {
  if (!(object && expression)) throw new Error('both object and expression args are required')
  return expression.trim().split('.').reduce(function (prev, curr) {
    return prev && prev[curr]
  }, object)
}
