const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://harsh:lolololol@todo-cluster.xpljwfs.mongodb.net/runtest?retryWrites=true&w=majority');

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