const {copyToSingleDir} = require('./index.cjs')

const [outputDir, ...inputGlobs] = process.argv.slice(2)

copyToSingleDir(outputDir, ...inputGlobs)
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
