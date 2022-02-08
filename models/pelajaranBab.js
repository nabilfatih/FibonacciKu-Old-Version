const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pelajaranBabSchema = new Schema ({
    query: String,
    pelajaran: String,
    icon: String,
    bab: String,
    judul: String,
    link: String
})

module.exports = mongoose.model('PelajaranBab', pelajaranBabSchema);

