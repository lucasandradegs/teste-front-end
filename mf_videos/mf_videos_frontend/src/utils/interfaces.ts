export interface Video {
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

export interface FavoritesVideos {
    id: number
    title: string
    thumbnail: string
    videoId: string
}