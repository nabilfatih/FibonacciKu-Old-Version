const mongoose = require('mongoose');
const Pelajaran = require('../models/pelajaran');
const Bab = require('../models/bab');
const SubBab = require('../models/subbab');
const Konten = require('../models/konten');
const { DataPelajaran } = require('./dataPelajaran');
const { DataBab } = require('./dataBab');
const { DataSubBab } = require('./dataSubBab');
const { DataKonten } = require('./dataKonten');

const dbUrlProduction = 'mongodb://localhost:27017/fibonacciku';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const seedDB = async() => {

    //Pelajaran
    await Pelajaran.deleteMany({});
    for (let i = 0; i < DataPelajaran.length; i++) {
        const datapelajaran = new Pelajaran({
            jenis: `${DataPelajaran[i].jenis}`,
            query: `${DataPelajaran[i].query}`,
            pelajaran: `${DataPelajaran[i].pelajaran}`,
            icon: `${DataPelajaran[i].icon}`
        })
        await datapelajaran.save();
    }

    //Bab
    await Bab.deleteMany({});
    for (let i = 0; i < DataBab.length; i++) {
        const databab = new Bab({
            query: `${DataBab[i].query}`,
            querybab: `${DataBab[i].querybab}`,
            pelajaran: `${DataBab[i].pelajaran}`,
            icon: `${DataBab[i].icon}`,
            bab: `${DataBab[i].bab}`
        })
        await databab.save();
    }

    //Subbab
    await SubBab.deleteMany({});
    for (let i = 0; i < DataSubBab.length; i++) {
        const datasubbab = new SubBab({
            query: `${DataSubBab[i].query}`,
            querybab: `${DataSubBab[i].querybab}`,
            querysubbab: `${DataSubBab[i].querysubbab}`,
            pelajaran: `${DataSubBab[i].pelajaran}`,
            bab: `${DataSubBab[i].bab}`,
            subbab: `${DataSubBab[i].subbab}`
        })
        await datasubbab.save()
    }

    //Konten
    await Konten.deleteMany({});
    for (let i = 0; i < DataKonten.length; i++) {
        const datakonten = new Konten({
            query: `${DataKonten[i].query}`,
            querybab: `${DataKonten[i].querybab}`,
            querysubbab: `${DataKonten[i].querysubbab}`,
            queryjudul: `${DataKonten[i].queryjudul}`,
            tipe: `${DataKonten[i].tipe}`,
            pelajaran: `${DataKonten[i].pelajaran}`,
            bab: `${DataKonten[i].bab}`,
            subbab: `${DataKonten[i].subbab}`,
            judul: `${DataKonten[i].judul}`,
            link: `${DataKonten[i].link}`
        })
        await datakonten.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});