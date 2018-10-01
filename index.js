'use strict'
// const trainingData = require('./data/training-data.js')
const brainUtils = require('./utils/brain-utils')
const inputUtils = require('./utils/input-utils')
const path = require('path')
const myDir = path.join(__dirname, '/data/')

inputUtils.gatherJSON(myDir)
  .then(json => {
    return inputUtils.formatInput(json)
  })
  .then(preparedInput => {
    console.log(preparedInput)
  })
  .catch(err => {
    throw err
  })

console.log('Gimme some of that juicy input\n')

process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk !== null) {
    process.stdout.write('Processing input \n')
    // brainUtils.execute(myFakeInput).then((result) => {
    //   console.log(result)
    // })
  }
})

process.stdin.on('end', () => {
  process.stdout.write('end')
})
