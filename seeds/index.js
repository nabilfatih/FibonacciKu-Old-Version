const mongoose = require('mongoose');
const { dataPelajaran, dataPelajaranUjian } = require('./dataPelajaran');
const { babMTK, babFisika, babInformatika } = require('./dataBab');
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
    for (let i = 0; i < dataPelajaran.length; i++) {
        const pelajaran = new Pelajaran({
            query: `${dataPelajaran[i].query}`,
            pelajaran: `${dataPelajaran[i].pelajaran}`,
            icon: `${dataPelajaran[i].icon}`
        })
        await pelajaran.save();
    }
    for (let i = 0; i < dataPelajaranUjian.length; i++) {
        const pelajaranUjian = new Pelajaran({
            query: `${dataPelajaranUjian[i].query}`,
            pelajaran: `${dataPelajaranUjian[i].pelajaran}`,
            icon: `${dataPelajaranUjian[i].icon}`
        })
        await pelajaranUjian.save();
    }
}

seedDB();

// seedDB().then(() => {
//     mongoose.connection.close();
// });