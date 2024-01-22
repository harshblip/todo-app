const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
mongoose.connect(process.env.DB_CONNECT);

const todoTaskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('TodoTask', todoTaskSchema);