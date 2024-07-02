import "./styles/globals.css";
import { createThemeToggle } from './components/ThemeToggle';
import { createSideMenu } from './components/SideMenu';

// Função para criar elementos de vídeo
function createVideoElement(video: any): HTMLElement {
  const videoContainer = document.createElement('div');
  videoContainer.className = 'videoContainer';
  videoContainer.setAttribute('role', 'group');
  videoContainer.setAttribute('aria-label', video.snippet.title);
  videoContainer.tabIndex = 0;

  const playButton = document.createElement('img');
  playButton.src = 'images/playVideo.svg';
  playButton.alt = 'Icone para dar play no vídeo';
  playButton.className = 'videoPlayButton';
  playButton.setAttribute('role', 'button');
  playButton.tabIndex = 0;

  const thumbnail = document.createElement('img');
  thumbnail.src = video.snippet.thumbnails.default.url;
  thumbnail.alt = `Thumbnail do vídeo ${video.snippet.title}`;
  thumbnail.tabIndex = 0;

  const title = document.createElement('h4');
  title.textContent = video.snippet.title;
  title.tabIndex = 0;

  const infoContainer = document.createElement('div');
  infoContainer.className = 'infoContainer';
  infoContainer.setAttribute('role', 'group');
  infoContainer.tabIndex = 0;

  const starFavorite = document.createElement('img');
  starFavorite.src = 'images/star.svg';
  starFavorite.alt = 'Adicionar aos favoritos';
  starFavorite.className = 'starFavorite';
  starFavorite.setAttribute('role', 'button');
  starFavorite.tabIndex = 0;

  let isVideoFavorite = false;
  starFavorite.addEventListener('click', async (event) => {
    console.log('Star clicked:', video);

    event.preventDefault();
    event.stopPropagation();

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
      if (isVideoFavorite) {
        console.log('Removing favorite:', video.id.videoId);
        starFavorite.src = 'images/star.svg';
        await removeFavorite(video.id.videoId);
      } else {
        console.log('Adding favorite:', videoData);
        starFavorite.src = 'images/filledStar.svg';
        await addFavorite(videoData);
      }

      isVideoFavorite = !isVideoFavorite;
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  });

  infoContainer.appendChild(title);
  infoContainer.appendChild(starFavorite);

  videoContainer.appendChild(playButton);
  videoContainer.appendChild(thumbnail);
  videoContainer.appendChild(infoContainer);

  playButton.addEventListener('click', () => {
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

  playButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      playButton.click();
    }
  });

  starFavorite.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      starFavorite.click();
    }
  });

  return videoContainer;
}

async function addFavorite(video: any) {
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

    console.log('Favorite added successfully:', video);
  } catch (error) {
    console.error('Error adding video to favorites:', error);
  }
}

async function removeFavorite(videoId: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/favorites/${videoId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to remove video from favorites');
    }

    console.log('Favorite removed successfully:', videoId);
    window.parent.postMessage({ type: 'UPDATE_FAVORITES_COUNT' }, '*');
  } catch (error) {
    console.error('Error removing video from favorites:', error);
  }
}

// Função para buscar vídeos
async function fetchVideos(query: string): Promise<any[]> {
  const response = await fetch(`http://localhost:3000/api/youtube/search?q=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  const videos = await response.json();
  console.log('Videos fetched:', videos);
  return videos;
}

// Função para renderizar vídeos
function renderVideos(videos: any[]): void {
  console.log('Rendering videos:', videos);

  const searchResult = document.querySelector('.searchResult') as HTMLElement;
  searchResult.innerHTML = '';

  videos.forEach(video => {
    const videoElement = createVideoElement(video);
    searchResult.appendChild(videoElement);
  });
}

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
      console.log('Search form submitted');

      event.preventDefault();
      const input = searchForm.querySelector('input[type="search"]') as HTMLInputElement;
      const query = input.value;
      if (query) {
        localStorage.setItem('lastSearchQuery', query);
        try {
          const videos = await fetchVideos(query);
          renderVideos(videos);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }

  const lastSearchQuery = localStorage.getItem('lastSearchQuery');
  if (lastSearchQuery) {
    const input = searchForm.querySelector('input[type="search"]') as HTMLInputElement;
    input.value = lastSearchQuery;
    fetchVideos(lastSearchQuery).then(renderVideos).catch(console.error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOMContentLoaded event fired');

  const favoritesContainer = document.getElementById('favoritesContainer');

  if (!favoritesContainer) return;

  try {
    const response = await fetch('http://localhost:3000/api/favorites');
    const favoriteVideos = await response.json();
    console.log('Favorite videos fetched:', favoriteVideos);

    favoriteVideos.forEach((video: any) => {
      console.log('Video from DB:', video);
      const videoElement = createFavSection(video);
      favoritesContainer.appendChild(videoElement);
    });
  } catch (error) {
    console.error('Failed to fetch favorite videos', error);
  }
});

function createFavSection(video: any): HTMLElement {
  console.log('Creating favorite video section:', video);

  const videoContainer = document.createElement('div');
  videoContainer.className = 'videoContainer';
  videoContainer.setAttribute('role', 'group');
  videoContainer.setAttribute('aria-label', video.title);
  videoContainer.tabIndex = 0;

  const playButton = document.createElement('img');
  playButton.src = 'images/playVideo.svg';
  playButton.alt = 'Icone para dar play no vídeo';
  playButton.className = 'videoPlayButton';
  playButton.setAttribute('role', 'button');
  playButton.tabIndex = 0;

  const thumbnail = document.createElement('img');
  thumbnail.src = video.thumbnail;
  thumbnail.alt = `Thumbnail do vídeo ${video.title}`;
  thumbnail.tabIndex = 0;

  const infoContainer = document.createElement('div');
  infoContainer.className = 'infoContainer';
  infoContainer.setAttribute('role', 'group');
  infoContainer.tabIndex = 0;

  const title = document.createElement('h4');
  title.textContent = video.title;
  title.tabIndex = 0;

  const starFavorite = document.createElement('img');
  starFavorite.src = 'images/filledStar.svg';
  starFavorite.alt = 'Remover dos favoritos';
  starFavorite.className = 'starFavorite';
  starFavorite.setAttribute('role', 'button');
  starFavorite.tabIndex = 0;

  starFavorite.addEventListener('click', async () => {
    const videoId = video.videoId;

    if (!videoId) {
      console.error('Video ID is null or undefined:', video);
      return;
    }

    try {
      await removeFavorite(videoId);
      videoContainer.remove();
    } catch (error) {
      console.error('Error removing video from favorites:', error);
    }
  });

  videoContainer.appendChild(playButton);
  videoContainer.appendChild(thumbnail);

  infoContainer.appendChild(title);
  infoContainer.appendChild(starFavorite);

  videoContainer.appendChild(infoContainer);

  playButton.addEventListener('click', () => {
    const videoId = video.videoId;

    if (!videoId) {
      console.error('Video ID is null or undefined:', video);
      return;
    }

    const iframeContainer = document.createElement('div');
    iframeContainer.className = 'iframe-container';

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    iframeContainer.appendChild(iframe);

    const videoPlayer = document.querySelector('.videoPlayer') as HTMLElement;
    videoPlayer.innerHTML = '';
    videoPlayer.appendChild(iframeContainer);
  });

  playButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      playButton.click();
    }
  });

  starFavorite.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      starFavorite.click();
    }
  });

  return videoContainer;
}

document.addEventListener('DOMContentLoaded', initApp);
