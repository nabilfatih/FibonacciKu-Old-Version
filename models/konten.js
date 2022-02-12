const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kontenSchema = new Schema ({
    query: String,
    querybab: String,
    querysubbab: String,
    queryjudul: String,
    pelajaran: String,
    tipe: String,
    bab: String,
    subbab: String,
    judul: String,
    link: String
})

module.exports = mongoose.model('Konten', kontenSchema);