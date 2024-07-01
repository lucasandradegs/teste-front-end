import { Request, Response } from 'express';
import { searchVideos } from '../services';

export const getVideos = async (req: Request, res: Response) => {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).send('Query parameter is required');
  }

  try {
    const videos = await searchVideos(query);
    res.json(videos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
};
