import express from 'express';
import cors from 'cors';
import youtubeRoutes from './routes/youtube.routes';
import knex from './database/knex';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/youtube', youtubeRoutes);

app.post('/api/favorites', async (req, res) => {
  const video = req.body;
  
  const videoData = {
    title: video.snippet.title,
    thumbnail: video.snippet.thumbnails.default.url,
    videoId: video.id.videoId,
  };

  try {
    const existingVideo = await knex('favorites')
      .where({ videoId: videoData.videoId })
      .first();

    if (existingVideo) {
      return res.status(400).json({ message: 'Video already in favorites' });
    }

    await knex('favorites').insert(videoData);
    res.status(200).json({ message: 'Video added to favorites' });
  } catch (error) {
    console.error('Error adding video to favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/favorites/:id', async (req, res) => {
  const videoId = req.params.id;

  try {
    await knex('favorites').where({ videoId }).del();
    res.status(200).json({ message: 'Video removed from favorites' });
  } catch (error) {
    console.error('Error removing video from favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/favorites', async (req, res) => {
  try {
    const favoriteVideos = await knex('favorites').select('*');
    res.status(200).json(favoriteVideos);
  } catch (error) {
    console.error('Error fetching favorite videos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/favorites/count', async (req, res) => {
  try {
    const count = await knex('favorites').count('* as count').first();
    if (count)
    res.status(200).json({ count: count.count });
  } catch (error) {
    console.error('Error fetching favorite videos count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});