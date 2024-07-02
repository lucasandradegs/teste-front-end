import { removeFavorite } from "../../utils/functions";
import { FavoritesVideos } from "../../utils/interfaces";


export function createFavSection(video: FavoritesVideos): HTMLElement {  
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
      iframeContainer.className = 'iframeContainer';
  
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