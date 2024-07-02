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
    root.classList.remove('light-mode');
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
  const videoIframe = document.getElementById('mf_videos');

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
  } else if (event.data.type === 'request-theme') {
    const root = document.documentElement;
    const theme = root.classList.contains('light-mode') ? 'light' : 'dark';
    event.source.postMessage({ type: 'theme-change', theme }, '*');
  }
}

function handleIframeLoad(event) {
  const iframe = event.target;
  const message = {
    type: 'resize',
    width: window.innerWidth
  };
  iframe.contentWindow.postMessage(message, '*');

  // Send current theme to the iframe
  const root = document.documentElement;
  const theme = root.classList.contains('light-mode') ? 'light' : 'dark';
  iframe.contentWindow.postMessage({ type: 'theme-change', theme }, '*');
}

window.addEventListener('load', handleResizeLayout);
window.addEventListener('resize', handleResizeLayout);
window.addEventListener('message', handleMessage);

document.getElementById('mf_drawer').addEventListener('load', handleIframeLoad);
document.getElementById('mf_videos').addEventListener('load', handleIframeLoad);

window.addEventListener('message', (event) => {
  if (event.data.type === 'navigate') {
    const target = event.data.data.target;
    const mfVideos = document.getElementById('mf_videos');
    if (mfVideos) {
      if (target === 'videos') {
        // mfVideos.src = "http://localhost:3002/index.html";
        mfVideos.src = "http://localhost:8082/index.html";
      } else if (target === 'favorites') {
        // mfVideos.src = "http://localhost:3002/favorites.html";
        mfVideos.src = "http://localhost:8082/favorites.html";
      }
    }
  }
});
