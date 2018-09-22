const brain = require('brain.js')
let brainUtils = module.exports = {}

let trainedNet

const processTrainingData = (data) => {
  return data.map(d => {
    return {
      input: d.input,
      output: d.output
    }
  })
}

brainUtils.train = (data) => {
  let net = new brain.NeuralNetwork()
  net.train(processTrainingData(data))
  trainedNet = net.toFunction()
}

brainUtils.execute = (input) => {
  return new Promise((resolve, reject) => {
    let results = trainedNet(input)
    console.log(results.jsDay)
    resolve(results)
  })
}
