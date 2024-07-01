import { toggleSideMenu } from '../../utils/functions';
import './styles.css';

export function createSideMenu(): HTMLElement {
  const sideMenu = document.createElement('div');
  sideMenu.className = 'sideMenu';

  const toggleButton = document.createElement('button');
  toggleButton.className = 'toggleMenu';
  toggleButton.onclick = toggleSideMenu;
  toggleButton.setAttribute('aria-label', 'Open side menu');
  toggleButton.tabIndex = 0;

  const sideMenuContent = document.createElement('div');
  sideMenuContent.className = 'sideMenuContent shadow';

  const closeButton = document.createElement('button');
  closeButton.className = 'closeMenu';
  closeButton.onclick = toggleSideMenu;
  closeButton.setAttribute('aria-label', 'Close side menu');
  closeButton.tabIndex = 0;

  sideMenuContent.appendChild(closeButton);

  const sideMenuItems = document.createElement('ul');

  const createSideMenuItem = (text: string, href: string, iconSrc: string, iconAlt: string, navigateTo: string, id: string) => {
    const sideItem = document.createElement('li');

    const sideItemLink = document.createElement('a');
    sideItemLink.href = href;
    sideItemLink.textContent = text;
    sideItemLink.tabIndex = 0;
    sideItemLink.id = id;

    const sideItemIcon = document.createElement('img');
    sideItemIcon.src = iconSrc;
    sideItemIcon.className = 'menuIcon';
    sideItemIcon.alt = iconAlt;

    sideItemLink.appendChild(sideItemIcon);
    sideItem.appendChild(sideItemLink);

    sideItemLink.addEventListener('click', (event) => {
      event.preventDefault();
      if (window.top) {
        window.top.postMessage({ type: 'navigate', data: { target: navigateTo } }, '*');
      }
      toggleSideMenu();
    });

    return sideItem;
  };

  sideMenuItems.appendChild(createSideMenuItem('Vídeos', '#', 'images/logo.svg', 'Ícone de um reprodutor de vídeo', 'videos', 'linkToVideosMobile'));
  sideMenuItems.appendChild(createSideMenuItem('Favoritos', '#', 'images/favorites.svg', 'Ícone de uma estrela representando os seus vídeos favoritos', 'favorites', 'linkToFavoritesMobile'));

  sideMenuContent.appendChild(sideMenuItems);

  sideMenu.appendChild(toggleButton);
  sideMenu.appendChild(sideMenuContent);

  return sideMenu;
}