const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pelajaranMTKSchema = new Schema ({
    query: String,
    pelajaran: String,
    bab: String,
    judul: String,
    link: String
})

module.exports = mongoose.model('PelajaranMTK', pelajaranMTKSchema);

