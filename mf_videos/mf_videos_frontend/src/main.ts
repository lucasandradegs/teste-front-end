import "./styles/globals.css"

function initApp() {}

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
