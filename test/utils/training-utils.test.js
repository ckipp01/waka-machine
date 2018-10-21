'use strict'
const { describe, it } = require('mocha')
const trainingUtils = require('../../app/utils/training-utils')
const path = require('path')
const assert = require('assert')

const dir = path.join(__dirname, '../resources/')
const trainingData = trainingUtils.gatherJSON(dir)
const rawFileCount = 23
const formattedCount = 20

describe('training-utils', () => {
  describe('gatherJSON()', () => {
    it('should return an array', () => {
      trainingData.then(result =>
        assert(Array.isArray(result))
      )
    })

    it(`return array should contain ${rawFileCount} items`, () => {
      return trainingData.then(result =>
        assert.strictEqual(rawFileCount, result.length)
      )
    })

    it('array should contain only objects', () => {
      return trainingData.then(result => {
        const resultType = result.map(o => typeof o === 'object')
        assert.notStrictEqual(true, resultType.includes(false))
      })
    })

    it('object structure should contain data, end, and start', () => {
      const expectedKeys = [ 'data', 'end', 'start' ]
      return trainingData.then(result =>
        assert.deepStrictEqual(expectedKeys, Object.keys(result[0]))
      )
    })
  })

  describe('formatInput()', () => {
    const formatedData = trainingData.then(result =>
      trainingUtils.formatInput(result)
    )

    it(`formatted array should contain ${formattedCount} items`, () => {
      return formatedData.then(data =>
        assert.strictEqual(formattedCount, data.length)
      )
    })
  })
})
