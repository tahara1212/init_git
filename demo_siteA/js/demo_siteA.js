

const menuIcon = document.querySelector('.menu-icon');
const menuModal = document.querySelector('#MenuModal');

menuIcon.addEventListener("click", function () {
    menuIcon.classList.toggle('menu-open');
    menuModal.classList.toggle('inview');
});