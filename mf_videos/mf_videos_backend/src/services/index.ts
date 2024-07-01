import axios from 'axios';

const API_KEY = 'AIzaSyCfFImWh64RiY0SVh_wy1zdwDa6GepM1pU';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

interface YouTubeVideo {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
            };
        };
    };
}

export const searchVideos = async (query: string): Promise<YouTubeVideo[]> => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                part: 'snippet',
                q: query,
                key: API_KEY,
                maxResults: 10
            }
        });

        return response.data.items;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};