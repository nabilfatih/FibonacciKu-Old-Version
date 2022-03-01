const dropdowns = document.querySelector('.dropdowns');
const dropdownButton = document.querySelector('#drop-down');

dropdownButton.addEventListener('click', function() {

    if(!dropdownButton && dropdowns != null) return

    if(dropdowns.classList.contains('aktif')) {
        dropdowns.classList.remove('aktif')
    }
    else {
        dropdowns.classList.add('aktif')
    }
});

document.addEventListener('click', function(event) {
    if (!event.target.closest('#dropdowns')) {
        dropdowns.classList.remove('aktif')
    }
  });