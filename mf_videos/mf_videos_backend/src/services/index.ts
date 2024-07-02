import axios from 'axios'
import { YouTubeVideo } from '../utils/interface'

const API_KEY = 'AIzaSyAa7yBngxdchVxPgpTKNJEM-ZNvLhH4YL0'
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

export const searchVideos = async (query: string): Promise<YouTubeVideo[]> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        part: 'snippet',
        q: query,
        key: API_KEY,
        maxResults: 10,
      },
    })

    return response.data.items
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred')
    }
  }
}
