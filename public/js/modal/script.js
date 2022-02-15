const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const modal_overlay = document.getElementById('modal__overlay');

openModalButtons.forEach(a => {
    a.addEventListener('click', () => {
        const modal = document.querySelector(a.dataset.modalTarget)
        openModal(modal)
    })
})

modal_overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.modal__active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(a => {
    a.addEventListener('click', () => {
        const modal = a.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('modal__active')
    modal_overlay.classList.add('overlay__active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('modal__active')
    modal_overlay.classList.remove('overlay__active')
}

//Scroll
$(window).scroll(function () {
    //set scroll position in session storage
    sessionStorage.scrollPos = $(window).scrollTop();
});
var init = function () {
    //get scroll position in session storage
    $(window).scrollTop(sessionStorage.scrollPos || 0)
};
window.onload = init;
