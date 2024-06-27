export function createHeader(): HTMLElement {
    const header = document.createElement('header');
    header.innerHTML = `
        <h2>MF Drawer</h2>
    `;
    return header;
}
