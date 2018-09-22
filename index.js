'use strict'
const trainingData = require('./data/training-data.js')
const utils = require('./utils/brain-utils.js')

utils.train(trainingData.trainingData)

const myFakeInput = {
  day: 'Monday',
  languages: [
    {
      'name': 'JavaScript',
      'percent': 10 },
    {
      'name': 'Markdown',
      'percent': 80
    },
    {
      'name': 'JSON',
      'percent': 2
    },
    {
      'name': 'VimL',
      'percent': 1
    },
    {
      'name': 'LESS',
      'percent': 7
    }
  ]
}

console.log('Gimme some of that juicy input\n')

process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk !== null) {
    process.stdout.write('Processing input \n')
    utils.execute(myFakeInput).then((result) => {
      console.log(result)
    })
  }
})

process.stdin.on('end', () => {
  process.stdout.write('end')
})
