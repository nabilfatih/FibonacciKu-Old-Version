const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pelajaranSchema = new Schema ({
    pelajaran: String,
    bab: String,
    judul: String,
    link: String
});

module.exports = mongoose.model('Pelajaran', pelajaranSchema);