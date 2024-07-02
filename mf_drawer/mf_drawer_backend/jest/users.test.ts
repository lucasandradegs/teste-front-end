import request from 'supertest'
import app from '../src/server'

describe('POST /users', () => {
  it('it should be able to register a new user', async () => {
    const response = await request(app).post('/users').send({
      userName: 'testUser',
      password: 'testPassword',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      message: 'Usuário cadastrado com sucesso!',
    })
  })

  it('it shouldn`t be able to register a new user because password field is missing', async () => {
    const response = await request(app).post('/users').send({
      userName: 'testUser',
    })

    expect(response.status).toBe(200)
  })
})
