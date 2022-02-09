const mongoose = require('mongoose');
const { dataPelajaran, dataPelajaranUjian } = require('./dataPelajaran');
const { babMTK, babFisika, babInformatika } = require('./dataBab');
const Pelajaran = require('../models/pelajaran');
const Bab = require('../models/bab');

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

    await Bab.deleteMany({});
    for (let i = 0; i < babMTK.length; i++) {
        const babmtk = new Bab({
            query: `${babMTK[i].query}`,
            pelajaran: `${babMTK[i].pelajaran}`,
            icon: `${babMTK[i].icon}`,
            bab: `${babMTK[i].bab}`
        })
        await babmtk.save();
    }
    for (let i = 0; i < babFisika.length; i++) {
        const babfisika = new Bab({
            query: `${babFisika[i].query}`,
            pelajaran: `${babFisika[i].pelajaran}`,
            icon: `${babFisika[i].icon}`,
            bab: `${babFisika[i].bab}`
        })
        await babfisika.save();
    }
    for (let i = 0; i < babInformatika.length; i++) {
        const babinformatika = new Bab({
            query: `${babInformatika[i].query}`,
            pelajaran: `${babInformatika[i].pelajaran}`,
            icon: `${babInformatika[i].icon}`,
            bab: `${babInformatika[i].bab}`
        })
        await babinformatika.save();
    }
}

seedDB();

// seedDB().then(() => {
//     mongoose.connection.close();
// });