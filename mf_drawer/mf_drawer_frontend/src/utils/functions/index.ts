import { getCookie, saveToCookie } from "../saveOnCookies";

// Funções para alterar o tema da página
export function checkThemePreference() {
    const preferedTheme = getCookie('Theme');
    const root = document.documentElement;
    if (preferedTheme === 'dark') {
        root.classList.add('dark-mode');
        root.classList.remove('light-mode');
    } else {
        root.classList.add('light-mode');
        root.classList.remove('dark-mode');
    }

    window.addEventListener('message', (event) => {
        if (event.origin !== 'http://localhost:3001' && event.origin !== 'http://localhost:3002') {
            return;
        }

        const { theme } = event.data;
        if (theme) {
            root.classList.toggle('light-mode', theme === 'light');
            root.classList.toggle('dark-mode', theme === 'dark');
            saveToCookie('Theme', theme);
        }
    });
}

export function toggleTheme() {
    const isLightMode = document.documentElement.classList.contains('light-mode');
    const newTheme = isLightMode ? 'dark' : 'light';
    parent.postMessage({ theme: newTheme }, '*');
}

document.addEventListener('DOMContentLoaded', () => {
    checkThemePreference();
});

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
    
    window.parent.postMessage({
      type: 'toggle-menu',
      isMenuOpen: isMenuOpen
    }, '*');
  }

// Função para adicionar a classe de responsividade ao body
function applyLayoutResize(width: number) {
    const body = document.body;
    const headerMobile = document.getElementById('headerMobile');

    if (width >= 1023) {
        body.classList.add('responsiveBody');
        if (headerMobile) {
            headerMobile.classList.add('responsiveHeader');
        }
    } else {
        body.classList.remove('responsiveBody');
        if (headerMobile) {
            headerMobile.classList.remove('responsiveHeader');
        }
    }
}

window.addEventListener('message', (event) => {
    if (event.data.type === 'resize') {
        applyLayoutResize(event.data.width);
    }
});

window.addEventListener('load', () => {
    parent.postMessage({ type: 'requestResize' }, '*');
});

window.addEventListener('message', (event) => {
    if (event.data.type === 'requestResize') {
        const message = {
            type: 'resize',
            width: parent.innerWidth
        };
        parent.postMessage(message, '*');
    }
});