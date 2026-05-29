const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    videoTitle: {
        type: String
    },
    synopsis: {
        type: String
    }
})

const History = mongoose.model('History', historySchema)

module.exports = History