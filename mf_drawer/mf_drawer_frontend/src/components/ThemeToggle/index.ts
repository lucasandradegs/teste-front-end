import { checkThemePreference, toggleTheme } from '../../utils/functions';
import './styles.css';

export function createThemeToggle(): HTMLElement {
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';

  const toggleButton = document.createElement('button');
  toggleButton.className = 'toggle-button';
  toggleButton.onclick = toggleTheme;
  toggleButton.setAttribute('aria-label', 'Toggle theme');
  toggleButton.tabIndex = 0;

  themeToggle.appendChild(toggleButton);

  return themeToggle;
}

document.addEventListener('DOMContentLoaded', () => {
  checkThemePreference();
});
