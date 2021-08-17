const fs = require('fs/promises')

const isAccessible = path => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}

// function create directory if no exist
const createFolderIsNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder)
  }
}

module.exports = createFolderIsNotExist
