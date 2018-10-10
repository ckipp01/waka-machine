const brain = require('brain.js')
let brainUtils = module.exports = {}

let trainedNet

brainUtils.train = (trainingData) => {
  let net = new brain.NeuralNetwork()
  net.train(trainingData)
  trainedNet = net.toFunction()
}

const formatedUserInput = (input) => {
  let userInputObject = {}
  const day = input.slice(0, input.length - 1)
  userInputObject[day] = 1
  userInputObject['Linux'] = 1
  userInputObject['JavaScript'] = 0.8
  console.log(userInputObject)
  return userInputObject
}

brainUtils.execute = (input) => {
  return new Promise((resolve, reject) => {
    let results = trainedNet(formatedUserInput(input))
    resolve(results)
  })
}
