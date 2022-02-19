const nodemailer = require('nodemailer');

module.exports.kontak = async (req, res) => {
    res.render('kontak/kontak', {
        user: req.user
    })
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