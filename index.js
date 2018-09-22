'use strict'
const trainingData = require('./data/training-data.js')
const utils = require('./utils/brain-utils.js')

utils.train(trainingData.trainingData)

const myFakeInput = { 
  day: 'Monday',
  languages: [
    {
      "name": "JavaScript",
      "percent": 78.82,
    },
    {
      "name": "Markdown",
      "percent": 20.66,
    },
    {
      "name": "JSON",
      "percent": 0.46,
    },
    {
      "name": "VimL",
      "percent": 0.04,
    },
    {
      "name": "LESS",
      "percent": 0.03,
    }
  ]
}
// process.stdin.setEncoding('utf8')

console.log('Gimme some of that juicy input\n')

process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk !== null) {
    process.stdout.write(`data: ${myFakeInput} \n`)
    utils.execute(myFakeInput).then((result) => {
      console.log(result)
    })
  }
})

process.stdin.on('end', () => {
  process.stdout.write('end')
})
