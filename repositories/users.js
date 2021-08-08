const User = require('../model/userShema')

const createUser = async body => {
  try {
    const user = new User(body)
    return await user.save()
  } catch (error) {
    console.log(error)
  }
}

const findById = async id => {
  try {
    return await User.findById(id)
  } catch (error) {
    console.log(error)
  }
}

const findByEmail = async email => {
  try {
    return await User.findOne({ email })
  } catch (error) {
    console.log(error)
  }
}

const updateToken = async (id, token) => {
  try {
    return await User.updateOne({ _id: id }, { token })
  } catch (error) {
    console.log(error)
  }
}

const updateUserSubscription = async (userId, body) => {
  try {
    const updatedStatus = await User.findByIdAndUpdate(userId, { ...body }, { new: true })
    return updatedStatus
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createUser,
  findById,
  findByEmail,
  updateToken,
  updateUserSubscription,
}
