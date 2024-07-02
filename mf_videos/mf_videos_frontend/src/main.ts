import "./styles/globals.css";
import { fetchVideos, renderVideos } from "./utils/functions";
import { createFavSection } from "./components/FavoritesVideos";

function initApp() {
  const root = document.getElementById('container');
  if (root) {
    console.log('Página inicial inicializada')
  }

  const rootFavorites = document.getElementById('containerFavorites')

  if (rootFavorites) {
    console.log('Página favoritos inicializada')
  }
  const searchForm = document.querySelector('.searchForm') as HTMLFormElement;
  if (searchForm) {
    searchForm.addEventListener('submit', async (event) => {
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
  const favoritesContainer = document.getElementById('favoritesContainer');

  if (!favoritesContainer) return;

  try {
    const response = await fetch('http://localhost:3000/api/favorites');
    const favoriteVideos = await response.json();

    favoriteVideos.forEach((video: any) => {
      const videoElement = createFavSection(video);
      favoritesContainer.appendChild(videoElement);
    });

  } catch (error) {
    console.error('Failed to fetch favorite videos', error);
  }

});

document.addEventListener('DOMContentLoaded', initApp)