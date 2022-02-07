const contactForm = document.querySelector('.kontak-form');
let nama = document.getElementById('nama');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('pesan');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
        name: nama.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }

    console.log(formData);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('Email sudah terkirim');
            nama.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        }else{
            alert('Something went wrong!')
        }
    }

    xhr.send(JSON.stringify(formData));
});