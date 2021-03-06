'use strict'
const fs = require('fs')
const { promisify } = require('util')
let trainingUtils = module.exports = {}

trainingUtils.gatherJSON = (dir) => {
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
  languageObject[language.name] = Number((language.percent / 100).toFixed(2))
  return languageObject
}

const formatLanguages = (languages) => {
  return new Promise((resolve, reject) => {
    const languageObjects = languages.reduce(formatLanguage, {})
    if (Object.keys(languageObjects).length === 0 &&
      languageObjects.constructor === Object) {
      reject(new Error('unable to gather language inforamtion'))
    } else {
      resolve(languageObjects)
    }
  })
}

const formatOperatingSystem = (osObject, os) => {
  osObject[os.name] = Number((os.percent / 100).toFixed(2))
  return osObject
}

const formatOperatingSystems = (osData) => {
  return new Promise((resolve, reject) => {
    const osObjects = osData.reduce(formatOperatingSystem, {})
    resolve(osObjects)
    if (Object.keys(osObjects).length === 0 &&
      osObjects.constructor === Object) {
      reject(new Error('unable to gather os inforamtion'))
    } else {
      resolve(osObjects)
    }
  })
}

trainingUtils.formatInput = (input) => {
  return new Promise((resolve, reject) => {
    const formatedData = []
    // TODO replace this with a reduce
    input.forEach(record => {
      Promise.all([
        getDayOfWeek(new Date(record.data[0].range.date)),
        formatLanguages(record.data[0].languages),
        formatOperatingSystems(record.data[0].operating_systems)
      ])
        .then(formatedInput => {
          const outputObject = {}
          const inputObject = {
            ...formatedInput[0],
            ...formatedInput[1],
            ...formatedInput[2]
          }
          outputObject[record.data[0].languages[0].name + ' Day'] = 1
          formatedData.push({ input: inputObject, output: outputObject })
          resolve(formatedData)
        }, err => {
          reject(err)
        })
    })
  })
}
