const openMenu = document.querySelector('#open-menu');
const closeMenu = document.querySelector('#close-menu');
const asideMenu = document.querySelector('aside');

openMenu.addEventListener("click", () => {
    asideMenu.classList.add("aside-visible")
});

closeMenu.addEventListener("click", () => {
    asideMenu.classList.remove("aside-visible")
});

botonesCategorias.forEach( boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}));