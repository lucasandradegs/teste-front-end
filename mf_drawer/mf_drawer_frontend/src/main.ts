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

window.addEventListener('message', async (event) => {
  if (event.data.type === 'updateFavorites') {
    const count = await fetchFavoritesCount();
    updateFavoritesCount(count);
  }
});

async function fetchFavoritesCount(): Promise<number> {
  const response = await fetch('http://localhost:3000/api/favorites/count');
  const data = await response.json();
  return data.count;
}

function updateFavoritesCount(count: number) {
  const favoritesLink = document.querySelector('#linkToFavorites') as HTMLElement;
  const favoritesLinkMobile = document.querySelector('#linkToFavoritesMobile') as HTMLElement;
  favoritesLink.textContent = `Favoritos (${count})`;
  favoritesLinkMobile.textContent = `Favoritos (${count})`;
}

let isUserRegistered = false;

document.addEventListener('DOMContentLoaded', async () => {
  const count = await fetchFavoritesCount();
  updateFavoritesCount(count);

  window.addEventListener('message', async (event) => {
    if (event.data.type === 'UPDATE_FAVORITES_COUNT') {
      const newCount = await fetchFavoritesCount();
      updateFavoritesCount(newCount);
    }
  });

  if (!isUserRegistered) {
    try {
      const response = await fetch('http://localhost:3030/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: 'testuser',
          password: 'testpassword',
        }),
      });

      if (response.ok) {
        console.log('Usuário registrado com sucesso!');
        isUserRegistered = true;
      } else {
        console.log('Você já está registrado!');
        isUserRegistered = true;
      }
    } catch (error) {
      console.log('Você já está registrado!');
      isUserRegistered = true;
    }
  }
});

document.addEventListener('DOMContentLoaded', initApp);