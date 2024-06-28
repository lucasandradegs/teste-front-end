import { getCookie, saveToCookie } from "../saveOnCookies";

let isLightMode = true;


// Funções para alterar o tema da página
export function toggleTheme() {
    const root = document.documentElement;
    isLightMode = !isLightMode;
    if (isLightMode) {
        root.classList.add('light-mode');
        root.classList.remove('dark-mode');
        saveToCookie('Theme', "light")
    } else {
        root.classList.add('dark-mode');
        root.classList.remove('light-mode');
        saveToCookie('Theme', "dark")
    }
}

export function checkThemePreference() {
    const preferedTheme = getCookie('Theme');
    const root = document.documentElement;
    if (preferedTheme === 'dark') {
        isLightMode = false;
        root.classList.add('dark-mode');
        root.classList.remove('light-mode');
    } else {
        isLightMode = true;
        root.classList.add('light-mode');
        root.classList.remove('dark-mode');
    }
}

// Função para o funcionamento da sideBar
let isMenuOpen = false;

export function toggleSideMenu(): void {
    const root = document.documentElement;
    const body = document.body;
    const sideMenuContent = document.querySelector('.sideMenuContent') as HTMLElement;
    const toggleButton = document.querySelector('.toggleMenu') as HTMLElement;

    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        root.classList.add('menu-open');
        root.classList.remove('menu-closed');
        sideMenuContent.style.transform = 'translateX(0)';
        toggleButton.style.display = 'none';
        body.style.overflow = 'hidden';
    } else {
        root.classList.add('menu-closed');
        root.classList.remove('menu-open');
        sideMenuContent.style.transform = 'translateX(-100%)';
        toggleButton.style.display = 'block';
        body.style.overflow = '';
    }
}