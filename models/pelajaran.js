const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pelajaranSchema = new Schema ({
    jenis: String,
    query: String,
    pelajaran: String,
    icon: String
});

module.exports = mongoose.model('Pelajaran', pelajaranSchema);