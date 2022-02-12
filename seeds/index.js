const mongoose = require('mongoose');
const { dataPelajaran, dataPelajaranUjian } = require('./dataPelajaran');
const { babMTK, babFisika, babInformatika, babBiologi, babKimia, babAI } = require('./dataBab');
const Pelajaran = require('../models/pelajaran');
const Bab = require('../models/bab');
const SubBab = require('../models/subbab');
const Konten = require('../models/konten');
const { Fungsi, MTKDasar, Aljabar, Matriks, Eksponen, TeoriBilangan, Himpunan, Turunan, AljabarLinear, Analisis } = require('./dataSubBab');
const { ApaItuFungsi, MenghitungFungsi } = require('./dataKonten');

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
    //Pelajaran
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

    //Bab
    await Bab.deleteMany({});
    for (let i = 0; i < babMTK.length; i++) {
        const babmtk = new Bab({
            query: `${babMTK[i].query}`,
            querybab: `${babMTK[i].querybab}`,
            pelajaran: `${babMTK[i].pelajaran}`,
            icon: `${babMTK[i].icon}`,
            bab: `${babMTK[i].bab}`
        })
        await babmtk.save();
    }
    for (let i = 0; i < babFisika.length; i++) {
        const babfisika = new Bab({
            query: `${babFisika[i].query}`,
            querybab: `${babFisika[i].querybab}`,
            pelajaran: `${babFisika[i].pelajaran}`,
            icon: `${babFisika[i].icon}`,
            bab: `${babFisika[i].bab}`
        })
        await babfisika.save();
    }
    for (let i = 0; i < babInformatika.length; i++) {
        const babinformatika = new Bab({
            query: `${babInformatika[i].query}`,
            querybab: `${babInformatika[i].querybab}`,
            pelajaran: `${babInformatika[i].pelajaran}`,
            icon: `${babInformatika[i].icon}`,
            bab: `${babInformatika[i].bab}`
        })
        await babinformatika.save();
    }
    for (let i = 0; i < babBiologi.length; i++) {
        const babbiologi = new Bab({
            query: `${babBiologi[i].query}`,
            querybab: `${babBiologi[i].querybab}`,
            pelajaran: `${babBiologi[i].pelajaran}`,
            icon: `${babBiologi[i].icon}`,
            bab: `${babBiologi[i].bab}`
        })
        await babbiologi.save();
    }
    for (let i = 0; i < babKimia.length; i++) {
        const babkimia = new Bab({
            query: `${babKimia[i].query}`,
            querybab: `${babKimia[i].querybab}`,
            pelajaran: `${babKimia[i].pelajaran}`,
            icon: `${babKimia[i].icon}`,
            bab: `${babKimia[i].bab}`
        })
        await babkimia.save();
    }
    for (let i = 0; i < babAI.length; i++) {
        const babai = new Bab({
            query: `${babAI[i].query}`,
            querybab: `${babAI[i].querybab}`,
            pelajaran: `${babAI[i].pelajaran}`,
            icon: `${babAI[i].icon}`,
            bab: `${babAI[i].bab}`
        })
        await babai.save();
    }

    //Subbab
    await SubBab.deleteMany({});
    for (let i = 0; i < Fungsi.length; i++) {
        const fungsi = new SubBab({
            query: `${Fungsi[i].query}`,
            querybab: `${Fungsi[i].querybab}`,
            querysubbab: `${Fungsi[i].querysubbab}`,
            pelajaran: `${Fungsi[i].pelajaran}`,
            bab: `${Fungsi[i].bab}`,
            subbab: `${Fungsi[i].subbab}`,
        })
        await fungsi.save();
    }
    for (let i = 0; i < MTKDasar.length; i++) {
        const mtkdasar = new SubBab({
            query: `${MTKDasar[i].query}`,
            querybab: `${MTKDasar[i].querybab}`,
            querysubbab: `${MTKDasar[i].querysubbab}`,
            pelajaran: `${MTKDasar[i].pelajaran}`,
            bab: `${MTKDasar[i].bab}`,
            subbab: `${MTKDasar[i].subbab}`
        })
        await mtkdasar.save();
    }
    for (let i = 0; i < Aljabar.length; i++) {
        const aljabar = new SubBab({
            query: `${Aljabar[i].query}`,
            querybab: `${Aljabar[i].querybab}`,
            querysubbab: `${Aljabar[i].querysubbab}`,
            pelajaran: `${Aljabar[i].pelajaran}`,
            bab: `${Aljabar[i].bab}`,
            subbab: `${Aljabar[i].subbab}`
        })
        await aljabar.save();
    }
    for (let i = 0; i < Matriks.length; i++) {
        const matriks = new SubBab({
            query: `${Matriks[i].query}`,
            querybab: `${Matriks[i].querybab}`,
            querysubbab: `${Matriks[i].querysubbab}`,
            pelajaran: `${Matriks[i].pelajaran}`,
            bab: `${Matriks[i].bab}`,
            subbab: `${Matriks[i].subbab}`
        })
        await matriks.save();
    }
    for (let i = 0; i < Eksponen.length; i++) {
        const eksponen = new SubBab({
            query: `${Eksponen[i].query}`,
            querybab: `${Eksponen[i].querybab}`,
            querysubbab: `${Eksponen[i].querysubbab}`,
            pelajaran: `${Eksponen[i].pelajaran}`,
            bab: `${Eksponen[i].bab}`,
            subbab: `${Eksponen[i].subbab}`
        })
        await eksponen.save();
    }
    for (let i = 0; i < TeoriBilangan.length; i++) {
        const teoribilangan = new SubBab({
            query: `${TeoriBilangan[i].query}`,
            querybab: `${TeoriBilangan[i].querybab}`,
            querysubbab: `${TeoriBilangan[i].querysubbab}`,
            pelajaran: `${TeoriBilangan[i].pelajaran}`,
            bab: `${TeoriBilangan[i].bab}`,
            subbab: `${TeoriBilangan[i].subbab}`
        })
        await teoribilangan.save();
    }
    for (let i = 0; i < Himpunan.length; i++) {
        const himpunan = new SubBab({
            query: `${Himpunan[i].query}`,
            querybab: `${Himpunan[i].querybab}`,
            querysubbab: `${Himpunan[i].querysubbab}`,
            pelajaran: `${Himpunan[i].pelajaran}`,
            bab: `${Himpunan[i].bab}`,
            subbab: `${Himpunan[i].subbab}`
        })
        await himpunan.save();
    }
    for (let i = 0; i < Turunan.length; i++) {
        const turunan = new SubBab({
            query: `${Turunan[i].query}`,
            querybab: `${Turunan[i].querybab}`,
            querysubbab: `${Turunan[i].querysubbab}`,
            pelajaran: `${Turunan[i].pelajaran}`,
            bab: `${Turunan[i].bab}`,
            subbab: `${Turunan[i].subbab}`
        })
        await turunan.save();
    }
    for (let i = 0; i < AljabarLinear.length; i++) {
        const aljabarlinear = new SubBab({
            query: `${AljabarLinear[i].query}`,
            querybab: `${AljabarLinear[i].querybab}`,
            querysubbab: `${AljabarLinear[i].querysubbab}`,
            pelajaran: `${AljabarLinear[i].pelajaran}`,
            bab: `${AljabarLinear[i].bab}`,
            subbab: `${AljabarLinear[i].subbab}`
        })
        await aljabarlinear.save();
    }
    for(let i = 0; i < Analisis.length; i++) {
        const analisis = new SubBab({
            query: `${Analisis[i].query}`,
            querybab: `${Analisis[i].querybab}`,
            querysubbab: `${Analisis[i].querysubbab}`,
            pelajaran: `${Analisis[i].pelajaran}`,
            bab: `${Analisis[i].bab}`,
            subbab: `${Analisis[i].subbab}`
        })
        await analisis.save();
    }

    //Konten
    await Konten.deleteMany({});
    for (let i = 0; i < ApaItuFungsi.length; i++) {
        const apaitufungsi = new Konten({
            query: `${ApaItuFungsi[i].query}`,
            querybab: `${ApaItuFungsi[i].querybab}`,
            queryjudul: `${ApaItuFungsi[i].queryjudul}`,
            tipe: `${ApaItuFungsi[i].tipe}`,
            pelajaran: `${ApaItuFungsi[i].pelajaran}`,
            bab: `${ApaItuFungsi[i].bab}`,
            subbab: `${ApaItuFungsi[i].subbab}`,
            judul: `${ApaItuFungsi[i].judul}`,
            link: `${ApaItuFungsi[i].link}`
        })
        await apaitufungsi.save();
    }
    for (let i = 0; i < MenghitungFungsi.length; i++) {
        const menghitungfungsi = new Konten({
            query: `${MenghitungFungsi[i].query}`,
            querybab: `${MenghitungFungsi[i].querybab}`,
            queryjudul: `${MenghitungFungsi[i].queryjudul}`,
            tipe: `${MenghitungFungsi[i].tipe}`,
            pelajaran: `${MenghitungFungsi[i].pelajaran}`,
            bab: `${MenghitungFungsi[i].bab}`,
            subbab: `${MenghitungFungsi[i].subbab}`,
            judul: `${MenghitungFungsi[i].judul}`,
            link: `${MenghitungFungsi[i].link}`
        })
        await menghitungfungsi.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});