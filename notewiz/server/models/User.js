const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true, // Makes the username field required
        trim: true // Optional: removes whitespace from both ends of the string
    },
    password: {
        type: String,
        required: true // Makes the password field required
    },
    preferName: {
        type: String,
        required: false, // Makes the password field required
        default: ''
    }
})

const UserModel = mongoose.model("user", UserSchema)
module.exports = UserModel