let newPasswordValue
let confirmationValue
const form = document.querySelector('pengaturan__form');
const newPassword = document.getElementById('password-baru');
const confirmation = document.getElementById('password-konfirmasi');
const validationMessage = document.getElementById('validation-message');

function validatePasswords(message, add, remove) {
    validationMessage.textContent = message;
    validationMessage.classList.add(add)
    validationMessage.classList.remove(remove)
}

confirmation.addEventListener('input', e => {
    e.preventDefault();
    newPasswordValue = newPassword.value;
    confirmationValue = confirmation.value;

    if(newPasswordValue !== confirmationValue) {
        validatePasswords('Password Tidak Sama!', 'valid-error', 'valid-sukses');
    } else {
        validatePasswords('', '', 'valid-error');
        }
})
