const fs = require('fs')
const { promisify } = require('util')
let inputUtils = module.exports = {}

inputUtils.gatherJSON = (dir) => {
  return new Promise((resolve, reject) => {
    promisify(fs.readdir)(dir)
      .then((filenames) => {
        return Promise.all(filenames.map((filename) => {
          return promisify(fs.readFile)(dir + filename, { encoding: 'utf8' })
        }))
      })
      .then((strArr) => {
        const data = []
        strArr.forEach((str, i) => {
          data.push(JSON.parse(str))
        })
        resolve(data)
      })
      .catch((err) => {
        reject(err)
        console.log(err)
      })
  })
}

const getDayOfWeek = (date) => {
  const day = new Array(7)
  day[0] = 'Sunday'
  day[1] = 'Monday'
  day[2] = 'Tuesday'
  day[3] = 'Wednesday'
  day[4] = 'Thursday'
  day[5] = 'Friday'
  day[6] = 'Saturday'
  return new Promise((resolve, reject) => {
    let returnObject = {}
    let dayOfWeek = day[date.getDay()]
    if (typeof dayOfWeek !== 'undefined' || typeof dayOfWeek !== 'object') {
      returnObject[dayOfWeek] = 1
      resolve(returnObject)
    } else {
      reject(new Error('unable to get the day of the week'))
    }
  })
}

const formatLanguage = (languageObject, language) => {
  languageObject[language.name] = language.percent / 100
  return languageObject
}

const formatLanguages = (languages) => {
  return new Promise((resolve, reject) => {
    const languageObjects = languages.reduce(formatLanguage, {})
    resolve(languageObjects)
  })
}

inputUtils.formatInput = (input) => {
  return new Promise((resolve, reject) => {
    const formatedData = []
    // TODO replace this with a reduce
    input.forEach(record => {
      Promise.all([
        getDayOfWeek(new Date(record.start)),
        formatLanguages(record.data[0].languages)
      ])
        .then(results => {
          formatedData.push({ ...results[0], ...results[1] })
          resolve(formatedData)
        })
    })
    // TODO figure out some error checking here
  })
}
