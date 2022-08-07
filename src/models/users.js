const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const employeeSchema = new mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    PhoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    DOB: {
        type: Date,
        required: true
    },
    AadharNumber: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    confirmpassword: {
        type: Number,
        required: true
    }
})

const users = new mongoose.model("users", employeeSchema);
module.exports = users;