import express from 'express';
import cors from 'cors';
import youtubeRoutes from './routes/youtube.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use('/api/youtube', youtubeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
