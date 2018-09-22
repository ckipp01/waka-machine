const brain = require('brain.js')
let brainUtils = module.exports = {}

let trainedNet

const processLanguageData = (language) => {
    let languageObject = {}
    const languageName = language.name
    const majority = (language.percent > 50) ? 1 : 0
    languageObject[languageName] = majority
    return languageObject
}

const formatInput = (InputData, type) => {
  const data = (type === 'training') ? InputData.input : InputData
  const monday = (data.day === 'Monday') ? 1 : 0
  const mondayArray = [{ Monday: monday }]
  const languageArray = data.languages.map(processLanguageData)
  return mondayArray.concat(languageArray)
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
  let test = processTrainingData(trainingData)
  // net.train(processTrainingData(trainingData))
  console.log(test)
  net.train(test)
  trainedNet = net.toFunction()
}

brainUtils.execute = (input) => {
  return new Promise((resolve, reject) => {
    let results = trainedNet(formatInput(input, 'user'))
    resolve(results)
  })
}
