const mongoose = require("mongoose");
const fileSchema = mongoose.Schema({

    filename: { type: String, required: true },
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    name: String,
    project: String,
    lot: String,
    time: Number,
    description: String,

})

const file = mongoose.model("File", fileSchema)


module.exports = file;