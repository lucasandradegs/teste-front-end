import "./styles/globals.css";
import { createThemeToggle } from './components/ThemeToggle';
import { createSideMenu } from './components/SideMenu';

function initApp() {
  const root = document.getElementById('headerMobile');
  if (root) {
    const headerFirstSection = root.querySelector('.headerFirstSection');
    const sideMenu = createSideMenu();
    const themeToggle = createThemeToggle();

    if (headerFirstSection) {
      root.insertBefore(sideMenu, headerFirstSection);
    }

    root.appendChild(themeToggle);
  } else {
    console.error('Root element not found');
  }

  const rootDesktop = document.getElementById('titleAndTheme');
  if (rootDesktop) {
    const themeToggle = createThemeToggle();
    rootDesktop.appendChild(themeToggle);
  }

  const addNavigationEventListener = (elementId: string, target: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        window.parent.postMessage({ type: 'navigate', data: { target } }, '*');
      });
    }
  };

  addNavigationEventListener('linkToVideos', 'videos');
  addNavigationEventListener('linkToFavorites', 'favorites');
  addNavigationEventListener('linkToVideosMobile', 'videos');
  addNavigationEventListener('linkToFavoritesMobile', 'favorites');
}

window.addEventListener('message', (event) => {
  if (event.data.type === 'theme-change') {
    const theme = event.data.theme;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark-mode');
      root.classList.remove('light-mode');
    } else {
      root.classList.add('light-mode');
      root.classList.remove('dark-mode');
    }
  }
});

document.addEventListener('DOMContentLoaded', initApp);