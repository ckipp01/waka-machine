const brain = require('brain.js')
let brainUtils = module.exports = {}

let trainedNet

const processLanguageData = (language) => {
  let languageObject = {}
  const languageName = language.name
  const percentage = (language.percent / 100)
  languageObject[languageName] = percentage
  return languageObject
}

const reducer = (accumulator, currentObject) => Object.assign(currentObject, accumulator)

const formatInput = (InputData, type) => {
  const data = (type === 'training') ? InputData.input : InputData
  const monday = (data.day === 'Monday') ? 1 : 0
  const mondayArray = [{ Monday: monday }]
  const languageArray = data.languages.map(processLanguageData)
  const groupedArray = mondayArray.concat(languageArray)
  return groupedArray.reduce(reducer, {})
}

const processTrainingData = (trainingData) => {
  return trainingData.map(data => {
    return {
      input: formatInput(data, 'training'),
      output: data.output
    }
  })
}

brainUtils.train = (trainingData) => {
  let net = new brain.NeuralNetwork()
  net.train(processTrainingData(trainingData))
  trainedNet = net.toFunction()
}

brainUtils.execute = (input) => {
  return new Promise((resolve, reject) => {
    let results = trainedNet(formatInput(input, 'user'))
    resolve(results)
  })
}
