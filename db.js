const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://amiracle10:sdev255password@songdb.2xkjaqt.mongodb.net/?retryWrites=true&w=majority&appName=SongDB", {useNewUrlParser: true})

module.exports = mongoose