import request from 'supertest'
import express from 'express'
import knex from '../src/database/knex'
import favoritesRouter from '../src/routes/favorites.routes'

const app = express()
app.use(express.json())
app.use('/api', favoritesRouter)

describe('Favorites Routes', () => {
  beforeAll(async () => {
    await knex.migrate.latest()
  })

  afterAll(async () => {
    await knex.migrate.rollback()
    await knex.destroy()
  })

  beforeEach(async () => {
    await knex('favorites').truncate()
  })

  it('should be able to add a video to favorite', async () => {
    const video = {
      snippet: {
        title: 'Test Video',
        thumbnails: { default: { url: 'http://example.com' } },
      },
      id: { videoId: 'testVideoId' },
    }

    const response = await request(app).post('/api/favorites').send(video)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Video added to favorites')
  })

  it('should not be able to add a video to favorite', async () => {
    const video = {
      snippet: {
        title: 'Test Video',
        thumbnails: { default: { url: 'http://example.com' } },
      },
      id: { videoId: 'testVideoId' },
    }

    await request(app).post('/api/favorites').send(video)

    const response = await request(app).post('/api/favorites').send(video)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Video already in favorites')
  })

  it('should be able to remove from favorite', async () => {
    const video = {
      snippet: {
        title: 'Test Video',
        thumbnails: { default: { url: 'http://example.com' } },
      },
      id: { videoId: 'testVideoId' },
    }

    await request(app).post('/api/favorites').send(video)

    const response = await request(app).delete('/api/favorites/testVideoId')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Video removed from favorites')
  })

  it('should be able to get all favorites video', async () => {
    const video = {
      snippet: {
        title: 'Test Video',
        thumbnails: { default: { url: 'http://example.com' } },
      },
      id: { videoId: 'testVideoId' },
    }

    await request(app).post('/api/favorites').send(video)

    const response = await request(app).get('/api/favorites')

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })

  it('should be able to get the total favorite videos', async () => {
    const response = await request(app).get('/api/favorites/count')

    expect(response.status).toBe(200)
    expect(response.body.count).toBeDefined()
  })
})
