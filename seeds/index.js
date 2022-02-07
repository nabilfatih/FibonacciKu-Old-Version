const mongoose = require('mongoose');
const beranda = require('../models/beranda');
const pelajaran = require('../models/pelajaran');

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
    await beranda.deleteMany({});
    
}

seedDB().then(() => {
    mongoose.connection.close();
});