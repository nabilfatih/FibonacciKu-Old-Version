const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subbabSchema = new Schema ({
    query: String,
    querybab: String,
    querysubbab: String,
    pelajaran: String,
    bab: String,
    subbab: String,
    judul: String,
    link: String
});

module.exports = mongoose.model('SubBab', subbabSchema);