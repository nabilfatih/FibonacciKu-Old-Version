const nodemailer = require('nodemailer');
const User = require('../models/user');
const util = require('util');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.kontak = async (req, res) => {
    res.render('kontak/kontak', {
        user: req.user
    })
}

module.exports.putKontak = async (req, res) => {
    const { nama, email, subjek, pesan } = req.body;
    try {
        const msg = {
            from: 'FibonacciKu <kontak@fibonacciku.com>',
            to: 'fibonacci.id21@gmail.com',
            subject: `${subjek} - Kontak FibonacciKu`,
            text: `
                Pesan dari ${email}:
                ${pesan}
                dari ${nama}
            `.replace(/            /g, ''),
            html: `
                <h1>Pesan dari ${email}</h1>
                <p>${pesan}</p>
                <p>dari ${nama}</p>
    
                <p>Kontak - FibonacciKu</p>
            `
        }
        await sgMail.send(msg);
        req.flash('success', 'Pesan sudah dikirim');
    } catch(e) {
        req.flash('error', 'Pesan gagal dikirim, tolong kontak FibonacciKu')
    }
    return res.redirect('/kontak')
}   

module.exports.forms = async(req, res) => {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fibonacciku@gmail.com',
            pass: 'Fatih16112001'
        }
    })

    
    const mailOptions = {
        from: req.body.email,
        to: "fibonacci.id21@gmail.com",
        subject: `Pesan dari ${req.body.email}: ${req.body.subject}`,
        text: `${req.body.message} \n\nDari: ${req.body.name}`,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send('error')
        }else{
            console.log('Email sent')
            res.send('success')
        }
    })
}