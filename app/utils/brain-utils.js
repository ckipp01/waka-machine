'use strict'
const brain = require('brain.js')
let brainUtils = module.exports = {}

let trainedNet

brainUtils.train = (trainingData) => {
  let net = new brain.NeuralNetwork()
  net.train(trainingData)
  trainedNet = net
}

const formatedUserInput = (input) => {
  let userInputObject = {}
  const day = input.slice(0, input.length - 1)
  userInputObject[day] = 1
  return userInputObject
}

brainUtils.execute = (input) => {
  return new Promise((resolve, reject) => {
    let results = trainedNet.run(formatedUserInput(input))
    resolve(results)
  })
}
