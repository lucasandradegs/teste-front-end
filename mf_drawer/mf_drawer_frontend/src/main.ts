import './styles/css/styles.css';
import { createHeader } from './components/Header';
import { createSidebar } from './components/SideBar';
import { createThemeToggle } from './components/ThemeToggle';

function initApp() {
    const root = document.getElementById('root');
    if (root) {
        const header = createHeader();
        const sidebar = createSidebar();
        const themeToggle = createThemeToggle();
        
        root.appendChild(header);
        root.appendChild(sidebar);
        root.appendChild(themeToggle);
    } else {
        console.error('Root element not found');
    }
}

document.addEventListener('DOMContentLoaded', initApp);