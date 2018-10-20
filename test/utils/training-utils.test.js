'use strict'
const { describe, it } = require('mocha')
const trainingUtils = require('../../app/utils/training-utils')
const path = require('path')
var assert = require('assert')

describe('training-utils', function () {
  describe('gatherJSON()', function () {
    const dir = path.join(__dirname, '../resources/')
    const trainingData = trainingUtils.gatherJSON(dir)

    it('should return an array', function () {
      trainingData.then(result =>
        assert(Array.isArray(result))
      )
    })
    it('return array should contain 23 items', function () {
      return trainingData.then(result =>
        assert.strictEqual(23, result.length)
      )
    })
    it('array should contain only objects', function () {
      return trainingData.then(result => {
        const resultType = result.map(o => typeof o === 'object')
        assert.notStrictEqual(true, resultType.includes(false))
      })
    })
    it('object structure should contain data, end, and start', function () {
      const expectedKeys = [ 'data', 'end', 'start' ]
      return trainingData.then(result =>
        assert.deepStrictEqual(expectedKeys, Object.keys(result[0]))
      )
    })
  })
})
