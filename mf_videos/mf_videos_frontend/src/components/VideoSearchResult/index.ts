import { addFavorite, removeFavorite } from "../../utils/functions";
import { Video } from "../../utils/interfaces";

export function createVideoElement(video: Video): HTMLElement {
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
          starFavorite.src = 'images/star.svg';
          await removeFavorite(video.id.videoId);
        } else {
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
      iframeContainer.className = 'iframeContainer';
  
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
  
      iframeContainer.appendChild(iframe);

    //Caso queira que o vídeo abra em uma página em branco, a função abaixo limpa o conteúdo para exibir somente o vídeo.

    //   if (window.innerWidth < 1023) {
    //     const searchResult = document.querySelector('.searchResult') as HTMLElement;
    //     searchResult.innerHTML = '';
    //   }
    
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