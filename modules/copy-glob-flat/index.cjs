/* eslint-disable no-undef */
const path = require('path')
const fs = require('fs')
const globby = require('globby')

async function copyToSingleDir(destDir, ...globbyPatterns) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, {recursive: true})
  }

  const files = await globby(globbyPatterns)
  const buffer = {}
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const parsed = path.parse(file)
    const name = path.join(destDir, parsed.name)
    const ext = parsed.ext
    let destFile = name + ext
    let n = 0
    while (buffer[destFile]) {
      destFile = name + n + ext
      n++
    }
    buffer[destFile] = file
  }

  await Promise.all(Object.keys(buffer)
    .map(destFile => new Promise((resolve, reject) => {
      fs.copyFile(buffer[destFile], destFile, err => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })),
  )
}

module.exports = {
  copyToSingleDir,
}

