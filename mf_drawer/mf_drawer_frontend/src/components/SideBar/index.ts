export function createSidebar(): HTMLElement {
    const sidebar = document.createElement('nav');
    sidebar.innerHTML = `
        <ul>
            <li><a href="#videos">Vídeos</a></li>
            <li><a href="#favorites">Favoritos</a></li>
        </ul>
    `;
    return sidebar;
}
