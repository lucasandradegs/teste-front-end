import { Router } from 'express'
import {
  addFavorite,
  removeFavorite,
  getFavorites,
  getFavoritesCount,
} from '../controller/FavoritesController'

const router = Router()

router.post('/favorites', addFavorite)
router.delete('/favorites/:id', removeFavorite)
router.get('/favorites', getFavorites)
router.get('/favorites/count', getFavoritesCount)

export default router
