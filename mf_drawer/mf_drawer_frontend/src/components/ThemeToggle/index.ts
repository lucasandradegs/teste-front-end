import { getCookie, saveToCookie } from '../../utils/saveOnCookies';
import './styles.css';

let isLightMode = true;

function toggleTheme() {
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

function checkThemePreference() {
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

export function createThemeToggle(): HTMLElement {
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  
  const toggleButton = document.createElement('div');
  toggleButton.className = 'toggle-button';
  toggleButton.onclick = toggleTheme;

  const moonIcon = document.createElement('div');
  moonIcon.className = 'moon';

  const sunIcon = document.createElement('div');
  sunIcon.className = 'sun';

  toggleButton.appendChild(moonIcon);
  toggleButton.appendChild(sunIcon);

  themeToggle.appendChild(toggleButton);

  return themeToggle;
}

document.addEventListener('DOMContentLoaded', () => {
    checkThemePreference();
  });