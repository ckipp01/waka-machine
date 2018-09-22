// TODO the input should be numeric values
const trainingData = [
  {
    input: {
      day: 'Monday',
      language: 'JavaScript',
      percent: 78
    },
    output: { jsDay: 1 }
  },
  {
    input: {
      day: 'Monday',
      language: 'JavaScript',
      percent: 48
    },
    output: { jsDay: 0 }
  },
  {
    input: {
      day: 'Monday',
      language: 'JavaScript',
      percent: 98
    },
    output: { jsDay: 1 }
  }
]

module.exports.trainingData = trainingData
