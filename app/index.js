'use strict'
const brainUtils = require('./utils/brain-utils')
const trainingUtils = require('./utils/training-utils')
const path = require('path')
const myDir = path.join(__dirname, '../data/')

trainingUtils.gatherJSON(myDir)
  .then(json => {
    return trainingUtils.formatInput(json)
  })
  .then(preparedInput => {
    brainUtils.train(preparedInput)
  })
  .catch(err => {
    throw err
  })

console.log('Please provide a day of the week\n')

process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk !== null) {
    process.stdout.write(`Processing input ${chunk} \n`)
    brainUtils.execute(chunk).then((result) => {
      console.log(result)
    })
  }
})

process.stdin.on('end', () => {
  process.stdout.write('end')
})
