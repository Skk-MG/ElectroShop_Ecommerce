const openMenu = document.querySelector('#abrirMenu');
const closeMenu = document.querySelector('#cerrarMenu');
const asideMenu = document.querySelector('aside');

openMenu.addEventListener("click", () => {
    asideMenu.classList.add("asideVisible")
});

closeMenu.addEventListener("click", () => {
    asideMenu.classList.remove("asideVisible")
});

