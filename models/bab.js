const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const babSchema = new Schema ({
    query: String,
    querybab: String,
    pelajaran: String,
    icon: String,
    bab: String,
    judul: String,
    link: String
})

module.exports = mongoose.model('Bab', babSchema);

