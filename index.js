'use strict'
const trainingData = require('./data/training-data.js')
const utils = require('./utils/brain-utils.js')

utils.train(trainingData.trainingData)

const myFakeInput = { day: 'Monday', language: 'JavaScript', percent: 99 }
// process.stdin.setEncoding('utf8')

console.log('Gimme some of that juicy input\n')

process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`)
    utils.execute(myFakeInput).then((result) => {
      console.log(result)
    })
  }
})

process.stdin.on('end', () => {
  process.stdout.write('end')
})
