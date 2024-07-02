import { Router } from 'express'
import { getVideos } from '../controller/YoutubeController'

const router = Router()

router.get('/search', getVideos)

export default router
