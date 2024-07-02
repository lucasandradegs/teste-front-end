import { createVideoElement } from "../../components/VideoSearchResult";
import { getCookie, saveToCookie } from "../saveOnCookies";

let isLightMode = true;

// Funções para alterar o tema da página
export function toggleTheme() {
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

export function checkThemePreference() {
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

// Função para o funcionamento da sideBar
let isMenuOpen = false;

export function toggleSideMenu(): void {
    const root = document.documentElement;
    const body = document.body;
    const sideMenuContent = document.querySelector('.sideMenuContent') as HTMLElement;
    const toggleButton = document.querySelector('.toggleMenu') as HTMLElement;

    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
        root.classList.add('menu-open');
        root.classList.remove('menu-closed');
        sideMenuContent.style.transform = 'translateX(0)';
        toggleButton.style.display = 'none';
        body.style.overflow = 'hidden';
    } else {
        root.classList.add('menu-closed');
        root.classList.remove('menu-open');
        sideMenuContent.style.transform = 'translateX(-100%)';
        toggleButton.style.display = 'block';
        body.style.overflow = '';
    }
}
// Ajustar o layout da aplicação sempre que atingir o width para responsividade
function applyLayoutResize(width: number) {
    const body = document.body;
    const searchResult = document.getElementById('searchResult');
    const favoriteTitle = document.getElementById('favTitle');

    if (width >= 1023) {
        body.classList.add('responsiveResult');
        if (searchResult) {
            searchResult.classList.add('responsiveResult');
        }
        if (favoriteTitle) {
            favoriteTitle.classList.add('responsiveTitle')
        }
    } else {
        body.classList.remove('responsiveResult');
        if (searchResult) {
            searchResult.classList.remove('responsiveResult');
        }
    }
}

// Aplicar o tema para a página
function applyThemeChange(theme: string) {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark-mode');
        root.classList.remove('light-mode');
    } else {
        root.classList.add('light-mode');
        root.classList.remove('dark-mode');
    }
}

window.addEventListener('message', (event) => {
    if (event.data.type === 'resize') {
        applyLayoutResize(event.data.width);
    } else if (event.data.type === 'theme-change') {
        applyThemeChange(event.data.theme);
    } else if (event.data.type === 'requestResize') {
        const message = {
            type: 'resize',
            width: parent.innerWidth
        };
        applyLayoutResize(message.width);
    }
});

window.addEventListener('load', () => {
    parent.postMessage({ type: 'requestResize' }, '*');
    parent.postMessage({ type: 'request-theme' }, '*');
});

// Funções para procurar/adicionar/remover dos vídeos

export async function addFavorite(video: any) {
    const videoData = {
        id: { videoId: video.id.videoId },
        snippet: {
            title: video.snippet.title,
            thumbnails: {
                default: { url: video.snippet.thumbnails.default.url }
            }
        }
    };

    try {
        const response = await fetch('http://localhost:3000/api/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(videoData)
        });

        if (!response.ok) {
            throw new Error('Failed to add video to favorites');
        }
    } catch (error) {
        console.error('Error adding video to favorites:', error);
    }
}

export async function removeFavorite(videoId: string) {
    try {
        const response = await fetch(`http://localhost:3000/api/favorites/${videoId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to remove video from favorites');
        }
        window.parent.postMessage({ type: 'UPDATE_FAVORITES_COUNT' }, '*');
    } catch (error) {
        console.error('Error removing video from favorites:', error);
    }
}

// Função para buscar vídeos
export async function fetchVideos(query: string): Promise<any[]> {
    const response = await fetch(`http://localhost:3000/api/youtube/search?q=${query}`);
    if (!response.ok) {
        throw new Error('Failed to fetch videos');
    }
    const videos = await response.json();
    return videos;
}

// Função para renderizar vídeos
export function renderVideos(videos: any[]): void {
    console.log('Rendering videos:', videos);

    const searchResult = document.querySelector('.searchResult') as HTMLElement;
    searchResult.innerHTML = '';

    videos.forEach(video => {
        const videoElement = createVideoElement(video);
        searchResult.appendChild(videoElement);
    });
}