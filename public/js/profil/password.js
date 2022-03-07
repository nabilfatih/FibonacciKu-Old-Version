let newPasswordValue
let confirmationValue
let oldPasswordvalue
const form = document.querySelector('pengaturan__form');
const oldPassword = document.getElementById('password-lama');
const newPassword = document.getElementById('password-baru');
const confirmation = document.getElementById('password-konfirmasi');
const validationMessageKonfirmasi = document.getElementById('validation-message-konfirmasi');
const validationMessageBaru = document.getElementById('validation-message-baru');
const validationMessageLama = document.getElementById('validation-message-lama');

function validatePasswordsKonfirmasi(message, add, remove) {
    validationMessageKonfirmasi.textContent = message;
    validationMessageKonfirmasi.classList.add(add)
    validationMessageKonfirmasi.classList.remove(remove)
}

function validatePasswordsBaru(message, add, remove) {
    validationMessageBaru.textContent = message;
    validationMessageBaru.classList.add(add)
    validationMessageBaru.classList.remove(remove)
}

function validatePasswordsLama(message, add, remove) {
    validationMessageLama.textContent = message;
    validationMessageLama.classList.add(add)
    validationMessageLama.classList.remove(remove)
}

newPassword.addEventListener('input', e => {
    e.preventDefault()
    newPasswordValue = newPassword.value;

    if(newPasswordValue.length < 8) {
        validatePasswordsBaru('Password min. 8 karakter!', 'valid-error', 'valid-sukses');
    } else {
        validatePasswordsBaru('', '', 'valid-error')
    }
})

confirmation.addEventListener('input', e => {
    e.preventDefault();
    newPasswordValue = newPassword.value;
    confirmationValue = confirmation.value;

    if(newPasswordValue !== confirmationValue) {
        validatePasswordsKonfirmasi('Password tidak sama!', 'valid-error', 'valid-sukses');
    } else {
        validatePasswordsKonfirmasi('', '', 'valid-error');
        }
})

const button = document.getElementById('btn-submit')
button.disabled = true;

function checkPassword(oldPasswordvalue, newPasswordValue, confirmationValue) {
    if((!newPasswordValue) || (!confirmationValue) || (newPasswordValue.length < 8) || (newPasswordValue !== confirmationValue)) {
        button.disabled = true;
        button.classList.add('btn-valid-error')
    }
    else {
        button.disabled = false;
        button.classList.remove('btn-valid-error')
    }
}

newPassword.addEventListener('keyup', e => {
    e.preventDefault();
    // oldPasswordvalue = oldPassword.value;
    newPasswordValue = newPassword.value;
    confirmationValue = confirmation.value;
    checkPassword(oldPasswordvalue, newPasswordValue, confirmationValue)
});

confirmation.addEventListener('keyup', e => {
    e.preventDefault();
    // oldPasswordvalue = oldPassword.value;
    newPasswordValue = newPassword.value;
    confirmationValue = confirmation.value;
    checkPassword(oldPasswordvalue, newPasswordValue, confirmationValue)
})

// oldPassword.addEventListener('keyup', e => {
//     e.preventDefault();
//     oldPasswordvalue = oldPassword.value;
//     newPasswordValue = newPassword.value;
//     confirmationValue = confirmation.value;
//     checkPassword(oldPasswordvalue, newPasswordValue, confirmationValue)
// });


validationMessageLama.textContent = 'Masukkan password lama!';
oldPassword.addEventListener('input', e => {
    e.preventDefault()
    oldPasswordvalue = oldPassword.value;

    if(oldPasswordvalue) {
        validatePasswordsLama('', '', 'valid-error');
    } else {
        validatePasswordsLama('Masukkan password lama!', 'valid-error', 'valid-sukses')
    }
})

