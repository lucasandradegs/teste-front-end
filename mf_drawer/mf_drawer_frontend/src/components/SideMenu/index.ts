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
  sideMenuContent.className = 'sideMenuContent';

  const closeButton = document.createElement('button');
  closeButton.className = 'closeMenu';
  closeButton.onclick = toggleSideMenu;
  closeButton.setAttribute('aria-label', 'Close side menu');
  closeButton.tabIndex = 0;

  sideMenuContent.appendChild(closeButton);

  const sideMenuItems = document.createElement('ul');

  const createSideMenuItem = (text: string, href: string, iconSrc: string, iconAlt: string) => {
    const sideItem = document.createElement('li');

    const sideItemLink = document.createElement('a');
    sideItemLink.href = href;
    sideItemLink.textContent = text;
    sideItemLink.tabIndex = 0; 

    const sideItemIcon = document.createElement('img');
    sideItemIcon.src = iconSrc;
    sideItemIcon.className = 'menuIcon';
    sideItemIcon.alt = iconAlt;

    sideItemLink.appendChild(sideItemIcon);
    sideItem.appendChild(sideItemLink);

    return sideItem;
  };

  sideMenuItems.appendChild(createSideMenuItem('Vídeos', '#', 'images/logo.svg', 'Ícone de um reprodutor de vídeo'));
  sideMenuItems.appendChild(createSideMenuItem('Favoritos', '#', 'images/favorites.svg', 'Ícone de uma estrela representando os seus vídeos favoritos'));

  sideMenuContent.appendChild(sideMenuItems);

  sideMenu.appendChild(toggleButton);
  sideMenu.appendChild(sideMenuContent);

  return sideMenu;
}
