import express from 'express'
import cors from 'cors'
import youtubeRoutes from './routes/youtube.routes'
import favoritesRoutes from './routes/favorites.routes'
import { sqliteConnection } from './database/sqlite'

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

sqliteConnection()

app.use('/api/youtube', youtubeRoutes)
app.use('/api', favoritesRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
