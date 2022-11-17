const fs = require('fs-extra')
const path = require('path')

const { pathExistsSync, emptyDirSync, copySync } = fs
function prebuild() {
  const testDir = pathExistsSync('public')

  if (testDir) {
    emptyDirSync(path.resolve('public'), (err) => {
      if (err) return console.error(err)
      console.log('success!')
    })
  }

  copySync(path.resolve('src',  'public'), 'public', {
    dereference: true,
    filter: (file) => {
      console.log(file)
      return file !== path.resolve('src',  'public', 'index.html')
    }
  })
}

prebuild()
