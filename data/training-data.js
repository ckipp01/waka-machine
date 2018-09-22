const trainingData = [
  {
    input: {
      day: 'Monday',
      languages: [
        {
          'name': 'JavaScript',
          'percent': 98.82
        },
        {
          'name': 'Markdown',
          'percent': 0.66
        },
        {
          'name': 'JSON',
          'percent': 0.46
        },
        {
          'name': 'VimL',
          'percent': 0.04
        },
        {
          'name': 'LESS',
          'percent': 0.03
        }
      ]
    },
    output: { jsDay: 1 }
  },
  {
    input: {
      day: 'Monday',
      languages: [
        {
          'name': 'JavaScript',
          'percent': 46.82
        },
        {
          'name': 'Markdown',
          'percent': 50.18
        },
        {
          'name': 'JSON',
          'percent': 10.00
        },
        {
          'name': 'VimL',
          'percent': 11.00
        },
        {
          'name': 'LESS',
          'percent': 1.00
        }
      ]
    },
    output: { MarkDownDay: 0 }
  },
  {
    input: {
      day: 'Monday',
      languages: [
        {
          'name': 'JavaScript',
          'percent': 48.10
        },
        {
          'name': 'Markdown',
          'percent': 30.00
        },
        {
          'name': 'JSON',
          'percent': 6.00
        },
        {
          'name': 'VimL',
          'percent': 4.00
        },
        {
          'name': 'LESS',
          'percent': 1.90
        }
      ]
    },
    output: { jsDay: 0 }
  }
]

module.exports.trainingData = trainingData
