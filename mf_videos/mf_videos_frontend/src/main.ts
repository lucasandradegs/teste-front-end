import "./styles/globals.css";
import { createThemeToggle } from './components/ThemeToggle';
import { createSideMenu } from './components/SideMenu';

// Função para criar elementos de vídeo
function createVideoElement(video: any): HTMLElement {
  const videoContainer = document.createElement('div');
  videoContainer.className = 'videoContainer';

  const playButton = document.createElement('img');
  playButton.src = 'images/playVideo.svg';
  playButton.alt = 'Icone para dar play no vídeo';
  playButton.className = 'videoPlayButton';

  const thumbnail = document.createElement('img');
  thumbnail.src = video.snippet.thumbnails.default.url;
  thumbnail.alt = 'Imagem de Thumbnail do vídeo';

  const title = document.createElement('h4');
  title.textContent = video.snippet.title;

  const infoContainer = document.createElement('div');
  infoContainer.className = 'infoContainer';

  const startFavorite = document.createElement('img');
  startFavorite.src = 'images/star.svg';
  startFavorite.alt = 'Imagem de uma estrela representando vídeo marcado como favorito';

  let isVideoFavorite = true;
  startFavorite.addEventListener('click', () => {
    if (isVideoFavorite) {
      startFavorite.src = 'images/filledStar.svg';
    } else {
      startFavorite.src = 'images/star.svg';
    }
    isVideoFavorite = !isVideoFavorite;
  });

  infoContainer.appendChild(title);
  infoContainer.appendChild(startFavorite);

  videoContainer.appendChild(playButton);
  videoContainer.appendChild(thumbnail);
  videoContainer.appendChild(infoContainer);

  thumbnail.addEventListener('click', () => {
    const videoId = video.id.videoId;

    const iframeContainer = document.createElement('div');
    iframeContainer.className = 'iframe-container';

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    iframeContainer.appendChild(iframe);

    const searchResult = document.querySelector('.searchResult') as HTMLElement;
    searchResult.innerHTML = '';

    const videoPlayer = document.querySelector('.videoPlayer') as HTMLElement;
    videoPlayer.appendChild(iframeContainer);
  });

  return videoContainer;
}


// Função para buscar vídeos
async function fetchVideos(query: string): Promise<any[]> {
  const response = await fetch(`http://localhost:3000/api/youtube/search?q=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  const videos = await response.json();
  return videos;
}

// Função para renderizar vídeos
function renderVideos(videos: any[]): void {
  const searchResult = document.querySelector('.searchResult') as HTMLElement;
  searchResult.innerHTML = '';

  videos.forEach(video => {
    const videoElement = createVideoElement(video);
    searchResult.appendChild(videoElement);
  });
}

// Inicializar a aplicação
function initApp() {
  const root = document.getElementById('headerMobile');
  if (root) {
    const headerFirstSection = root.querySelector('.headerFirstSection');
    const sideMenu = createSideMenu();
    const themeToggle = createThemeToggle();

    if (headerFirstSection) {
      root.insertBefore(sideMenu, headerFirstSection);
    }

    root.appendChild(themeToggle);
  }

  const rootDesktop = document.getElementById('titleAndTheme');
  if (rootDesktop) {
    const themeToggle = createThemeToggle();
    rootDesktop.appendChild(themeToggle);
  }

  const searchForm = document.querySelector('.searchForm') as HTMLFormElement;
  if (searchForm) {
    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const input = searchForm.querySelector('input[type="search"]') as HTMLInputElement;
      const query = input.value;
      if (query) {
        try {
          const videos = await fetchVideos(query);
          renderVideos(videos);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initApp);
