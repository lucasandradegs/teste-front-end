// Funções para comunicar entre os iframes

function createThemeToggle() {
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';

  const toggleButton = document.createElement('button');
  toggleButton.className = 'toggle-button';
  toggleButton.textContent = 'Toggle Theme';
  toggleButton.onclick = toggleTheme;
  toggleButton.setAttribute('aria-label', 'Toggle theme');
  toggleButton.tabIndex = 0;

  themeToggle.appendChild(toggleButton);

  return themeToggle;
}

function toggleTheme() {
  const root = document.documentElement;
  const isLightMode = root.classList.contains('light-mode');
  if (isLightMode) {
    root.classList.remove('light-mode');
    root.classList.add('dark-mode');
    sendThemeToIframe('dark');
  } else {
    root.classList.remove('dark-mode');
    root.classList.add('light-mode');
    sendThemeToIframe('light');
  }
}

function sendThemeToIframe(theme) {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    iframe.contentWindow.postMessage({ type: 'theme-change', theme }, '*');
  });
}

document.getElementById('theme-toggle').appendChild(createThemeToggle());

function handleResizeLayout() {
  const drawerIframe = document.getElementById('mf_drawer');
  const videoIframe = document.getElementById('mf_videos')

  if (drawerIframe && videoIframe) {
    const message = {
      type: 'resize',
      width: window.innerWidth
    };
    drawerIframe.contentWindow.postMessage(message, '*');
    videoIframe.contentWindow.postMessage(message, '*');
  }
}


function handleMessage(event) {
  if (event.data.type === 'toggle-menu') {
    const isMenuOpen = event.data.isMenuOpen;
    const root = document.documentElement;

    if (isMenuOpen) {
      root.classList.add('menu-open');
    } else {
      root.classList.remove('menu-open');
    }
  }
}

window.addEventListener('load', handleResizeLayout);

window.addEventListener('resize', handleResizeLayout);

window.addEventListener('message', handleMessage);
