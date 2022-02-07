const mongoose = require('mongoose');
const beranda = require('../models/beranda');
const subBabMTK = require('./subBabMTK');
const bab = require('./bab');
const { dataPelajaran, dataPelajaranUjian } = require('./dataPelajaran');
const Pelajaran = require('../models/pelajaran');

mongoose.connect('mongodb://localhost:27017/fibonacciku', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const seedDB = async() => {
    await Pelajaran.deleteMany({});
}

seedDB().then(() => {
    mongoose.connection.close();
});